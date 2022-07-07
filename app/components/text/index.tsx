export const Heading = (
	props: React.LabelHTMLAttributes<HTMLHeadingElement>
) => (
	<h2
		className='font-bold font-mono text-2xl my-2 underline flex items-center gap-2 select-none'
		{...props}
	/>
)
