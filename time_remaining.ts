import { formatMilliseconds } from './helpers.ts'

export type ProgressWidget = (step: number, total: number) => string

export interface MakeTimeRemainingWidgetOptions {
	reportRawMs?: boolean
}

export function makeTimeRemainingWidget(options: MakeTimeRemainingWidgetOptions = {}): ProgressWidget {
	const lastIncrements: number[] = []

	return (step, total) => {
		lastIncrements.push(Date.now())

		if (lastIncrements.length < 100) {
			return 'estimating...'
		}

		lastIncrements.shift()

		const minDistance = lastIncrements[0]
		const maxDistance = lastIncrements[lastIncrements.length - 1]
		const hundredStepTime = maxDistance - minDistance
		const timeEstimate = (total / 100) * hundredStepTime
		const ratioLeft = (total - step) / total
		const msLeft = timeEstimate * ratioLeft

		if (options.reportRawMs) return Math.round(msLeft).toString()

		return `${formatMilliseconds(timeEstimate * ratioLeft)}                                 `
	}
}
