import type { Post } from '@prisma/client'
import { PlusIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Form,
	Outlet,
	useLoaderData,
	useLocation,
	useNavigate,
} from '@remix-run/react'
import { useState } from 'react'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listView'
import { PostsList } from '~/components/posts'
import Search from '~/components/search'
import { db } from '~/utils/db.server'

const getPosts = async (q?: string): Promise<Post[]> =>
	await db.post.findMany({
		orderBy: { createdAt: 'desc' },
		where: {
			published: true,
			OR: [
				{
					title: {
						contains: q,
					},
				},
				{
					content: {
						contains: q,
					},
				},
			],
		},
	})

type LoaderData = Awaited<ReturnType<typeof getPosts>>

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const q = (url.searchParams.get('q') as string) || ''
	return json<LoaderData>(await getPosts(q))
}

export default function PostsPage() {
	const posts = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	return (
		<ListViewLayout title='Posts'>
			<ListView className='flex py-1 gap-1 flex-col w-1/4 overflow-scroll'>
				<Search />
				<ListItemLink to='./new' active={pathname === '/settings'}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						New
						<PlusIcon />
					</ListViewItem>
				</ListItemLink>
				<PostsList posts={posts} />
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
