import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { LinkButton } from '~/components/buttons'
import { formatDate, formatPastToNow } from '~/lib/formatDate'
import { db } from '~/utils/db.server'

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (id: string) =>
	await db.post.findUnique({ where: { id } })

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function PostId() {
	const post = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	return (
		<div className='flex-1'>
			<div className='m-2 border-b '>
				<h1 className='font-bold font-mono text-2xl text-center'>
					{post?.title}
				</h1>
				<p className='font-mono text-base p-4'>{post?.content}</p>
				<div>
					<small className='font-mono'>
						Created At : {post && formatDate(post?.createdAt)}(
						{post && formatPastToNow(post?.updatedAt)})
					</small>
				</div>
			</div>
			<div className='flex justify-center'>
				{pathname.endsWith('/new') ? (
					<LinkButton to={`/posts/${post?.id}`}>
						Back to all comments
					</LinkButton>
				) : (
					<LinkButton to={`/posts/${post?.id}/comments/new`}>
						Write new comment
					</LinkButton>
				)}
			</div>
			<div className='flex-1 h-full py-2 min-h-[300px] mb-3'>
				<Outlet />
			</div>
		</div>
	)
}
