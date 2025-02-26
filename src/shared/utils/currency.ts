// formatCurrency(10, EUR, 'de-DE')
export const formatCurrency = (value: number, currency: string, locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(Number(value / 100));
};

