import type { Item } from '@prisma/client'
import { formatMoney } from '~/lib/formatMoney'

export const ItemDetails = (item: Item) => {
	return (
		<div className='flex gap-1 items-center'>
			<h4>
				{item.title} ({item.slug})
			</h4>
			<small>cash: {formatMoney.format(item.cash)}</small>
			<small>coast: {formatMoney.format(item.cost)}</small>
		</div>
	)
}
