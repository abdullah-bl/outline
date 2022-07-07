import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { db } from '~/utils/db.server'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request, params }) => {
	const categoryId = params.id as string
	const body = await request.formData()
	const title = body.get('title') as string
	const _number = body.get('number') as string
	const description = body.get('description') as string
	const budget = parseInt((body.get('budget') as string) ?? '')
	const cash = parseInt((body.get('cash') as string) ?? '')
	const cost = parseInt((body.get('cost') as string) ?? '')
	const item = await db.item.create({
		data: {
			title,
			description,
			categoryId: `${categoryId as string}`,
			number: _number,
			budget: budget ?? 0,
			cash: cash ?? 0,
			cost: cost ?? 0,
		},
	})
	return redirect(`/categories/${params.id}/items/${item.id}}`)
}

export default function NewPost() {
	return (
		<div className='w-full'>
			<h1 className='font-bold font-mono'> New Item </h1>
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
				<div className='w-full p-2'>
					<label htmlFor='number' className=' block '>
						Number
					</label>
					<input
						id='number'
						type='text'
						name='number'
						placeholder='wite post title here...'
						className='rounded-lg w-fit'
						required
					/>
				</div>
				<div className='w-full p-2'>
					<label htmlFor='budget' className=' block '>
						Budget
					</label>
					<input
						id='budget'
						type='number'
						min={0}
						name='budget'
						placeholder='wite post title here...'
						className='rounded-lg w-fit'
						required
					/>
				</div>
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

				<button type='submit' className='border rounded-lg px-6 py-2 '>
					Submit
				</button>
			</Form>
		</div>
	)
}
