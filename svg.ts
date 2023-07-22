import { Point } from './types.ts'

export function convertPathsToSvg(paths: Point[][]): string {
	const stringedPaths = paths.map((points) => {
		const d = points.map((point, index) => {
			const loc = `${point.x.toFixed(2)} ${point.y.toFixed(2)}`

			return index === 0 ? `M${loc}` : `L${loc}`
		}).join(' ')

		return `<path d="${d}" fill="black" />`
	})

	return `
		<svg viewBox="0 0 24000 24000" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
			${stringedPaths.join('\n')}
		</svg>
	`
}

export function appendSvgCommands(svg: string, commands: string[]): string {
	const trimmed = svg.trim()
	if (!trimmed.endsWith('</svg>')) throw new Error('Expected a closing tag at end of file')

	return `${trimmed.slice(0, -6)}\t${commands.join('\n')}</svg>`
}

export function applySvgGrid(svg: string, color: string, interval: number): string {
	const lines: string[] = []

	const limit = Math.round(24000 / interval)

	for (let x = 1; x < limit; x++) {
		lines.push(`<line x1="${x * interval}" y1="0" x2="${x * interval}" y2="24000" stroke-width="4" stroke="${color}" />`)
	}

	for (let y = 1; y < limit; y++) {
		lines.push(`<line x1="0" y1="${y * interval}" x2="24000" y2="${y * interval}" stroke-width="4" stroke="${color}" />`)
	}

	return appendSvgCommands(svg, lines)
}

export function markSvgPoint(svg: string, point: Point, color: string): string {
	return appendSvgCommands(svg, [`<circle cx="${point.x}" cy="${point.y}" r="100" fill="${color}" />`])
}
