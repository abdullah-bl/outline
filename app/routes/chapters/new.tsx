import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
// import { Year } from '@prisma/client'

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData()
	const data = {
		title: body.get('title') as string,
		description: body.get('description') as string,
		yearId: body.get('year') as string,
	}
	try {
		const category = await db.chapter.create({ data })
		return redirect(`/chapters/${category.id}`)
	} catch (error) {
		console.error(error)
		return json({ error: error }, 400)
	}
}

const getYears = async () => await db.year.findMany({})

type LoaderData = Awaited<ReturnType<typeof getYears>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getYears())
}

export default function NewPost() {
	const years = useLoaderData<LoaderData>()
	return (
		<Form method='post' className='flex-1 p-0'>
			<div className='w-full px-2'>
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
				<label htmlFor='year' className=' block '>
					Select Year
				</label>
				<select
					id='year'
					name='year'
					placeholder='wite post title here...'
					className='rounded-lg w-fit dark:text-white dark:bg-slate-700 '
					required
				>
					{years.map((year) => (
						<option value={year.id} key={year.id}>
							{year.value}
						</option>
					))}
				</select>
			</div>
			<div className='w-full p-2'>
				<label htmlFor='description' className=' block '>
					Description (optional)
				</label>
				<textarea
					id='description'
					name='description'
					placeholder='wite post title here...'
					className='rounded-lg w-full'
				/>
			</div>

			<button type='submit' className='border rounded-lg px-6 py-2 '>
				Submit
			</button>
		</Form>
	)
}
