import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
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
					<Link to={'/posts'}> Posts / </Link>
					{post?.title}
				</p>
				<h1 className='font-bold font-mono text-2xl'>{post?.title}</h1>
				<small className='font-mono'> {post?.createdAt} </small>
				<p className='font-mono'>{post?.content}</p>
				{pathname.endsWith('/new') ? (
					<div>
						Back to{' '}
						<Link to={`/posts/${post?.id}`} className='underline'>
							{' '}
							all comments{' '}
						</Link>
					</div>
				) : (
					<Link
						to={`/posts/${post?.id}/comments/new`}
						className='font-bold font-mono hover:text-blue-700'
					>
						Write new comment
					</Link>
				)}
				<Outlet />
			</Container>
		</>
	)
}
