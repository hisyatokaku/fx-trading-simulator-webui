export const SUPPORTED_CURRENCIES = [
  'JPY',
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'NZD',
  'CAD',
  'CHF',
  'TRY',
  'ZAR',
  'MXN',
  'NOK',
  'SEK',
  'HKD',
] as const;

export const calculateJPYEquivalent = (
  balances: Record<string, number>,
  rates: Record<string, number>,
) => Object.entries(balances).reduce((total, [currency, amount]) => {
  if (currency === 'JPY') {
    return total + amount;
  }

  const rate = rates[`${currency}/JPY`];
  return rate === undefined ? total : total + amount * rate;
}, 0);

export const formatCurrency = (amount: number, currency: string) => (
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(amount)
);
