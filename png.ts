import { getColorForTerrain } from './colors.ts'
import { Canvas, dtils, ProgressBar } from './deps.ts'
import { getMapViewBox, getTileGroup } from './tile_groups.ts'

export async function mapToPng(outFile: string, zoom: number): Promise<void> {
	if (zoom > 1) throw new Error('Can not do zooming in with png images')
	if (zoom < 0.0001) throw new Error('Can not do zooming smaller than .0001')

	const spacer = 1 / zoom
	const groups = await dtils.recursiveReadDir('map/tile_groups')

	const viewBox = getMapViewBox(groups)
	const imageWidth = viewBox.width / spacer
	const imageHeight = viewBox.height / spacer

	const canvas = Canvas.createCanvas(imageWidth, imageHeight)
	const ctx = canvas.getContext('2d')

	const image = new Canvas.ImageData(imageWidth, imageHeight)

	const progressBar = new ProgressBar({ total: groups.length })
	await progressBar.start()

	for (const group of groups) {
		const tiles = await getTileGroup(group)

		for (const tile of tiles) {
			if (tile.x % spacer !== 0 || tile.y % spacer !== 0) continue

			const localTileX = (tile.x - viewBox.x) / spacer
			const localTileY = (tile.y - viewBox.y) / spacer

			const rowIndex = (localTileY + 1) * imageWidth
			const tileIndex = rowIndex + localTileX
			const colorIndex = tileIndex * 4
			const color = getColorForTerrain(tile.terrain)

			image.data[colorIndex] = color[0]
			image.data[colorIndex + 1] = color[1]
			image.data[colorIndex + 2] = color[2]
			image.data[colorIndex + 3] = color[3]
		}

		progressBar.update(groups.indexOf(group) + 1)
	}

	await progressBar.finish()

	ctx.putImageData(image, 0, 0)
	canvas.save(outFile)
}
