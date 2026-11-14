export const formatPrice = (amount: number, currency = 'PLN') =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(amount)
