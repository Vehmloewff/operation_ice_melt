import { dtils } from './deps.ts'

export async function ci(): Promise<void> {
	await dtils.check({ permissions: 'all' })
}

export async function earth(): Promise<void> {}
