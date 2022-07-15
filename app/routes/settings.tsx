import { GearIcon } from '@radix-ui/react-icons'
import { Link, Outlet } from '@remix-run/react'
import { Container } from '~/components/container'
import { Heading } from '~/components/text'

export default function Settings() {
	return (
		<Container>
			<Heading>
				<GearIcon width={22} height={22} /> Settings
			</Heading>
			<div className='flex gap-1 items-baseline'>
				<div className='w-1/5 p-2'>
					<h2> Important Links .. </h2>
					<Link to={'/settings/me'}> About Me </Link>
				</div>
				<div className='flex-1 h-full w-full'>
					<Outlet />
				</div>
			</div>
		</Container>
	)
}
