import { Outlet } from '@remix-run/react'
import { Container } from '~/components/container'
import { Heading } from '~/components/text'

export default function Settings() {
	return (
		<Container>
			<Heading> Reports </Heading>
			<h1> Type of reports </h1>
			<div className='flex gap-1 items-baseline'>
				<div className='w-1/6'>
					<h2> All </h2>
					<h2> One </h2>
					<h2> One </h2>
				</div>
				<div className='flex-1 h-full w-full'>
					<Outlet />
				</div>
			</div>
		</Container>
	)
}
