import { useNavigate } from '@remix-run/react'

export default function Search() {
	const navigate = useNavigate()
	const search = (e: any) => navigate(`?q=${e.target.value}`)
	return (
		<div className='w-full px-2'>
			<input
				type={'search'}
				className='rounded-full w-full'
				onChange={search}
				placeholder='Search in title or content'
			/>
		</div>
	)
}
