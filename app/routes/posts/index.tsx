import type { Post } from '@prisma/client'
import { LapTimerIcon, LetterCaseToggleIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
import Posts from '~/components/posts'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

type DataLoader = {
	posts: Awaited<Post[]>
}

export const loader: LoaderFunction = async (): Promise<DataLoader> => {
	const posts = await db.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	})
	return { posts }
}

export default function Index() {
	const { posts } = useLoaderData<DataLoader>()
	return (
		<>
			<Navbar />
			<Container>
				<Heading>All Posts</Heading>
				<div className='my-4'>
					<Link to={'/posts/new'} className='font-mono font-bold text-blue-800'>
						<span>Write a Post</span>
					</Link>
				</div>
				<div className='w-full overflow-scroll h-full scroll-smooth'>
					<Posts posts={posts} />
				</div>
			</Container>
		</>
	)
}
