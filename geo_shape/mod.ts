import { Point } from '../types.ts'
import { getMapShapes } from './get_shapes.ts'
import { applyMercatorProjection } from './mercator.ts'

export async function getPathsFromShapeFile(shapesUrl: string): Promise<Point[][]> {
	const shapes = await getMapShapes(shapesUrl)

	return shapes.map((land) => land.coords.map((coord) => applyMercatorProjection(coord)))
}
