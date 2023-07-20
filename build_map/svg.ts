// import { Point } from './lines_intersect.ts'

// export function convertPathsToSvg(paths: Point[][]): string {
// 	const stringedPaths = paths.map((points) => {
// 		const d = points.map((point, index) => {
// 			const loc = `${point.x.toFixed(2)} ${point.y.toFixed(2)}`

// 			return index === 0 ? `M${loc}` : `L${loc}`
// 		}).join(' ')

// 		return `<path d="${d}" fill="black" />`
// 	})

// 	return `
// 		<svg viewBox="0 0 24000 24000" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
// 			${stringedPaths.join('\n')}
// 		</svg>
// 	`
// }
