import { Outlet } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'

export default function Settings() {
	return (
		<>
			<Navbar />
			<Container>
				<div className='flex gap-1 items-baseline'>
					<div>
						<h1> Hello From Settings ....</h1>
					</div>
					<div className='flex-1 h-full w-full'>
						<Outlet />
					</div>
				</div>
			</Container>
		</>
	)
}
