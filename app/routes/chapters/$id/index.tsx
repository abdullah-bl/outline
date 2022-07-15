import type { Item } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
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
	return (
		<div className='flex flex-col gap-1'>
			<h1> Items - {pathname}</h1>
			<Link to={'items/new'}>Add New Item</Link>
			<RenderItems items={items} />
			<Outlet />
		</div>
	)
}

const RenderItems = ({ items }: { items: Item[] }) => {
	return (
		<div className='w-full overflow-scroll'>
			<h1 className='font-bold'> Items ({items.length}) </h1>
			<div className='flex flex-col gap-2'>
				{items.length > 0 &&
					items.map((item) => (
						<div key={item.id} className='border rounded-lg p-2'>
							<h2 className='font-bold'>
								title : {item.title} ({item.number})
							</h2>
							<h2>budget: {item.budget}</h2>
							<h2>cash: {item.cash}</h2>
							<h2>cost: {item.cost}</h2>
							<p>description: {item.description}</p>
							<p>updatedAt: {item.updatedAt}</p>
						</div>
					))}
			</div>
		</div>
	)
}
