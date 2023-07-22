export type Terrain = 'sea' | 'forest' | 'freshwater' | 'plains' | 'hills'

export function ensureIsTerrain(input: string): Terrain {
	if (input === 'sea' || input === 'forest' || input === 'freshwater' || input === 'plains' || input === 'hills') return input

	throw new Error(`"${input}" is not valid terrain`)
}

export interface Resources {
	fish?: number
	oil?: number
	lumber?: number
}

export interface Tile {
	x: number
	y: number
	terrain: Terrain
	resources: Resources
}

export interface Meta {
	/** The id of the map */
	id: string
	/** The name of the map */
	name: string
	/** The start of the map in the X direction */
	x: number
	/** The start of the map in the Y direction */
	y: number
	/** The width of the map */
	width: number
	/** The height of the map */
	height: number
}
