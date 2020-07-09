export const addThousandSeparator = (value: string | number) => {
  if (!value) return null
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatCurrency = (value: string) => {
  value.toString()
  if (!value) value = '0'
  const prefix = 'R$'
  let cents = value.split('.')[1] ? value.split('.')[1] : '00'
  let number = addThousandSeparator(value.split('.')[0]) + ',' + cents
  return prefix + number
}