import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { formatPastToNow } from '~/lib/formatDate'

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (id: string) =>
	await db.chapter.findUnique({ where: { id } })

export const loader: LoaderFunction = async ({ params }) => {
	return json<LoaderData>(await getLoaderData(params.id as string))
}

export default function ChapterId() {
	const chapter = useLoaderData<LoaderData>()
	return (
		<div className='flex flex-col w-full h-full gap-2 px-2'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col'>
					<h1 className='font-bold font-mono text-lg'>{chapter?.title}</h1>
					<p className=' font-mono text-gray-500 text-base '>
						{chapter?.description}
					</p>
					<small className='font-mono text-gray-500 text-xm'>
						Created At:
						{formatPastToNow(new Date(chapter?.createdAt as string))} <br />
						Updated At:
						{formatPastToNow(new Date(chapter?.updatedAt as string))}
					</small>
				</div>
				<div className='flex items-center gap-2'>
					<span className='hover:text-red-700 cursor-pointer'>
						<TrashIcon width={22} height={22} />
					</span>
					<span className='hover:text-blue-700 cursor-pointer'>
						<Pencil1Icon width={22} height={22} />
					</span>
				</div>
			</div>
			<div className='border-t py-2'>
				<Outlet />
			</div>
		</div>
	)
}
