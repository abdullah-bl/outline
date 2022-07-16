import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { db } from '~/utils/db.server'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request, params }) => {
	const body = await request.formData()
	const content = body.get('content') as string
	await db.comment.create({ data: { content, postId: params.id as string } })
	return redirect(`/posts/${params.id}/comments`)
}

export const loader: LoaderFunction = async ({ params }) => {
	const post = await db.post.findUnique({ where: { id: params.id } })
	if (!post) {
		return redirect('/')
	}
	return { post }
}

export default function NewComment() {
	return (
		<Form method='post' className='flex-1 h-full p-2 mb-3'>
			<div className='w-full p-2'>
				<label htmlFor='content' className=' block '>
					Content
				</label>
				<textarea
					autoCapitalize='true'
					autoComplete='true'
					autoCorrect='true'
					autoFocus
					id='content'
					name='content'
					placeholder='wite comment here...'
					className='rounded-lg w-full'
					required
				/>
			</div>
			<button type='submit' className='border rounded-lg px-6 py-2 '>
				Submit
			</button>
		</Form>
	)
}
