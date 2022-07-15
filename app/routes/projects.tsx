import type { Project } from '@prisma/client'
import { DimensionsIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { LinkButton } from '~/components/buttons'
import { Container } from '~/components/container'
import Projects from '~/components/projects'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

const getProjects = async (): Promise<Project[]> =>
	await db.project.findMany({
		orderBy: { createdAt: 'desc' },
	})
type LoaderData = Awaited<ReturnType<typeof getProjects>>

export const loader: LoaderFunction = async () => {
	return json<LoaderData>(await getProjects())
}

export default function Index() {
	const projects = useLoaderData<LoaderData>()
	console.log(projects)
	return (
		<Container>
			<Heading>
				<DimensionsIcon /> Projects
			</Heading>
			<small className='font-mono font-semibold'>
				All Your Project & Sorted By Date
			</small>
			<div className='flex items-center gap-2 my-4'>
				<LinkButton to='/projects/new'>Create a new project</LinkButton>
			</div>
			<hr />
			<div className='flex items-baseline gap-2'>
				<div className='w-1/5'>
					<Projects projects={projects} />
				</div>
				<div className='flex-1 w-full h-full'>
					<Outlet />
				</div>
			</div>
		</Container>
	)
}
