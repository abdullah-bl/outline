import type { Project } from '@prisma/client'
import { Link, useLocation } from '@remix-run/react'
import { format } from 'date-fns'

export default function Projects({ projects }: { projects: Project[] }) {
	const render_data = (date: Date) => format(new Date(date), 'MMM dd, yyyy')
	const { pathname } = useLocation()
	console.log(projects)
	return (
		<ul className='my-4'>
			{projects.map((project) => (
				<li
					key={project.id}
					className={` p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800
					${
						pathname.includes(project.id)
							? ' bg-slate-200 dark:bg-slate-800 p-2 '
							: ''
					} `}
				>
					<Link to={`/projects/${project.id}`}>
						<h3 className='font-bold font-mono text-lg'>{project?.name}</h3>
						<p className='flex flex-col'>
							<small> {render_data(project.createdAt)}</small>
						</p>
					</Link>
				</li>
			))}
		</ul>
	)
}
