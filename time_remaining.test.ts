import { asyncUtils } from './deps.ts'
import { makeTimeRemainingWidget } from './time_remaining.ts'

Deno.test('time remaining should display the time remaining', async () => {
	const remaining = makeTimeRemainingWidget({ reportRawMs: true })

	for (let i = 1; i <= 100; i++) {
		await asyncUtils.delay(10)
		remaining(i, 400)
	}

	await asyncUtils.delay(10)
	const firstTime = parseInt(remaining(101, 400))

	await asyncUtils.delay(10)
	const secondTime = parseInt(remaining(102, 400))

	await asyncUtils.delay(10)
	const thridTime = parseInt(remaining(103, 400))

	await asyncUtils.delay(10)
	const fourthTime = parseInt(remaining(104, 400))

	await asyncUtils.delay(10)
	const fifthTime = parseInt(remaining(105, 400))

	await asyncUtils.delay(10)
	const sixthTime = parseInt(remaining(106, 400))
})
