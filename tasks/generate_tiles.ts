import { TaskManager } from '../task_manager.ts'
import { Point } from '../types.ts'

export async function generateTileGroups(width: number, height: number): Promise<void> {
	const manager = new TaskManager(new URL('./generate_tiles.worker.ts', import.meta.url))

	const groupsHorizontal = width / 1000
	const groupsVertical = height / 1000

	const totalColumns = width / 1000

	for (let horizontalIndex = 0; horizontalIndex < groupsHorizontal; horizontalIndex++) {
		console.log(`Generating tile group column ${horizontalIndex + 1}/${totalColumns}...`)

		for (let verticalIndex = 0; verticalIndex < groupsVertical; verticalIndex++) {
			manager.queueTask<Point>({ data: { x: horizontalIndex, y: verticalIndex }, steps: 10000 })
		}
	}

	await manager.run()
}
