import type { Project } from '@prisma/client'
import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
	ListItemLink,
	ListView,
	ListViewDetails,
	ListViewItem,
	ListViewLayout,
} from '~/components/listView'
import Search from '~/components/search'
import { db } from '~/utils/db.server'

const getProjects = async (q?: string): Promise<Project[]> =>
	await db.project.findMany({
		where: { active: true },
		orderBy: {
			createdAt: 'desc',
		},
	})
type LoaderData = Awaited<ReturnType<typeof getProjects>>

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const q = (url.searchParams.get('q') as string) || ''
	return json<LoaderData>(await getProjects(q))
}

export default function Index() {
	const projects = useLoaderData<LoaderData>()
	const [filtered, setFiltered] = useState<Project[]>(projects)
	const { pathname } = useLocation()
	const search = (e: any) => {
		const s = e.target.value.toLocaleLowerCase().trim()
		s
			? setFiltered(
					projects.filter(
						(project: Project) =>
							project.name.toLocaleLowerCase().includes(s) ||
							project.description?.includes(s) ||
							project.slug?.includes(s)
					) as any
			  )
			: setFiltered(projects as any)
	}
	return (
		<ListViewLayout title={` Projects (${projects.length}) `}>
			<ListView className='flex py-1 gap-1 flex-col w-1/3 overflow-scroll'>
				<div className='w-full px-2'>
					<input
						type={'search'}
						className='rounded-full w-full'
						onChange={search}
						placeholder='Search in title, slug, Description'
					/>
				</div>
				<ListItemLink to='./new' active={pathname === '/projects/new'}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						New Project
						<PlusIcon />
					</ListViewItem>
				</ListItemLink>
				<ListItemLink to='.' active={pathname.endsWith('/projects')}>
					<ListViewItem className='flex items-center gap-2 justify-between'>
						Overview
						<InfoCircledIcon />
					</ListViewItem>
				</ListItemLink>
				{filtered.length > 0 ? (
					filtered.map((project) => (
						<ListItemLink
							key={project.id}
							to={`/projects/${project.id}`}
							active={pathname.endsWith(project.id)}
						>
							<ListViewItem className='flex items-center gap-2 justify-between'>
								<span className='w-full overflow-hidden truncate'>
									{project.name}
								</span>
								<span>({project.slug})</span>
							</ListViewItem>
						</ListItemLink>
					))
				) : (
					<ListViewItem className='text-center'>No Data found</ListViewItem>
				)}
			</ListView>
			<ListViewDetails>
				<Outlet />
			</ListViewDetails>
		</ListViewLayout>
	)
}
