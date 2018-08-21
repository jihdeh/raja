export const formatPrice = (price) => {

  if (price >= 1000000) return 'Rp ' + (price / 1000000).toFixed(1) + 'JT'
  else if (price >= 10000) return 'Rp ' + (price / 1000) + 'K'
  else return 'Rp ' + price
}

export const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    else if (num >= 10000) return (num / 1000).toFixed(1) + 'K'
    else return num;
}