export const Heading = (
	props: React.LabelHTMLAttributes<HTMLHeadingElement>
) => (
	<h1
		className='font-bold font-mono text-2xl py-2 underline underline-offset-2 flex items-center gap-2 select-none'
		{...props}
	/>
)
