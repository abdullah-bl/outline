import React from 'react'

export const Container = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => (
	<div className='container mx-auto h-full overflow-hidden' {...props} />
)
