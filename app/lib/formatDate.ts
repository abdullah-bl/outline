import { formatDistanceToNow, formatDistance } from "date-fns";


import ar from "date-fns/locale/ar"

export const formatPastToNow = (date: Date) => formatDistanceToNow(new Date(date), { addSuffix: true, locale: ar })
export const formatFutureToNow = (date: Date) => formatDistance(new Date(), new Date(date), { addSuffix: true, locale: ar })