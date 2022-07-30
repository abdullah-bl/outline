import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

const getItem = async (id: string) =>
	await db.item.findUnique({ where: { id }, include: { budgets: true } })

type LoaderData = Awaited<ReturnType<typeof getItem>>

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getItem(params.id as string))
}

export const meta = {
	title: 'Items',
	description: 'Items',
}

export default function ItemID() {
	const item = useLoaderData<LoaderData>()
	console.log(item)
	return (
		<div>
			<h1> item : {item?.title} </h1>
			<pre>{JSON.stringify(item, null, 2)}</pre>
		</div>
	)
}
