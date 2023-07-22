import { getPathsFromShapeFile } from './geo_shape/mod.ts'
import { EARTH_LAND_DATA } from './sources.ts'
import { fillTiles } from './tasks/fill_tiles.ts'
import { generateTileGroups } from './tasks/mod.ts'
import { dtils } from './deps.ts'
import { convertPathsToSvg } from './svg.ts'

export async function ci(): Promise<void> {
	await dtils.check({ permissions: 'all', unstable: true })
}

export async function test(): Promise<void> {
	await dtils.test({ permissions: 'all', unstable: true })
}

/**
 * Generates tile groups for a new map. Accepts 4 args: x, y, width, and height.
 *
 * NOTE: all dimensions are in thousands. For example, the x and y of tile group 1x1.json is 1 and 1, not
 * 1000 and 1000. The same is true of with and height. */
export async function generateGroups(args: string[]): Promise<void> {
	const ensureIsNumArg = (name: string, pos: number, arg: unknown) => {
		if (!arg) throw new Error(`Expected argument ${name} at position ${pos} to be specified`)
		if (typeof arg !== 'string') throw new Error(`Weird, all CLI arguments should be strings, but ${name} at pos ${pos} was not`)

		const numberArg = parseInt(arg)
		if (isNaN(numberArg)) throw new Error(`Expected a valid integer for arg ${name} at pos ${pos}, but found ${arg}`)

		return numberArg
	}

	const [xRaw, yRaw, widthRaw, heightRaw] = args

	console.log(args, heightRaw)

	const x = ensureIsNumArg('x', 0, xRaw)
	const y = ensureIsNumArg('y', 1, yRaw)
	const width = ensureIsNumArg('width', 2, widthRaw)
	const height = ensureIsNumArg('height', 3, heightRaw)

	await generateTileGroups({ x, y, width, height })
}

/** Downloads a URL or URL constant (see url url_constants.ts), parses the result as a series of paths, and writes them to temp/paths.json */
export async function downloadPaths(args: string[]): Promise<void> {
	const [url] = args
	if (!url) throw new Error('Expected a URL as an argument')

	// TODO
}

/** Applies the mercator projection to temp/paths.json */
export async function projectPaths(): Promise<void> {
	// TODO
}

/** Applies the paths in temp/paths.json to the current map, filling all polygons with the specified terrain */
export async function fill(args: string[]): Promise<void> {
	const [terrain] = args
	if (!terrain) throw new Error('Expected a terrain as an argument')

	// TODO
}

/** Builds an SVG of temp/paths.json filling all polygons with the specified color at temp/paths.svg */
export async function buildPathsSvg(args: string[]): Promise<void> {
	const [color] = args
	if (!color) throw new Error('Expected a color as an argument')

	// TODO
}

/** Applies a grid to temp/paths.svg with `color` at intervals of `interval` */
export async function applySvgGrid(args: string[]): Promise<void> {
	const [color, intervalRaw] = args
	if (!color) throw new Error('Expected a color as the first argument')
	if (!intervalRaw) throw new Error('Expected an interval as the second argument')

	const interval = parseInt(intervalRaw)
	if (isNaN(interval)) throw new Error(`Expected an interval as a number, but got "${intervalRaw}"`)

	// TODO
}

/** Adds a dot at `x`,`y` with `color` */
export async function markSvgPoint(args: string[]): Promise<void> {
	const [x, y, color] = args

	// TODO validate x and y

	if (!color) throw new Error('Expected a color as an argument')

	// TODO
}

/** Serve temp/paths.svg */
export async function serveSvg(): Promise<void> {
	// TODO
}

/** Clean up artifacts from previous jobs */
export async function clean(): Promise<void> {
	await Deno.remove('temp', { recursive: true })
	await Deno.remove('map', { recursive: true })
}

// export async function earth(): Promise<void> {
// 	const size = 24000

// 	console.log('Getting land paths...')
// 	const paths = await getPathsFromShapeFile(EARTH_LAND_DATA)

// 	console.log('Converting paths into an SVG...')
// 	await dtils.writeText('temp/map.svg', convertPathsToSvg(paths))

// 	// console.log('Generating tile groups...')
// 	// await generateTileGroups(size, size)

// 	// console.log('Filling in the land...')
// 	// await fillTiles({ paths, resources: {}, terrain: 'forest' })
// }
