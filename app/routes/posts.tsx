import { Post } from '@prisma/client'
import { PlusIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listview'
import { PostsList } from '~/components/posts'
import { db } from '~/utils/db.server'

const getPosts = async (): Promise<Post[]> => await db.post.findMany({})

type LoaderData = Awaited<ReturnType<typeof getPosts>>

export const loader: LoaderFunction = async () =>
	json<LoaderData>(await getPosts())

export default function PostsPage() {
	const posts = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	return (
		<ListViewLayout title='Posts'>
			<ListView className='flex py-1 gap-1 flex-col w-1/4 overflow-scroll'>
				<ListItemLink to='./new' active={pathname === '/settings'}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						New
						<PlusIcon />
					</ListViewItem>
				</ListItemLink>
				<PostsList posts={posts as unknown as Post[]} />
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
