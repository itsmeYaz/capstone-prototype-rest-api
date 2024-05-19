import { prisma } from '../utils/db.server'

type Harvest = {
  id: string
  productionId: string
  date: Date
  quantity: number
  Production: Production
}

type Production = {
  cropPlanted: string
}

export const getYieldTrendsByCrop = async () => {
  // Fetch all harvests with their associated crop type
  const harvests: Harvest[] = await prisma.harvest.findMany({
    select: {
      id: true,
      date: true,
      quantity: true,
      productionId: true,
      Production: true, // Include Production data
    },
  })

  // Group by date and crop type and calculate total quantity
  const yieldTrends = harvests.reduce(
    (acc: { [key: string]: { [key: string]: number } }, harvest) => {
      const date = harvest.date.toISOString().split('T')[0] // Convert date to 'YYYY-MM-DD' format
      const cropType = harvest.Production.cropPlanted
      if (!acc[date]) {
        acc[date] = {}
      }
      if (!acc[date][cropType]) {
        acc[date][cropType] = 0
      }
      acc[date][cropType] += harvest.quantity
      return acc
    },
    {},
  )

  return yieldTrends
}
