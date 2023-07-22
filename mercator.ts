import { Point } from './types.ts'

/** Takes in a latitude and longitude, applies the mercator projection algorithm to it, and spits out a 24kx24k sized projection */
export function applyMercatorProjection(coord: Point): Point {
	// Adapted from https://stackoverflow.com/a/14457180/10533154

	const lat = coord.y
	const long = coord.x

	const mapWidth = 24000
	const mapHeight = 24000

	// get x value
	const x = (long + 180) * (mapWidth / 360)

	// convert from degrees to radians
	const latRad = lat * Math.PI / 180

	// get y value
	const mercatorNumber = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)))
	const y = (mapHeight / 2) - (mapWidth * mercatorNumber / (2 * Math.PI))

	return { x, y }
}
