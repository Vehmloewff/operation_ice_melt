import { Point } from '../types.ts'
import { doIntersect } from './lines_intersect.ts'

/** Returns true if line `l1`, `l2` is inside `polygon` */
export function isInsidePolygon(point: Point, polygon: Point[]): boolean {
	if (!polygon.length) return false

	const greatestX = Math.max(...polygon.map((point) => point.x)) + 1
	const rayEndPoint: Point = { x: greatestX, y: point.y }

	let intersectionCount = 0

	let lastPoint = null
	for (const polygonPoint of polygon) {
		if (!lastPoint) {
			lastPoint = polygonPoint
			continue
		}

		if (doIntersect(point, rayEndPoint, lastPoint, polygonPoint)) intersectionCount++

		lastPoint = polygonPoint
	}

	// Now that we have checked every point, we need to check the first point against the last one, which closes the path
	if (!lastPoint) throw new Error('Logical error above. lastPoint should have been set')
	if (doIntersect(point, rayEndPoint, lastPoint, polygon[0])) intersectionCount++

	// The point is inside the polygon if it's ray intersects the polygon an odd number of times
	return intersectionCount % 2 === 1
}
