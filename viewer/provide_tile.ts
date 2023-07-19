export interface ProvideTileParams {
	z: number
	x: number
	y: number
}

export function provideTile(params: ProvideTileParams): Promise<string> {
	return Promise.resolve(`
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<rect x="0" y="0" width="100" height="100" fill="black" />

			<line x1="5" y1="5" x2="95" y2="5" stroke="red" />
			<line x1="95" y1="5" x2="95" y2="95" stroke="red" />
			<line x1="95" y1="95" x2="5" y2="95" stroke="red" />
			<line x1="5" y1="95" x2="5" y2="5" stroke="red" />

			<text x="45" y="45" class="small" style="font: 10px sans-serif; fill: red;">${params.z}@${params.x},${params.y}</text>
		</svg>
	`)
}
