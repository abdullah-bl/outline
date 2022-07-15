import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (id: string) =>
	await db.category.findUnique({ where: { id } })

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function ChapterId() {
	const chapter = useLoaderData<LoaderData>()
	return (
		<div className='flex flex-col w-full h-full gap-2'>
			<h1 className='font-bold font-mono'> Title: {chapter?.title} </h1>
			<p className=' font-mono text-white text-base '>
				Description: {chapter?.description}
			</p>
			<p>
				<small>{chapter?.updatedAt}</small>
			</p>
			<hr />
			<Outlet />
		</div>
	)
}
