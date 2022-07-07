import type { Post } from '@prisma/client'
import { DrawingPinIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

export default function Posts({ posts }: { posts: Post[] }) {
	// sort posts by date and if post pined to top
	const _posts = posts.sort((a, b) => {
		if (a.pinned && !b.pinned) return -1
		if (b.pinned && !a.pinned) return 1
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	})

	return (
		<div className='flex flex-col gap-2'>
			{_posts.map((post) => (
				<div
					key={post.id}
					className={`p-2 rounded-lg ${
						post.pinned ? ' bg-slate-50 dark:bg-slate-600 border' : ''
					} `}
				>
					<h1 className='font-bold font-mono underline flex items-center'>
						{post.title}
						{post.pinned && <DrawingPinIcon width={22} height={22} />}
					</h1>
					<small>{new Date(post.createdAt).toString()}</small>
					<p className='w-full pl-2 text-clip h-auto'>{post.content}</p>
					<p>
						<Link
							to={`/posts/${post.id}`}
							className='font-bold hover:text-blue-900'
						>
							Read more & see comments
						</Link>
					</p>
				</div>
			))}
		</div>
	)
}
