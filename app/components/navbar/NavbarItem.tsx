import { Link } from '@remix-run/react'

export type NavbarProps = {
	active: boolean
	icon: React.ReactNode
	label: string
	to: string
}

export const NavbarItem = ({ active, icon, to, label }: NavbarProps) => (
	<li
		className={`flex items-center gap-1 justify-between ${
			active ? 'font-bold text-blue-700' : ''
		} `}
	>
		{icon}
		<Link to={to}>{label}</Link>
	</li>
)
