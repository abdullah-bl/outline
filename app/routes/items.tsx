import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listView'
import { db } from '~/utils/db.server'

const getItems = async () =>
	await db.item.findMany({
		orderBy: { slug: 'asc' },
	})

type LoaderData = Awaited<ReturnType<typeof getItems>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getItems())
}

export const meta = {
	title: 'Items',
	description: 'Items',
}

export default function ChapterIndex() {
	const items = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	console.log(items)
	return (
		<ListViewLayout title='Tech. Chapters'>
			<ListView className='flex py-1 gap-1 flex-col w-1/4 overflow-scroll'>
				<ListItemLink to={`/items/new`} active={pathname === '/items/new'}>
					<ListViewItem>
						New
						<PlusIcon />
					</ListViewItem>
				</ListItemLink>
				<ListItemLink to={`/items`} active={pathname === '/items'}>
					<ListViewItem>
						Overview
						<InfoCircledIcon />
					</ListViewItem>
				</ListItemLink>
				{items.map((item) => (
					<ListItemLink
						key={item.id}
						to={`/items/${item.id}`}
						active={pathname.includes(item.id)}
					>
						{item.title}
					</ListItemLink>
				))}
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
