export type Terrain = 'sea' | 'forest' | 'freshwater' | 'plains' | 'hills'

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
