import { TaskManager } from '../task_manager.ts'
import { Point } from '../types.ts'

export interface GenerateTileGroupsParams {
	/** The tile group X index, not the tile X index */
	x: number
	/** The tile group Y index, not the tile Y index */
	y: number
	/** The number of tile groups to span horizontally */
	width: number
	/** The number of tile groups to span vertically */
	height: number
}

export async function generateTileGroups(params: GenerateTileGroupsParams): Promise<void> {
	const manager = new TaskManager(new URL('./generate_tiles.worker.ts', import.meta.url))

	for (let verticalIndex = 0; verticalIndex < params.height; verticalIndex++) {
		for (let horizontalIndex = 0; horizontalIndex < params.width; horizontalIndex++) {
			manager.queueTask<Point>({ data: { x: horizontalIndex, y: verticalIndex }, steps: 1000 })
		}
	}

	console.log('Generating tile groups...')
	await manager.run()
}
