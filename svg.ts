import { Point } from './types.ts'

export function convertPathsToSvg(paths: Point[][]): string {
	const stringedPaths = paths.map((points) => {
		const d = points.map((point, index) => {
			const loc = `${point.x.toFixed(2)} ${point.y.toFixed(2)}`

			return index === 0 ? `M${loc}` : `L${loc}`
		}).join(' ')

		return `<path d="${d}" fill="black" />`
	})

	const lines: string[] = []

	for (let x = 1; x < 24; x++) {
		lines.push(`<line x1="${x * 1000}" y1="0" x2="${x * 1000}" y2="24000" stroke-width="4" stroke="red" />`)
	}

	for (let y = 1; y < 24; y++) {
		lines.push(`<line x1="0" y1="${y * 1000}" x2="24000" y2="${y * 1000}" stroke-width="4" stroke="red" />`)
	}

	return `
		<svg viewBox="0 0 24000 24000" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
			${stringedPaths.join('\n')}
			${lines.join('\n')}
		</svg>
	`
}
