import { Link } from '@remix-run/react'
import { ShadowIcon } from '@radix-ui/react-icons'

export default function Header() {
	return (
		<header className='bg-gray-900 w-full top-0 sticky shadow-b'>
			<div className='container mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between'>
				<Link
					to='/'
					className='dark:text-white text-slate-900  font-bold text-xl md:text-2xl flex items-center gap-2'
				>
					<ShadowIcon width={32} height={32} />
				</Link>
			</div>
		</header>
	)
}
