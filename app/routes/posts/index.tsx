import type { Post } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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
	const posts = await db.post.findMany({})
	return { posts }
}

export default function Index() {
	return (
		<div className='my-4'>
			<h1> Details </h1>
		</div>
	)
}
