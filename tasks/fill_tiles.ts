import { Resources, Terrain } from '../map_types.ts'
import { TaskManager } from '../task_manager.ts'
import { Point } from '../types.ts'
import type { FillTilesCommand } from './fill_tiles.worker.ts'

export interface FillTilesParams {
	paths: Point[][]
	terrain: Terrain
	resources: Resources
}

export async function fillTiles(params: FillTilesParams): Promise<void> {
	const manager = new TaskManager(new URL('./generate_tiles.worker.ts', import.meta.url))

	for await (const entry of Deno.readDir('map')) {
		manager.queueTask<FillTilesCommand>({
			data: {
				paths: params.paths,
				resources: params.resources,
				terrain: params.terrain,
				tileGroupFile: `map/${entry.name}`,
			},
			steps: 10000,
		})
	}

	await manager.run()
}
