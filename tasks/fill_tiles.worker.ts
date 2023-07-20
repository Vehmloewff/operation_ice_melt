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
	if (task.steps < 1000) throw new Error('There must be and equal or greater amount of steps than tiles in a tile group row')

	const tiles: Tile[] = await dtils.readJson(task.data.tileGroupFile)
	const divider = tiles.length / task.steps

	for (const tile of tiles) {
		if (tile.x % divider === 0) registerStep()

		for (const path of task.data.paths) {
			if (!isInsidePolygon({ x: tile.x, y: tile.y }, path)) continue

			tile.terrain = task.data.terrain
			tile.resources = { ...tile.resources, ...task.data.resources }

			break
		}
	}

	await dtils.writeJson(task.data.tileGroupFile, tiles, { separator: '\t' })
})
