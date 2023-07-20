import { TaskManager } from '../task_manager.ts'
import { Point } from '../types.ts'

export async function generateTileGroups(width: number, height: number): Promise<void> {
	const manager = new TaskManager(new URL('./generate_tiles.worker.ts', import.meta.url))

	const groupsHorizontal = width / 1000
	const groupsVertical = height / 1000

	for (let verticalIndex = 0; verticalIndex < groupsVertical; verticalIndex++) {
		for (let horizontalIndex = 0; horizontalIndex < groupsHorizontal; horizontalIndex++) {
			manager.queueTask<Point>({ data: { x: horizontalIndex, y: verticalIndex }, steps: 10000 })
		}
	}

	await manager.run()
}
