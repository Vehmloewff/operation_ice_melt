import { bundle, dtils } from './deps.ts'

const html = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>

		<script src="main.js" defer></script>

		<style>
			html, body {
				height: 100%;
				margin: 0;
				padding: 0;
			}
		</style>
	</head>
	<body>
		
	</body>
	</html>
`

export async function ci(): Promise<void> {
	await dtils.check({ permissions: 'all' })
}

export async function web(): Promise<void> {
	const { code, map } = await bundle('./viewer/main.ts', {
		compilerOptions: { sourceMap: true },
	})

	Deno.serve({ port: 3000 }, (request) => {
		const url = new URL(request.url)

		if (url.pathname === '/') {
			return new Response(html, { headers: { 'Content-Type': 'text/html' } })
		}

		if (url.pathname === '/main.js') {
			const headers = new Headers()

			headers.append('Content-Type', 'application/javascript')
			if (map) headers.append('SourceMap', './main.js.map')

			return new Response(code, { headers })
		}

		if (url.pathname === '/main.js.map') return new Response(map || '')

		return new Response('Not Found')
	})
}
