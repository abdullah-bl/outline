import { Link } from '@remix-run/react'

export const LinkButton = (props: {
	to: string
	children: React.ReactNode
}) => (
	<Link
		to={props.to}
		className='font-bold hover:border-black  uppercase rounded-md border py-1 px-4'
	>
		{props.children}
	</Link>
)
