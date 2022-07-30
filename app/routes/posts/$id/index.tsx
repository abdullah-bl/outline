import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { formatDate, formatPastToNow } from '~/lib/formatDate'
import { db } from '~/utils/db.server'

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (postId: string) =>
	await db.comment.findMany({ where: { postId } })

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function Index() {
	const comments = useLoaderData<LoaderData>()
	console.log(comments)
	return (
		<div className='p-2'>
			<h1 className='font-mono font-semibold'>Comments ({comments.length})</h1>
			{comments?.map((comment) => (
				<div key={comment.id} className='p-2 border-t my-2'>
					<p className=' text-base '>{comment.content}</p>
					<small>
						Created At : {formatDate(comment?.createdAt)} (
						{formatPastToNow(comment?.createdAt)})
					</small>
				</div>
			))}
		</div>
	)
}
