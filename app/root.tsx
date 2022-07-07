import styles from './styles/app.css'

import type { MetaFunction } from '@remix-run/node'
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from '@remix-run/react'
import Header from './components/header'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export function links() {
	return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
	return (
		<html lang='en'>
			<head>
				<Meta />
				<Links />
			</head>
			<body className='w-screen h-screen '>
				<Header />
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error)
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body className='h-screen w-screen overflow-hidden'>
				{/* add the UI you want your users to see */}
				<h1>Ops</h1>
				<Scripts />
			</body>
		</html>
	)
}

export function CatchBoundary() {
	const caught = useCatch()
	return (
		<html>
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body className=''>
				<div className='flex items-center justify-center h-screen w-screen flex-col'>
					<h1 className='font-mono font-semibold'>Ops Something went wrong</h1>
					<h2 className='font-mono font-semibold'>{caught.status}</h2>
					<h2 className='font-mono font-semibold'>{caught.statusText}</h2>
					<Link to={'/'} className='font-bold  hover:text-blue-700'>
						Go Home
					</Link>
				</div>
				<Scripts />
			</body>
		</html>
	)
}
