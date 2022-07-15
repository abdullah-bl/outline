import type { Item } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'
import { db } from '~/utils/db.server'

const getLoaderData = async (categoryId: string): Promise<Item[]> =>
	await db.item.findMany({ where: { categoryId } })

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

export const loader: LoaderFunction = async ({ params }) => {
	console.log(params)
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function ItemsPage() {
	const items = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	console.log(items)
	return (
		<div className='flex gap-1 items-center'>
			<h1> Items {pathname} </h1>
		</div>
	)
}
