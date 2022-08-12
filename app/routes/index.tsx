import type { Post, Task } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container'
import Summary from '~/components/home/summary';
import Posts from '~/components/posts'
import { Heading } from '~/components/text'
import { db } from '~/utils/db.server'

const getSummary = async (): Promise<{ posts: Post[], tasks: Task[] }> => { 
		return {
			posts: await db.post.findMany({
				where: { published: true },
				orderBy: {
					createdAt: 'desc',
				},
			}), 
			tasks: await db.task.findMany({
				where: { public: true },
				orderBy: {
					createdAt: 'desc',
				},
			})
		}
	}

type LoaderData = Awaited<ReturnType<typeof getSummary>>

export const loader: LoaderFunction = async () => json<LoaderData>(await getSummary())


export default function Index() {
	const { posts, tasks } = useLoaderData<LoaderData>()
	console.log(posts, tasks)
	return (
		<Container>
			<Heading>Welcome to Outline</Heading>
			<Summary posts={posts} tasks={tasks} />

			<small className='font-mono'> News & Important </small>

			<div className='flex items-baseline gap-2 flex-wrap h-full overflow-scroll'>
				<div className='sm:w-1/2 md:w-1/2'>
					{/* render latest posts */}
					<Heading className='font-bold text-xl font-mono border-t-2 border-gray-900'>
						Latest Posts
					</Heading>
					<div className='flex items-center gap-2 my-4'>
						<Link
							to={'/posts/new'}
							className='font-bold hover:border-black  uppercase rounded-md border py-1 px-4'
						>
							Write New Post
						</Link>
					</div>
					<Posts posts={posts} />
				</div>
				<div className='w-1/2'>{/* render top projects... */}</div>
			</div>
		</Container>
	)
}
