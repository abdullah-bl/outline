import { PlusIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Container } from '~/components/container'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listview'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

const getChapters = async () =>
	await db.chapter.findMany({
		include: {
			items: true,
		},
	})

type LoaderData = Awaited<ReturnType<typeof getChapters>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getChapters())
}

export const meta = {
	title: 'Categories',
	description: 'Categories',
}

export default function ChapterIndex() {
	const chapters = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	console.log(chapters)
	return (
		<ListViewLayout title='Tech. Chapters'>
			<ListView>
				<ListItemLink
					to={`/chapters/new`}
					active={pathname === '/chapters/new'}
				>
					<ListViewItem>
						New
						<PlusIcon />
					</ListViewItem>
				</ListItemLink>
				{chapters.map((chapter) => (
					<ListItemLink
						key={chapter.id}
						to={`/chapters/${chapter.id}`}
						active={pathname.includes(chapter.id)}
					>
						{chapter.title}
					</ListItemLink>
				))}
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
