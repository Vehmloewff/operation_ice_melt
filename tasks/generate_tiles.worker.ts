import { dtils } from '../deps.ts'
import { Tile } from '../map_types.ts'
import { onTaskReceived, registerStep, registerTaskCompletion } from '../task_manager.ts'
import { Point } from '../types.ts'

onTaskReceived<Point>(async ({ data: thousandsPoint, steps }) => {
	if (steps !== 10000) throw new Error('Expected a step every 100 tiles')

	const tiles: Tile[] = []

	const xStart = 1000 * thousandsPoint.x
	const xEnd = xStart + 1000
	const yStart = 1000 * thousandsPoint.y
	const yEnd = yStart + 1000

	for (let x = xStart; x <= xEnd; x++) {
		for (let y = yStart; y <= yEnd; y++) {
			if (y % 100 === 0) registerStep()

			tiles.push({ x, y, resources: {}, terrain: 'sea' })
		}
	}

	await dtils.writeJson(`map/tile_groups/${thousandsPoint.x}x${thousandsPoint.y}.json`, [], { separator: '\t' })

	registerTaskCompletion()
})
