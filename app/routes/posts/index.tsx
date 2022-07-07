import type { Post } from '@prisma/client'
import { LapTimerIcon, LetterCaseToggleIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { LinkButton } from '~/components/buttons'
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
					<LinkButton to='/posts/new'>Write New Post</LinkButton>
				</div>
				<div className='w-full overflow-scroll h-full scroll-smooth'>
					<Posts posts={posts} />
				</div>
			</Container>
		</>
	)
}
