import type { Post } from '@prisma/client'
import { DrawingPinFilledIcon, PinTopIcon } from '@radix-ui/react-icons'
import { useLocation } from '@remix-run/react'
import { ListItemLink, ListViewItem } from '../listview'
import { PostComponent } from './post'

export const PostsList = ({ posts }: { posts: Post[] }) => {
	const sorted_posts = posts.sort((a, b) => {
		if (a.pinned && !b.pinned) return -1
		if (b.pinned && !a.pinned) return 1
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	})
	const { pathname } = useLocation()
	return (
		<>
			{sorted_posts.map((post) => (
				<ListItemLink
					key={post.id}
					to={`/posts/${post.id}`}
					active={pathname.includes(post.id)}
				>
					<ListViewItem>
						<span className='text-ellipsis overflow-hidden whitespace-nowrap'>
							{post.title}
						</span>
						<span>{post.pinned && <DrawingPinFilledIcon />}</span>
					</ListViewItem>
				</ListItemLink>
			))}
		</>
	)
}

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
				<PostComponent post={post} key={post.id} />
			))}
		</div>
	)
}
