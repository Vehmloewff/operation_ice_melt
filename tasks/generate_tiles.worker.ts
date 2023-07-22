import { Tile } from '../map_types.ts'
import { onTaskReceived, registerStep, registerTaskCompletion } from '../task_manager.ts'
import { setTileGroup } from '../tile_groups.ts'
import { Point } from '../types.ts'

onTaskReceived<Point>(async ({ data: thousandsPoint, steps }) => {
	if (steps < 1000) throw new Error('There must be and equal or greater amount of steps than tiles in a tile group row')

	const tiles: Tile[] = []

	const xStart = 1000 * thousandsPoint.x
	const xEnd = xStart + 1000
	const yStart = 1000 * thousandsPoint.y
	const yEnd = yStart + 1000

	const total = (yEnd - yStart) * (xEnd - xStart)
	const divider = total / steps

	let stepsRegistered = 0

	for (let y = yStart; y < yEnd; y++) {
		for (let x = xStart; x < xEnd; x++) {
			if (x % divider === 0) {
				registerStep()
				stepsRegistered++
			}

			tiles.push({ x, y, resources: {}, terrain: 'sea' })
		}
	}

	await setTileGroup(`${thousandsPoint.x}x${thousandsPoint.y}`, tiles)

	registerTaskCompletion(null)
})
