import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Container } from '~/components/container'
import { db } from '~/utils/db.server'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData()
	const title = body.get('title') as string
	const content = body.get('content') as string
	const pinned = (body.get('pinned') as string) === 'on' ? true : false
	const post = await db.post.create({
		data: {
			title,
			content,
			pinned,
		},
	})

	return redirect(`/posts/${post.id}`)
}

export default function NewPost() {
	return (
		<Form method='post'>
			<div className='w-full p-2'>
				<label htmlFor='name' className=' block '>
					Title
				</label>
				<input
					id='name'
					type='text'
					name='title'
					placeholder='wite post title here...'
					className='rounded-lg w-fit'
					required
				/>
			</div>
			<div className='w-full p-2'>
				<label htmlFor='content' className=' block '>
					Content
				</label>
				<textarea
					id='content'
					name='content'
					placeholder='wite post title here...'
					className='rounded-lg w-full'
					required
				/>
			</div>
			<div className='w-full p-2 flex items-center gap-2'>
				<label htmlFor='pinned' className=' block '>
					Pinned ?
				</label>
				<input
					id='pinned'
					type={'checkbox'}
					name='pinned'
					className='rounded'
				/>
			</div>

			<button type='submit' className='border rounded-lg px-6 py-2 '>
				Submit
			</button>
		</Form>
	)
}
