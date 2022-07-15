import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container'
import Posts from '~/components/posts'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

type DataLoader = {
	posts: Awaited<Post[]>
	count: Awaited<number>
}

export const loader: LoaderFunction = async (): Promise<DataLoader> => {
	const posts = await db.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			comments: {
				select: {
					id: true,
				},
			},
		},
	})
	const count = await db.post.count()
	return { posts, count }
}

export default function Index() {
	const { posts, count } = useLoaderData<DataLoader>()
	return (
		<Container>
			<Heading>Welcome to Outline</Heading>
			<small className='font-mono'> News & Important </small>

			<div className='flex items-baseline gap-2 flex-wrap'>
				<div className='sm:w-1/2 md:w-1/2'>
					{/* render latest posts */}
					<Heading className='font-bold text-xl font-mono border-t-2 border-gray-900'>
						Latest Posts
					</Heading>
					<div className='flex items-center gap-2 my-4'>
						<Link
							to={'/posts/new'}
							className='font-bold hover:border-black  uppercase rounded-md border py-1 px-4'
						>
							Write New Post
						</Link>
					</div>
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
				</div>
				<div className='w-1/2'>{/* render top projects... */}</div>
			</div>
		</Container>
	)
}
