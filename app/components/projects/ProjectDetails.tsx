import type { Project } from '@prisma/client'

export default function ProjectDetails({ project }: { project: Project }) {
	return (
		<div>
			<h1 className='font-bold font-mono text-lg'>{project.title}</h1>
			<p> Budget: {project.cost}</p>
			<p className='flex flex-col'>
				{/* <small> Started At: {render_data(project.)}</small> */}
				<small> Created At: {project.createdAt}</small>
			</p>
		</div>
	)
}
