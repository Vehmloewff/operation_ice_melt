import { isInsidePolygon } from '../geometry/polygon.ts'
import { Resources, Terrain, Tile } from '../map_types.ts'
import { onTaskReceived, registerStep, registerTaskCompletion } from '../task_manager.ts'
import { Point } from '../types.ts'

export interface FillTilesCommand {
	paths: Point[][]
	terrain: Terrain
	resources: Resources
	tiles: Tile[]
}

onTaskReceived<FillTilesCommand>((task) => {
	if (task.steps < 1000) throw new Error('There must be and equal or greater amount of steps than tiles in a tile group row')

	const divider = task.data.tiles.length / task.steps

	for (const tile of task.data.tiles) {
		if (tile.x % divider === 0) registerStep()

		for (const path of task.data.paths) {
			if (!isInsidePolygon({ x: tile.x, y: tile.y }, path)) continue

			tile.terrain = task.data.terrain
			tile.resources = { ...tile.resources, ...task.data.resources }

			break
		}
	}

	registerTaskCompletion(task.data.tiles)
})
