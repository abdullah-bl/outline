import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Container } from '~/components/container'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

const getChapters = async (): Promise<[]> => []

type LoaderData = Awaited<ReturnType<typeof getChapters>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getChapters())
}

export const meta = {
	title: 'Categories',
	description: 'Categories',
}

export default function ChapterIndex() {
	const chapters = useLoaderData<LoaderData>()
	const { pathname } = useLocation()
	console.log(chapters)
	return (
		<Container>
			<Heading>Tech. Chapters</Heading>
			<div className='flex justify-between gap-4'>
				<ul className='space-y-2 py-3 w-1/6'>
					{/* {chapters.map((chapter) => (
							<li
								key={chapter.id}
								className={`font-bold hover:text-blue-700 hover:bg-slate-200 hover:dark:bg-slate-800 rounded px-2 ${
									pathname.includes(chapter.id)
										? ' bg-slate-200  dark:bg-slate-800 '
										: ''
								}`}
							>
								<Link
									to={`/categories/${chapter.id}`}
									className='flex justify-between items-center w-full'
								>
									<span>{chapter.title}</span>
									<span>({chapter?.items?.length})</span>
								</Link>
							</li>
						))} */}
					<li className='font-bold hover:text-blue-700'>
						<Link to='/chapters/new'> + Add new</Link>
					</li>
				</ul>
				<div className='w-full h-full'>
					<Outlet />
				</div>
			</div>
		</Container>
	)
}
