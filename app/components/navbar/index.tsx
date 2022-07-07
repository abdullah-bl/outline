import {
	DimensionsIcon,
	FileIcon,
	HomeIcon,
	BookmarkIcon,
	StackIcon,
	GearIcon,
} from '@radix-ui/react-icons'
import { Link, useLocation } from '@remix-run/react'
import { NavbarItem } from './NavbarItem'

export default function Navbar() {
	const { pathname } = useLocation()
	return (
		<div className='container mx-auto flex flex-col md:flex-row items-center justify-between py-3 select-none'>
			<nav className='w-full py-2'>
				<ul className='flex space-x-4'>
					<NavbarItem
						active={pathname === '/'}
						to='/'
						icon={<HomeIcon />}
						label={'Home'}
					/>
					<NavbarItem
						active={pathname.includes('/posts')}
						to='/posts'
						icon={<BookmarkIcon />}
						label={'Posts'}
					/>
					<NavbarItem
						active={pathname.includes('/categories')}
						to='/categories'
						icon={<StackIcon />}
						label={'Categories'}
					/>
					<NavbarItem
						active={pathname.includes('/projects')}
						to='/projects'
						icon={<DimensionsIcon />}
						label={'Projects'}
					/>
					<NavbarItem
						active={pathname.includes('/reports')}
						to='/reports'
						icon={<FileIcon />}
						label={'Reports'}
					/>
					<NavbarItem
						active={pathname.includes('/settings')}
						to='/settings'
						icon={<GearIcon />}
						label={'Settings'}
					/>
				</ul>
			</nav>
		</div>
	)
}
