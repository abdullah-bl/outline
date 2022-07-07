import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (postId: string) =>
	await db.comment.findMany({
		where: { postId },
		orderBy: { createdAt: 'desc' },
	})

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function Index() {
	const comments = useLoaderData<LoaderData>()
	return (
		<div className='p-2'>
			<h1> Comments ({comments.length}) </h1>
			{comments?.map((comment) => (
				<div key={comment.id}>
					<p>{comment.content}</p>
					<p>
						<small>{comment.createdAt}</small>
					</p>
					<hr />
				</div>
			))}
		</div>
	)
}
