// import { Tile } from '../map/tile.ts'
// import { dtils, ProgressBar, progressBarWidgets } from './deps.ts'

// export async function generateTileGroups(width: number, height: number, map: string): Promise<void> {
// 	const groupsHorizontal = width / 1000
// 	const groupsVertical = height / 1000

// 	const totalColumns = width / 1000

// 	for (let horizontalIndex = 0; horizontalIndex < groupsHorizontal; horizontalIndex++) {
// 		console.log(`Generating tile group column ${horizontalIndex + 1}/${totalColumns}...`)

// 		for (let verticalIndex = 0; verticalIndex < groupsVertical; verticalIndex++) {
// 			const tiles: Tile[] = []

// 			const xStart = 1000 * horizontalIndex
// 			const xEnd = xStart + 1000
// 			const yStart = 1000 * verticalIndex
// 			const yEnd = yStart + 1000

// 			for (let x = xStart; x <= xEnd; x++) {
// 				for (let y = yStart; y <= yEnd; y++) {
// 					tiles.push({ x, y, resources: {}, terrain: 'sea' })
// 				}
// 			}

// 			await dtils.writeJson(`map/${map}/${horizontalIndex}x${verticalIndex}.json`, tiles, { separator: '\t' })
// 		}
// 	}
// }

// export async function getTileGroups(map: string): Promise<string[]> {
// 	const names: string[] = []

// 	for await (const entry of Deno.readDir(`map/${map}`)) {
// 		if (entry.name.endsWith('.json')) names.push(entry.name)
// 	}

// 	return names
// }

// export async function readTiles(map: string, fn: (tile: Tile[]) => void): Promise<void> {
// 	const names = await getTileGroups(map)

// 	const bar = new ProgressBar({
// 		total: names.length,
// 		widgets: [progressBarWidgets.percentageWidget, progressBarWidgets.amountWidget],
// 	})
// 	await bar.start()

// 	for (const index in names) {
// 		const indexNum = parseInt(index)
// 		const name = names[index]

// 		await bar.update(indexNum + 1)

// 		fn(await dtils.readJson(`map/${map}/${name}`))
// 	}

// 	await bar.finish()
// }

// export async function mapTiles(map: string, fn: (tile: Tile) => Promise<Tile> | Tile): Promise<void> {
// 	const names = await getTileGroups(map)

// 	const bar = new ProgressBar({
// 		total: names.length,
// 		widgets: [progressBarWidgets.percentageWidget, progressBarWidgets.amountWidget],
// 	})
// 	await bar.start()

// 	for (const index in names) {
// 		const indexNum = parseInt(index)
// 		const name = names[index]

// 		await bar.update(indexNum + 1)

// 		const path = `map/${map}/${name}`
// 		const tiles: Tile[] = await dtils.readJson(path)
// 		const newTiles: Tile[] = []

// 		for (const tile of tiles) {
// 			newTiles.push(await fn(tile))
// 		}

// 		await dtils.writeJson(path, newTiles, { separator: '\t' })
// 	}

// 	await bar.finish()
// }
