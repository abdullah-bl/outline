import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
import Posts from '~/components/posts'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

type DataLoader = {
	posts: Awaited<Post[]>
	count: Awaited<number>
}

export const loader: LoaderFunction = async (): Promise<DataLoader> => {
	const posts = await db.post.findMany({
		take: 4,
		orderBy: {
			createdAt: 'desc',
		},
	})
	const count = await db.post.count()
	return { posts, count }
}

export default function Index() {
	const { posts, count } = useLoaderData<DataLoader>()
	return (
		<>
			<Navbar />
			<Container>
				<Heading>Welcome to Outline</Heading>
				<small className='font-mono'> News & Important </small>
				<h1 className='font-bold text-3xl font-mono border-t-2 border-gray-900'>
					Latest Posts
				</h1>
				<p>
					<Link to={'/posts/new'} className='font-mono font-bold text-blue-800'>
						Write a Post
					</Link>
				</p>
				<Posts posts={posts} />
				{count > 4 && (
					<p className='font-mono'>
						<Link
							to={'/posts'}
							className='font-mono font-bold text-blue-800 dark:text-white'
						>
							See all posts
						</Link>
					</p>
				)}
			</Container>
		</>
	)
}
