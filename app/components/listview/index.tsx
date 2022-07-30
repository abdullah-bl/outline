import { Link } from '@remix-run/react'
import { Container } from '../container'
import { Heading } from '../text'

export const ListViewLayout = (
	props: React.HtmlHTMLAttributes<HTMLDivElement>
) => (
	<Container>
		{props.title && <Heading> {props.title} </Heading>}
		<div
			className='flex gap-2 flex-1 h-full w-full overflow-hidden'
			{...props}
		/>
	</Container>
)

export const ListView = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => (
	<div className='flex py-1 gap-1 flex-col w-1/5 overflow-scroll' {...props} />
)

export const ListViewItem = (
	props: React.HtmlHTMLAttributes<HTMLSpanElement>
) => (
	<span
		className=' hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-between text-ellipsis overflow-hidden whitespace-nowrap'
		{...props}
	/>
)

export const ListItemLink: React.FC<{
	to: string
	active?: boolean
}> = (props) => (
	<Link
		to={props.to}
		className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg w-full ${
			props.active ? 'bg-slate-200 dark:bg-slate-800' : ''
		}`}
	>
		{props.children}
	</Link>
)

export const ListViewDetails = (
	props: React.HtmlHTMLAttributes<HTMLDivElement>
) => <div className='w-full h-full overflow-scroll' {...props} />
