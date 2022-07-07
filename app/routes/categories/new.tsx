import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
import { db } from '~/utils/db.server'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData()
	const title = body.get('title') as string
	const description = body.get('description') as string
	const category = await db.category.create({
		data: {
			title,
			description,
		},
	})
	return redirect(`/categories/${category.id}`)
}

export default function NewPost() {
	return (
		<div className='w-full'>
			<h1 className='font-bold font-mono'> New Category </h1>
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
					<label htmlFor='description' className=' block '>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						placeholder='wite post title here...'
						className='rounded-lg w-full'
						required
					/>
				</div>

				<button type='submit' className='border rounded-lg px-6 py-2 '>
					Submit
				</button>
			</Form>
		</div>
	)
}
