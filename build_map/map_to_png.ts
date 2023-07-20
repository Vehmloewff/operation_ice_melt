// import { getColorForTerrain } from './colors.ts'
// import { Canvas } from './deps.ts'
// import { readTiles } from './tile_groups.ts'

// export async function mapToPng(outFile: string): Promise<void> {
// 	const mapSize = 24000
// 	const size = mapSize / 10

// 	const canvas = Canvas.createCanvas(size, size)
// 	const ctx = canvas.getContext('2d')

// 	const image = new Canvas.ImageData(size, size)

// 	await readTiles('earth', (tiles) => {
// 		for (const tile of tiles) {
// 			if (tile.x % 10 !== 0 || tile.y % 10 !== 0) continue

// 			const rowIndex = (tile.y / 10 + 1) * size
// 			const tileIndex = rowIndex + tile.x / 10
// 			const colorIndex = tileIndex * 4
// 			const color = getColorForTerrain(tile.terrain)

// 			image.data[colorIndex] = color[0]
// 			image.data[colorIndex + 1] = color[1]
// 			image.data[colorIndex + 2] = color[2]
// 			image.data[colorIndex + 3] = color[3]
// 		}
// 	})

// 	ctx.putImageData(image, 0, 0)
// 	canvas.save(outFile)
// }
