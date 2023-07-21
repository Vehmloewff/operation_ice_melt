export function sum(numbers: number[]): number {
	let sum = 0

	for (const number of numbers) sum += number

	return sum
}

export function getDifferences(numbers: number[]): number[] {
	const differences: number[] = []

	for (const num of numbers) {
		const lastNum = differences[differences.length - 1]
		if (!lastNum) continue

		differences.push(num - lastNum)
	}

	return differences
}

export function formatMilliseconds(ms: number): string {
	if (ms < 1000) return `${ms}ms`
	if (ms < 1000 * 60) return `${Math.round(ms / 1000)}s`
	if (ms < 1000 * 60 * 60) return `${Math.round(ms / (1000 * 60))}m`

	return `${Math.round(ms / (1000 * 60 * 60))}h`
}
