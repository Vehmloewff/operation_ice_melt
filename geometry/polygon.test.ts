import { asserts } from '../deps.ts'
import { Point } from '../types.ts'
import { isInsidePolygon } from './polygon.ts'

Deno.test('A point is inside a polygon', () => {
	const polygon: Point[] = [{ x: 1, y: 1 }, { x: 9, y: 1 }, { x: 9, y: 9 }, { x: 1, y: 9 }]

	asserts.assertEquals(isInsidePolygon({ x: 5, y: 5 }, polygon), true)
	asserts.assertEquals(isInsidePolygon({ x: 1, y: 1 }, polygon), true)
	asserts.assertEquals(isInsidePolygon({ x: 8, y: 8 }, polygon), true)
})

Deno.test('A point is outside a polygon', () => {
	const polygon: Point[] = [{ x: 1, y: 1 }, { x: 9, y: 1 }, { x: 9, y: 9 }, { x: 1, y: 9 }]

	asserts.assertEquals(isInsidePolygon({ x: 0, y: 5 }, polygon), false)
	asserts.assertEquals(isInsidePolygon({ x: 10, y: 10 }, polygon), false)
	asserts.assertEquals(isInsidePolygon({ x: 9, y: 9 }, polygon), false)
})
