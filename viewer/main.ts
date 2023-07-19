import { createZoomLevel } from './zoom_level.ts'

const width = document.body.clientWidth
const height = document.body.clientHeight

if (!width || !height) throw new Error(`Invalid width and height. Must be a number greater than one, but received ${width} and ${height}`)

const levelElement = createZoomLevel({ centerAtMilesX: 12000, centerAtMilesY: 6000, height, width, level: 1 })

document.body.appendChild(levelElement)
