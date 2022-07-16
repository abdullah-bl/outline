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
	title: 'Outline | Made By Abdullah Bl',
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
			<body className='w-screen h-screen'>
				<main className='flex flex-col gap-1 w-screen h-screen overflow-scroll'>
					<Header />
					<Outlet />
				</main>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export function ErrorBoundary({ error }: { error: Error }) {
	const caught = useCatch()
	console.error(error)
	console.error(caught)
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body className='h-screen w-screen overflow-hidden'>
				{/* add the UI you want your users to see */}
				<div className='flex flex-col items-center justify-center h-screen'>
					<img src='/images/office.svg' alt='ops' className='w-1/2 h-1/2' />
					<h1 className='font-bold  text-3xl'>Ops</h1>
					<h1 className=' font-semibold '>Something went wrong...</h1>
					<p className='text-center text-blue-700 font-bold'>
						<a href='/'>Go back to the homepage</a>
					</p>
					<pre>{JSON.stringify(error, null, 2)}</pre>
				</div>
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
