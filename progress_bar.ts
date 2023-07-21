const EMPTY_CHAR = '-'
const FULL_CHAR = '='

export class ProgressBar {
	total: number

	constructor(total: number) {
		this.total = total
	}

	#print() {
		const { rows } = Deno.consoleSize()

		const progressRows = rows - 22
	}
}
