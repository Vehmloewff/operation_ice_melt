import { GeoPoint } from './get_shapes.ts'
import { Point } from './lines_intersect.ts'

/** Takes in a latitude and longitude, applies the mercator projection algorithm to it, and spits out a 24kx24k sized projection */
export function applyMercatorProjection(geo: GeoPoint): Point {
	// Adapted from https://stackoverflow.com/a/14457180/10533154

	const mapWidth = 24000
	const mapHeight = 24000

	// get x value
	const x = (geo.long + 180) * (mapWidth / 360)

	// convert from degrees to radians
	const latRad = geo.lat * Math.PI / 180

	// get y value
	const mercatorNumber = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)))
	const y = (mapHeight / 2) - (mapWidth * mercatorNumber / (2 * Math.PI))

	return { x, y }
}
