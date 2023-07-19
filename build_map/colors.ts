import { Terrain } from '../map/tile.ts'

export type Color = [number, number, number, number]

export const FOREST_COLOR: Color = [187, 226, 197, 255]
export const PLAINS_COLOR: Color = [241, 233, 215, 255]
export const SEA_COLOR: Color = [138, 180, 248, 255]
export const FRESHWATER_COLOR: Color = [138, 180, 248, 255]

export function getColorForTerrain(terrain: Terrain): Color {
	if (terrain === 'sea') return SEA_COLOR
	if (terrain === 'forest') return FOREST_COLOR
	if (terrain === 'freshwater') return FRESHWATER_COLOR
	if (terrain === 'plains') return PLAINS_COLOR

	throw new Error(`Unsupported terrain: ${terrain}`)
}
