import type { Post } from '@prisma/client'
import { PostComponent } from './post'

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
