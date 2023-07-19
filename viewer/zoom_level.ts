import { provideTile } from './provide_tile.ts'

const ON_SCREEN_TILE_SIZE = 200
const INITIAL_IN_GAME_TILE_SIZE = 6000 // At zoom=1, one tile is 6k sq miles

export interface CreateZoomLevelParams {
	level: number
	width: number
	height: number
	centerAtMilesX: number
	centerAtMilesY: number
}

export function createZoomLevel(params: CreateZoomLevelParams): HTMLElement {
	const inGameTileSize = INITIAL_IN_GAME_TILE_SIZE / params.level
	const container = document.createElement('div')

	const tilesHorizontal = Math.ceil(params.width / ON_SCREEN_TILE_SIZE)
	const tilesVertical = Math.ceil(params.height / ON_SCREEN_TILE_SIZE)

	const insetLeft = (tilesHorizontal * ON_SCREEN_TILE_SIZE - params.width) / 2
	const insetTop = (tilesVertical * ON_SCREEN_TILE_SIZE - params.height) / 2

	container.style.left = `${insetLeft}px`
	container.style.top = `${insetTop}px`

	const tilesFromLeftToCenter = tilesHorizontal / 2
	const tilesFromTopToCenter = tilesVertical / 2

	const milesXOfLeftTiles = params.centerAtMilesX - tilesFromLeftToCenter * inGameTileSize
	const milesYOfTopTiles = params.centerAtMilesY - tilesFromTopToCenter * inGameTileSize

	for (let verticalTileIndex = 0; verticalTileIndex < tilesVertical; verticalTileIndex++) {
		for (let horizontalTileIndex = 0; horizontalTileIndex < tilesHorizontal; horizontalTileIndex++) {
			const tileContainer = document.createElement('div')

			tileContainer.style.width = `${ON_SCREEN_TILE_SIZE}px`
			tileContainer.style.height = `${ON_SCREEN_TILE_SIZE}px`

			const tileMileX = milesXOfLeftTiles + horizontalTileIndex * inGameTileSize
			const tileMileY = milesYOfTopTiles + verticalTileIndex * inGameTileSize

			provideTile({ x: tileMileX, y: tileMileY, z: params.level }).then((svg) => {
				console.log(svg)
				const vector = makeSvgFromHtml(svg)

				vector.style.width = '100%'
				vector.style.height = '100%'

				tileContainer.appendChild(vector)
			})

			container.appendChild(tileContainer)
		}
	}

	return container
}

function makeSvgFromHtml(html: string) {
	const div = document.createElement('div')
	div.innerHTML = html.trim()

	const child = div.children[0]
	if (child instanceof SVGElement) return child

	throw new Error('Tried to convert html to svg, but the html did not include just an SVG element')
}
