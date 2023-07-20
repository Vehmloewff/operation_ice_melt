import { dtils } from '../deps.ts'
import { isInsidePolygon } from '../geometry/polygon.ts'
import { Resources, Terrain, Tile } from '../map_types.ts'
import { onTaskReceived, registerStep } from '../task_manager.ts'
import { Point } from '../types.ts'

export interface FillTilesCommand {
	paths: Point[][]
	terrain: Terrain
	resources: Resources
	tileGroupFile: string
}

onTaskReceived<FillTilesCommand>(async (task) => {
	const tiles: Tile[] = await dtils.readJson(task.data.tileGroupFile)

	for (const tile of tiles) {
		if (tile.x % 100 === 0) registerStep()

		for (const path of task.data.paths) {
			if (!isInsidePolygon({ x: tile.x, y: tile.y }, path)) continue

			tile.terrain = task.data.terrain
			tile.resources = { ...tile.resources, ...task.data.resources }

			break
		}
	}

	await dtils.writeJson(task.data.tileGroupFile, tiles, { separator: '\t' })
})
