import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { db } from '~/utils/db.server'

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData()
	const title = body.get('title') as string
	const content = body.get('content') as string
	const pinned = (body.get('pinned') as string) === 'on' ? true : false
	const published = (body.get('published') as string) === 'on' ? true : false
	const data = { title, content, pinned, published }
	try {
		const post = await db.post.create({ data })
		return redirect(`/posts/${post.id}`)
	} catch (error) {
		console.log(error)
		return redirect('/posts')
	}
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
			<div className='w-full p-2 flex'>
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
				<div className='w-full p-2 flex items-center gap-2'>
					<label htmlFor='published' className=' block '>
						Publish ?
					</label>
					<input
						id='published'
						type={'checkbox'}
						name='published'
						className='rounded'
					/>
				</div>
			</div>

			<button type='submit' className='border rounded-lg px-6 py-2 '>
				Submit
			</button>
		</Form>
	)
}
