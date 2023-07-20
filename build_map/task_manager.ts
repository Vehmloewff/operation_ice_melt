import { ProgressBar, progressBarWidgets } from './deps.ts'

// deno-lint-ignore no-explicit-any
const anySelf = self as any

/** Meant to be run inside a worker context. `fn` is called whenever a new task is sent to the worker */
export function onTaskReceived(fn: (task: Task) => unknown): void {
	anySelf.onmessage = fn
}

/** Meant to be run inside a worker context. Notifies the TaskManager that a step in the current task was completed */
export function registerStep(): void {
	anySelf.postMessage('step')
}

/** Meant to be run inside a worker context. Notifies the TaskManager that the task is complete */
export function registerTaskCompletion(): void {
	anySelf.postMessage('done')
}

export interface Task {
	data: unknown
	steps: number
}

export class TaskManager {
	#taskFile: string
	#tasks: Task[] = []

	#onStep: VoidFunction | null = null

	constructor(taskFile: string) {
		this.#taskFile = taskFile
	}

	queueTask(task: Task): void {
		this.#tasks.push(task)
	}

	async run(): Promise<void> {
		const bar = new ProgressBar({
			total: sum(this.#tasks.map((task) => task.steps)),
			widgets: [progressBarWidgets.percentageWidget, progressBarWidgets.amountWidget],
		})
		await bar.start()

		let step = 0

		this.#onStep = () => {
			bar.update(++step)
		}

		await Promise.all(buildArray(navigator.hardwareConcurrency, () => this.#makeTaskRunner()))

		this.#onStep = null

		await bar.finish()
	}

	async #makeTaskRunner() {
		const worker = new Worker(this.#taskFile, {
			type: 'module',
			deno: { permissions: 'inherit' },
		})

		while (this.#tasks.length) {
			const task = this.#tasks.shift()
			if (!task) throw new Error('Encountered a race condition')

			await this.#executeTask(worker, task)
		}

		worker.terminate()
	}

	#step() {
		if (!this.#onStep) throw new Error('Cannot step because there is no progress command running')

		this.#onStep()
	}

	async #executeTask(worker: Worker, task: Task) {
		const donePromise = new Promise<void>((resolve) => {
			worker.onmessage = ({ data }) => {
				if (data === 'step') this.#step()
				else if (data === 'done') resolve()
			}
		})

		worker.postMessage(task)

		await donePromise
	}
}

function sum(numbers: number[]) {
	let sum = 0

	for (const number of numbers) sum += number

	return sum
}

function buildArray<T>(length: number, builder: () => T): T[] {
	const arr: T[] = []

	for (let i = 0; i < length; i++) arr.push(builder())

	return arr
}
