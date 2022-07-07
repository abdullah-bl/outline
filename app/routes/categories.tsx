import type { Category } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

const getCategories = async (): Promise<Category[]> =>
	await db.category.findMany({ include: { items: { select: { id: true } } } })

type LoaderData = Awaited<ReturnType<typeof getCategories>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getCategories())
}

export const meta = {
	title: 'Categories',
	description: 'Categories',
}

export default function CategoriesIndex() {
	const categories = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	console.log(categories)
	return (
		<>
			<Navbar />
			<Container>
				<Heading>Tech. Categories</Heading>
				<div className='flex justify-between gap-4'>
					<ul className='space-y-2 py-3 w-1/6'>
						{categories.map((category) => (
							<li
								key={category.id}
								className={`font-bold hover:text-blue-700 hover:bg-slate-200 hover:dark:bg-slate-800 rounded px-2 ${
									pathname.includes(category.id)
										? ' bg-slate-200  dark:bg-slate-800 '
										: ''
								}`}
							>
								<Link
									to={`/categories/${category.id}`}
									className='flex justify-between items-center w-full'
								>
									<span>{category.title}</span>
									<span>({category?.items?.length})</span>
								</Link>
							</li>
						))}
						<li className='font-bold hover:text-blue-700'>
							<Link to='/categories/new'> + Add new</Link>
						</li>
					</ul>
					<div className='w-full h-full'>
						<Outlet />
					</div>
				</div>
			</Container>
		</>
	)
}
