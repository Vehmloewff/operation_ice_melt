import { dtils, pathUtils } from '../deps.ts'

export interface GeoPoint {
	lat: number
	long: number
}

export interface GeoShape {
	coords: GeoPoint[]
}

export async function getMapShapes(url: string): Promise<GeoShape[]> {
	const zipFilePath = 'temp/shape.zip'
	const shapesDirectoryPath = 'temp/shape'
	const shapeJsonPath = 'temp/shapes.json'

	if (await dtils.exists(shapeJsonPath)) return await dtils.readJson(shapeJsonPath)

	console.log('Downloading...')
	const response = await fetch(url)

	await dtils.writeBinary(zipFilePath, new Uint8Array(await response.arrayBuffer()))

	console.log('Unzipping...')
	await unzipPath(zipFilePath, shapesDirectoryPath)

	console.log('Finding shape file...')
	const shapeFilePath = await findFileWithExtension(shapesDirectoryPath, 'shp')

	console.log('Parsing shapes file...')
	await runPythonScript('geo_shape/shape_to_json.py', [shapeFilePath, shapeJsonPath])

	console.log('Loading parsed data...')
	return await dtils.readJson(shapeJsonPath)
}

async function unzipPath(zipPath: string, outputPath: string) {
	await dtils.shCapture(`unzip -o ${zipPath} -d ${outputPath}`)
}

async function findFileWithExtension(dirPath: string, extension: string) {
	for await (const entry of Deno.readDir(dirPath)) {
		if (entry.name.endsWith(`.${extension}`) && entry.isFile) {
			return pathUtils.join(dirPath, entry.name)
		}
	}

	throw new Error(`A file with extension "${extension}" was not found in directory: ${dirPath}`)
}

async function runPythonScript(path: string, args: string[]): Promise<void> {
	await dtils.sh(`python3 ${path} ${args.join(' ')}`)
}
