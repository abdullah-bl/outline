import type { Project } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = Awaited<ReturnType<typeof getProject>>

const getProject = async (id: string): Promise<Project | null> =>
	await db.project.findUnique({ where: { id } })

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getProject(params.productId as string))
}

export default function ProjectDetails() {
	const project = useLoaderData<LoaderData>()
	console.log(project)
	return (
		<>
			<h1> Details for {project?.name} </h1>

			<hr />
			<h2> history </h2>
		</>
	)
}
