import { formatDistanceToNow, formatDistance, format } from "date-fns";


import ar from "date-fns/locale/ar"

export const formatPastToNow = (date: Date | string) => formatDistanceToNow(new Date(date), { addSuffix: true, locale: ar })
export const formatFutureToNow = (date: Date | string) => formatDistance(new Date(), new Date(date), { addSuffix: true, locale: ar })
export const formatDate = (date: Date | string) => format(new Date(date), "dd/MM/yyyy", { locale: ar })