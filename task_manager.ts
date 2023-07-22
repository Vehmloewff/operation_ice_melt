import { ProgressBar, progressBarWidgets } from './deps.ts'
import { sum } from './helpers.ts'

// deno-lint-ignore no-explicit-any
const anySelf = self as any

/** Meant to be run inside a worker context. `fn` is called whenever a new task is sent to the worker */
export function onTaskReceived<T>(fn: (task: Task<T>) => unknown): void {
	// deno-lint-ignore no-explicit-any
	anySelf.onmessage = async (event: any) => await fn(event.data[1])

	anySelf.postMessage(['ready'])
}

/** Meant to be run inside a worker context. Notifies the TaskManager that a step in the current task was completed */
export function registerStep(): void {
	anySelf.postMessage(['step'])
}

/** Meant to be run inside a worker context. Notifies the TaskManager that the task is complete */
export function registerTaskCompletion<T>(data: T): void {
	anySelf.postMessage(['done', data])
}

export interface Task<T> {
	data: T
	steps: number
}

export type TaskCompleteFn<T> = (data: T) => void

export class TaskManager<CompleteType> {
	#taskFile: string | URL
	#tasks: Task<unknown>[] = []

	#stepFn: VoidFunction | null = null
	#taskCompleteFn: TaskCompleteFn<CompleteType> | null = null

	constructor(taskFile: string | URL, taskCompleteFn?: TaskCompleteFn<CompleteType>) {
		this.#taskFile = taskFile

		if (taskCompleteFn) this.#taskCompleteFn = taskCompleteFn
	}

	queueTask<T>(task: Task<T>): void {
		this.#tasks.push(task)
	}

	async run(): Promise<void> {
		const bar = new ProgressBar({
			total: sum(this.#tasks.map((task) => task.steps)),
			widgets: [progressBarWidgets.percentageWidget, progressBarWidgets.amountWidget],
		})

		let step = 0

		this.#stepFn = () => bar.update(++step)
		await bar.start()

		await Promise.all(buildArray(navigator.hardwareConcurrency, () => this.#makeTaskRunner()))

		this.#stepFn = null
		await bar.finish()
	}

	async #makeTaskRunner() {
		const worker = new Worker(this.#taskFile, {
			type: 'module',
			deno: { permissions: 'inherit' },
		})

		await new Promise<void>((resolve) => {
			worker.onmessage = ({ data }) => {
				if (data[0] === 'ready') resolve()
			}
		})

		while (this.#tasks.length) {
			const task = this.#tasks.shift()
			if (!task) throw new Error('Encountered a race condition')

			await this.#executeTask(worker, task)
		}

		worker.terminate()
	}

	#step() {
		if (!this.#stepFn) throw new Error('Cannot step because there is no progress command running')

		this.#stepFn()
	}

	async #executeTask(worker: Worker, task: Task<unknown>) {
		const donePromise = new Promise<void>((resolve) => {
			worker.onmessage = ({ data }) => {
				if (data[0] === 'step') this.#step()
				else if (data[0] === 'done') {
					if (this.#taskCompleteFn) this.#taskCompleteFn(data[1])
					resolve()
				}
			}
		})

		worker.postMessage(['task', task])

		await donePromise
	}
}

function buildArray<T>(length: number, builder: () => T): T[] {
	const arr: T[] = []

	for (let i = 0; i < length; i++) arr.push(builder())

	return arr
}
