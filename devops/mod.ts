import { getPathsFromShapeFile } from '../geo_shape/mod.ts'
import { EARTH_LAND_DATA } from '../sources.ts'
import { fillTiles } from '../tasks/fill_tiles.ts'
import { generateTileGroups } from '../tasks/mod.ts'
import { dtils } from './deps.ts'

export async function ci(): Promise<void> {
	await dtils.check({ permissions: 'all' })
}

export async function earth(): Promise<void> {
	const size = 24000

	console.log('Getting land paths...')
	const paths = await getPathsFromShapeFile(EARTH_LAND_DATA)

	console.log('Generating tile groups...')
	await generateTileGroups(size, size)

	console.log('Filling in the land...')
	await fillTiles({ paths, resources: {}, terrain: 'forest' })
}

await earth()
