import { asserts } from './deps.ts'
import { doIntersect, Point } from './lines_intersect.ts'

Deno.test('Parallel lines don\'t intersect', () => {
	const p1: Point = { x: 1, y: 1 }
	const q1: Point = { x: 10, y: 1 }
	const p2: Point = { x: 1, y: 2 }
	const q2: Point = { x: 10, y: 2 }

	asserts.assertEquals(doIntersect(p1, q1, p2, q2), false)
})

Deno.test('Lines don\'t intersect because the segments end before they could', () => {
	const p1: Point = { x: 10, y: 1 }
	const q1: Point = { x: 0, y: 10 }
	const p2: Point = { x: 0, y: 0 }
	const q2: Point = { x: 10, y: 10 }

	asserts.assertEquals(doIntersect(p1, q1, p2, q2), true)
})

Deno.test('Segments don\'t intersect because they are at different places on the same line', () => {
	const p1: Point = { x: -5, y: -5 }
	const q1: Point = { x: 0, y: 0 }
	const p2: Point = { x: 1, y: 1 }
	const q2: Point = { x: 10, y: 10 }

	asserts.assertEquals(doIntersect(p1, q1, p2, q2), false)
})
