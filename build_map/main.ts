import { dtils } from './deps.ts'
import { getMapShapes } from './get_shapes.ts'
import { Point } from './lines_intersect.ts'
import { applyMercatorProjection } from './location.ts'
import { mapToPng } from './map_to_png.ts'
import { isInsidePolygon } from './polygon.ts'
import { convertPathsToSvg } from './svg.ts'
import { generateTileGroups, mapTiles } from './tile_groups.ts'

// Get the map shapes from an online source
const rawDataPoints = await getMapShapes(
	'https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_land.zip',
)

// Project those shapes into a mercator projection
const paths = rawDataPoints.map((land) => land.coords.map((coord) => applyMercatorProjection(coord)))

// Write an SVG of the map for debugging purposes
await dtils.writeText('build_map/temp/map.svg', convertPathsToSvg(paths))

// Build the map tile groups
// console.log('Generating tile groups...')
// await generateTileGroups(24000, 24000, 'earth')

// Map land onto the tiles
// console.log('Mapping land onto the tiles...')
// await mapTiles('earth', (tile) => {
// 	const point: Point = { x: tile.x, y: tile.y }

// 	for (const path of paths) {
// 		if (!isInsidePolygon(point, path)) continue

// 		tile.terrain = 'forest'
// 		break
// 	}

// 	return tile
// })

// Build an image of the tiles
console.log('Building an image of the tiles...')
await mapToPng('map/earth/overview.png')
