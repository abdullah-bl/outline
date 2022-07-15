import { Link } from '@remix-run/react'
import { ShadowIcon } from '@radix-ui/react-icons'
import Navbar from '../navbar'

export default function Header() {
	return (
		<header className='dark:bg-gray-900 bg-white w-full top-0 fixed shadow-sm z-10 mb-3'>
			<div className='container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2'>
				<Link
					to='/'
					className='dark:text-white text-slate-900  font-bold text-xl md:text-2xl flex items-center gap-2'
				>
					<ShadowIcon
						width={32}
						height={32}
						className='text-white dark:text-slate-900'
					/>
				</Link>
				<Navbar />
			</div>
		</header>
	)
}
