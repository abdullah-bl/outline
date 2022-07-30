

// check if window is defined
const lang = typeof window === 'undefined' ? 'en-US' : window.navigator.language;


export const formatMoney = new Intl.NumberFormat(lang, {
  style: 'currency',
  currency: 'SAR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
