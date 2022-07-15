import type { Post } from '@prisma/client'
import { DrawingPinIcon } from '@radix-ui/react-icons'
import { Link, useLocation } from '@remix-run/react'
import { formatDate, formatPastToNow } from '~/lib/formatDate'

export const PostComponent = ({ post }: { post: Post }) => {
	const { pathname } = useLocation()
	const showContent = pathname.includes(post.id)
	console.log('showContent', showContent)
	return (
		<div
			className={` rounded-md border p-2 ${
				post.pinned ? 'bg-slate-50 dark:bg-gray-900' : ''
			} `}
		>
			<h3 className='font-semibold text-lg flex items-center gap-1 mb-1'>
				{post.title}
				{post.pinned && <DrawingPinIcon width={22} height={22} />}
			</h3>
			<p
				className={`w-full min-h-8 h-auto relative ${
					showContent ? '' : 'text-ellipsis max-h-32 overflow-hidden'
				}`}
			>
				{post.content}
			</p>
			<small>
				{formatDate(post.createdAt)}({formatPastToNow(post.createdAt)})
			</small>
			<p className='text-center'>
				<Link to={`/posts/${post.id}`}>Read more</Link>
			</p>
		</div>
	)
}
