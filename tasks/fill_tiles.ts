import { Resources, Terrain, Tile } from '../map_types.ts'
import { TaskManager } from '../task_manager.ts'
import { getMapGroups, getTileGroup, setTileGroup } from '../tile_groups.ts'
import { Point } from '../types.ts'
import type { FillTilesCommand } from './fill_tiles.worker.ts'

export interface FillTilesParams {
	paths: Point[][]
	terrain: Terrain
	resources: Resources
}

export async function fillTiles(params: FillTilesParams): Promise<void> {
	const groups = await getMapGroups()

	for await (const group of groups) {
		console.log(`Filling tiles in group ${group}...`)

		const tiles = await getTileGroup(group)
		const filledTiles: Tile[] = []

		const manager = new TaskManager<Tile[]>(new URL('./fill_tiles.worker.ts', import.meta.url), (tiles) => filledTiles.push(...tiles))

		while (tiles.length) {
			const taskTiles = tiles.splice(0, 100)

			manager.queueTask<FillTilesCommand>({
				data: {
					paths: params.paths,
					resources: params.resources,
					terrain: params.terrain,
					tiles: taskTiles,
				},
				steps: 100,
			})
		}

		await manager.run()

		await setTileGroup(group, filledTiles)
	}
}
