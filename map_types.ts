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
	width: number
	height: number
	loopX: boolean
	id: string
	name: string
}
