import { redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request, params }) => {
	const body = await request.formData()
	const data = {
		title: body.get('title') as string,
		slug: body.get('slug') as string,
		description: body.get('description') as string,
		cash: parseInt((body.get('cash') as string) ?? ''),
		cost: parseInt((body.get('cost') as string) ?? ''),
	}
	try {
		const item = await db.item.create({ data })
		return redirect(`/items/${item.id}}`)
	} catch (error) {
		console.error(error)
		return { error }
	}
}

export default function NewPost() {
	const actions = useActionData()
	console.log(actions)
	return (
		<div className='w-full'>
			<h1 className='font-bold font-mono'> New Item </h1>
			<Form method='post' className='w-full h-full'>
				<div className='flex items-center gap-2'>
					<div className='w-full p-2'>
						<label htmlFor='name' className=' block '>
							Title
						</label>
						<input
							id='name'
							type='text'
							name='title'
							placeholder='wite post title here...'
							className='rounded-lg w-full'
							required
						/>
					</div>
					<div className='w-full p-2'>
						<label htmlFor='slug' className=' block '>
							Slug
						</label>
						<input
							id='slug'
							type='text'
							name='slug'
							placeholder='wite post title here...'
							className='rounded-lg w-fit'
							required
						/>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<div className='w-full p-2'>
						<label htmlFor='cash' className=' block '>
							Cash
						</label>
						<input
							id='cash'
							type='number'
							min={0}
							name='cash'
							placeholder='wite post title here...'
							className='rounded-lg w-fit'
							required
						/>
					</div>
					<div className='w-full p-2'>
						<label htmlFor='cost' className=' block '>
							Cost
						</label>
						<input
							id='cost'
							type='number'
							min={0}
							name='cost'
							placeholder='wite post title here...'
							className='rounded-lg w-fit'
							required
						/>
					</div>
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
