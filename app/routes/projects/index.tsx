import type { Project } from '@prisma/client'
import { DimensionsIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container'
import Navbar from '~/components/navbar'
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
		<>
			<h1> Details </h1>
		</>
	)
}
