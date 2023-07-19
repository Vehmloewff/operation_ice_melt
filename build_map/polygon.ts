import { doIntersect, Point } from './lines_intersect.ts'

/** Returns true if line `l1`, `l2` is inside `polygon` */
export function isInsidePolygon(point: Point, polygon: Point[]): boolean {
	const greatestX = Math.max(...polygon.map((point) => point.y)) + 1
	const rayEndPoint: Point = { x: greatestX, y: point.y }

	let intersectionCount = 0

	let lastPoint = null
	for (const point of polygon) {
		if (!lastPoint) {
			lastPoint = point
			continue
		}

		if (doIntersect(point, rayEndPoint, lastPoint, point)) intersectionCount++
	}

	// The point is inside the polygon if it's ray intersects the polygon an odd number of times
	return intersectionCount % 2 === 1
}
