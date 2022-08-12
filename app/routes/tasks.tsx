import type { Task } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import { Heading } from "~/components/text";
import { db } from "~/utils/db.server"


const getTasks = async (q?: string): Promise<Task[]> =>
await db.task.findMany({
	where: { public: true },
	orderBy: {
		createdAt: 'desc',
	},
})
type LoaderData = Awaited<ReturnType<typeof getTasks>>

export const loader: LoaderFunction = async ({ request }) => {
const url = new URL(request.url)
const q = (url.searchParams.get('q') as string) || ''
return json<LoaderData>(await getTasks(q))
}


export default function TasksPage() {
	const tasks = useLoaderData<LoaderData>()
	console.log(tasks)
	return (
		<Container>
			<Heading>Tasks</Heading>
		</Container>
	)
}
