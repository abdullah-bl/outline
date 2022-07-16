import { GearIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { Container } from '~/components/container'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listview'

export default function Settings() {
	const { pathname } = useLocation()
	return (
		<ListViewLayout title='Settings'>
			<ListView>
				<ListItemLink to='.' active={pathname === '/settings'}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						General
						<GearIcon />
					</ListViewItem>
				</ListItemLink>
				<ListItemLink to='./me' active={pathname.endsWith('me')}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						About Me
						<InfoCircledIcon />
					</ListViewItem>
				</ListItemLink>
				<Link to='/settings/me'>
					<ListViewItem>Me</ListViewItem>
				</Link>
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
