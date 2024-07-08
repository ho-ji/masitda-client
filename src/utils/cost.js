export const calculateSaleCost = (cost, rate) => {
  return Math.ceil((cost * (100 - rate)) / 1000) * 10
}

export const formatCostWithComma = (cost) => {
  return cost?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export const formatSaleCost = (cost, rate, count = 1) => {
  if (!rate) return formatCostWithComma(cost)
  const saleCost = calculateSaleCost(cost, rate) * count
  return formatCostWithComma(saleCost)
}

export const formatTotalCost = (cost, count = 1) => {
  const totalCost = calculateSaleCost(cost, 0) * count
  return formatCostWithComma(totalCost)
}
