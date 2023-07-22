import { dtils } from './deps.ts'
import { Tile } from './map_types.ts'
import { Point } from './types.ts'

export async function getTileGroup(name: string): Promise<Tile[]> {
	const path = `map/tile_groups/${name}.json`
	const tiles = await dtils.readJson(path)

	if (!Array.isArray(tiles)) throw new Error(`Invalid tile group at ${path}`)

	return tiles
}

export function getTileGroups(thousandsStart: Point, width: number, height: number): string[] {
	const names: string[] = []

	for (let y = thousandsStart.y; y < height; y++) {
		for (let x = thousandsStart.x; x < width; x++) names.push(`${x}x${y}`)
	}

	return names
}

export async function setTileGroup(name: string, tiles: Tile[]): Promise<void> {
	await dtils.writeJson(`map/tile_groups/${name}.json`, tiles)
}

export function getTileGroupFirstPoint(tileGroup: string): Point {
	const [xRaw, yRaw] = tileGroup.split('x')

	const x = parseInt(xRaw)
	const y = parseInt(yRaw)

	if (isNaN(x) || isNaN(y)) throw new Error(`Invalid tile group name: ${tileGroup}`)

	return { x, y }
}

export async function getMapGroups(): Promise<string[]> {
	const groups = await dtils.recursiveReadDir('map/tile_groups')

	return groups.map((group) => group.slice(16, -5))
}

export interface MapViewBox {
	x: number
	y: number
	width: number
	height: number
}

export function getMapViewBox(groups: string[]): MapViewBox {
	const points = groups.map(getTileGroupFirstPoint)

	const xValues = points.map((point) => point.x)
	const yValues = points.map((point) => point.y)

	const x = Math.min(...xValues)
	const y = Math.min(...yValues)
	const maxX = Math.max(...xValues)
	const maxY = Math.max(...yValues)

	const width = maxX - x
	const height = maxY - y

	return { x, y, width, height }
}
