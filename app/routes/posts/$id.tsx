import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { LinkButton } from '~/components/buttons'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
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
		<>
			<Navbar />
			<Container>
				<p className='font-bold font-mono underline'>
					<Link to={'/posts'}> Posts / </Link> {post?.title}
				</p>
				<div className='m-2 border-b '>
					<h1 className='font-bold font-mono text-2xl text-center'>
						{post?.title}
					</h1>
					<p className='font-mono text-base p-4'>{post?.content}</p>
					<div>
						<small className='font-mono'>
							Created At : {post && formatDate(post?.createdAt)}(
							{post && formatPastToNow(post?.createdAt)})
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
				<Outlet />
			</Container>
		</>
	)
}
