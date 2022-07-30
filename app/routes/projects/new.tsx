import {
	json,
	redirect,
	unstable_composeUploadHandlers,
	unstable_createFileUploadHandler,
	unstable_createMemoryUploadHandler,
	unstable_parseMultipartFormData,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { Item } from '@prisma/client'
import { useState } from 'react'
import { formatMoney } from '~/lib/formatMoney'
import { ItemDetails } from '~/components/item/new/details'

export const action: ActionFunction = async ({ request }) => {
	const uploadHandler = unstable_composeUploadHandlers(
		unstable_createFileUploadHandler({
			maxPartSize: 10_000_000,
			file: ({ filename }) => filename,
		}),
		// parse everything else into memory
		unstable_createMemoryUploadHandler()
	)
	const formData = await unstable_parseMultipartFormData(request, uploadHandler)
	// const body = await request.formData()
	let errors = {}
	const data = {
		name: formData.get('name') as string,
		description: formData.get('description') as string,
		reference: formData.get('reference') as string,
		slug: (formData.get('slug') as string) || '',
		itemId: formData.get('itemId') as string,
		estimated: Number(formData.get('estimated')) as number,
	}
	try {
		const project = await db.project.create({ data })
		return redirect(`/projects/${project.id}`)
	} catch (error) {
		console.error(error)
		return {
			status: 400,
			error,
			...errors,
		}
	}
}

const getData = async () => await db.item.findMany()

type LoaderData = Awaited<ReturnType<typeof getData>>

export const loader: LoaderFunction = async ({ request }) => {
	return json<LoaderData>(await getData())
}

export default function NewProject() {
	const items = useLoaderData()
	const action = useActionData()
	const years = ['2020', '2021', '2022', '2023']
	const [range, setRange] = useState(12)
	const [selectedItem, setSelectedItem] = useState<Item | null>(null)
	console.log(action)
	const onSelectItemChange = (e: any) => {
		const item = items.find((i: Item) => i.id === e.target.value)
		return setSelectedItem(item)
	}
	return (
		<Form
			method='post'
			className='flex items-center flex-col w-full h-full overflow-scroll'
			encType='multipart/form-data'
		>
			<div className='flex w-full'>
				<div className='w-full p-2'>
					<label htmlFor='itemId' className=' block '>
						On Which Item ?
					</label>
					<select name='itemId' title='Items' onChange={onSelectItemChange}>
						<option value=''>Select Item</option>
						{items.map((item: Item) => (
							<option key={item.id} value={item.id}>
								{item.title}
							</option>
						))}
					</select>
				</div>
				{selectedItem ? <ItemDetails {...selectedItem} /> : <div />}
			</div>
			<div className='w-full p-2'>
				<label htmlFor='year' className=' block '>
					Which Year ?
				</label>
				<select name='year' title='Years'>
					<option value=''>Select Year</option>
					{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
			<div className='flex w-full'>
				<div className='w-full p-2 '>
					<label htmlFor='name' className=' block'>
						Name
					</label>
					<input
						id='name'
						type='text'
						name='name'
						placeholder='wite post title here...'
						className='rounded-lg w-full'
						required
					/>
				</div>
				<div className='w-full p-2 '>
					<label htmlFor='slug' className=' block'>
						Slug (optional)
					</label>
					<input
						id='slug'
						type='text'
						name='reference_number'
						placeholder='ex: 22/32'
						className='rounded-lg'
					/>
				</div>
			</div>
			<div className='flex w-full'>
				<div className='w-full p-2 '>
					<label htmlFor='reference' className=' block'>
						Reference Number (optional)
					</label>
					<input
						id='reference'
						type='number'
						minLength={10}
						name='reference_number'
						placeholder='wite project reference number here...'
						className='rounded-lg w-1/3'
					/>
				</div>
				<div className='w-full p-2 '>
					<label htmlFor='estimated' className=' block'>
						Estimated Cost Number
					</label>
					<input
						id='estimated'
						type='number'
						minLength={10}
						name='estimated'
						placeholder='wite project estimated coast.'
						className='rounded-lg w-1/2'
						required
					/>
				</div>
			</div>
			<div className='w-full p-2 '>
				<label htmlFor='duration' className=' block'>
					Duration (optional) = ({range} months = {range * 30} days)
				</label>
				<input
					id='duration'
					type='range'
					step={1}
					min={0}
					defaultValue={range}
					max={100}
					name='duration'
					className='rounded-lg w-full'
					onChange={(e) => setRange(Number(e.target.value))}
					required
				/>
			</div>
			<div className='w-full p-2 '>
				<label htmlFor='files' className=' block'>
					Documents (optional)
				</label>
				<input
					id='files'
					type='file'
					name='files'
					className='rounded-lg w-full'
				/>
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
