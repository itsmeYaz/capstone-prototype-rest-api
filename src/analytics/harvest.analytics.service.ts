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

type TotalHarvestByCrop = {
  cropPlanted: string
  municipality: string
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

//TODO: temporarily disabled
export const getTotalHarvestByCrops = async (municipality: string) => {
  // Fetch all harvests in the given municipality
  const harvests: Harvest[] = await prisma.harvest.findMany({
    where: {
      Production: {
        farmer: {
          municipality: municipality,
        },
      },
    },
    include: {
      Production: {
        include: {
          farmer: true,
        },
      },
    },
  })

  type Totals = { [crop: string]: number }
  // Group the harvests by cropPlanted and calculate the total quantity for each group
  const totalsByCrop = (harvests || []).reduce((totals: Totals, harvest) => {
    if (
      harvest &&
      harvest.Production &&
      harvest.Production.cropPlanted != null &&
      harvest.quantity != null
    ) {
      const crop = harvest.Production.cropPlanted
      if (!totals[crop]) {
        totals[crop] = 0
      }
      totals[crop] += harvest.quantity
    }
    return totals
  }, {})

  // Convert the totals to the desired output format
  const result = Object.entries(totalsByCrop).map(([cropPlanted, total]) => ({
    cropPlanted,
    municipality,
    total,
  }))

  return result
}

export const getTotalHarvestByCrop = async (
  cropPlanted: string,
  municipality: string,
  startMonth: string,
  endMonth: string,
  year: string,
) => {
  // Create date objects from the startMonth, endMonth and year parameters
  const startDate = new Date(
    Date.UTC(parseInt(year), parseInt(startMonth) - 1, 1),
  )
  const endDate = new Date(Date.UTC(parseInt(year), parseInt(endMonth), 1))

  endDate.setMonth(endDate.getMonth() + 1)
  const startYear = new Date(`${year}-01-01`)
  const endYear = new Date(`${year}-12-31`)

  // Fetch all productions with the given cropPlanted and municipality
  const productions = await prisma.production.findMany({
    where: {
      cropPlanted: cropPlanted,
      farmer: {
        municipality: municipality,
      },
    },
    select: {
      id: true,
    },
  })

  // Get the ids of the productions
  const productionIds = productions.map((production) => production.id)
  console.log('productionIds:', productionIds)

  // Define the start and end dates
  console.log('startDate:', startDate)
  console.log('endDate:', endDate)

  // Fetch all harvests related to the productions within the given date range
  // Fetch all harvests related to the productions within the given date range
  const monthlyHarvests = await prisma.harvest.findMany({
    where: {
      productionId: {
        in: productionIds,
      },
      date: {
        gte: new Date(startDate.toISOString().split('T')[0]),
        lt: new Date(endDate.toISOString().split('T')[0]),
      },
    },
  })
  console.log('monthlyHarvests:', monthlyHarvests)

  const yearlyHarvests = await prisma.harvest.findMany({
    where: {
      productionId: {
        in: productionIds,
      },
      date: {
        gte: startYear,
        lt: endYear,
      },
    },
  })

  // Calculate the total quantity of the harvests
  const monthlyTotal = monthlyHarvests.reduce(
    (sum, harvest) => sum + harvest.quantity,
    0,
  )
  const yearlyTotal = yearlyHarvests.reduce(
    (sum, harvest) => sum + harvest.quantity,
    0,
  )

  return {
    cropPlanted,
    municipality,
    monthlyTotal,
    yearlyTotal,
  }
}

export const getAllMunicipalitiesAndCrops = async () => {
  // Fetch all productions with their associated farmer's municipality
  const productions = await prisma.production.findMany({
    select: {
      cropPlanted: true,
      farmer: {
        select: {
          municipality: true,
        },
      },
    },
  })

  // Get unique cropPlanted and municipality values
  const crops = new Set(productions.map((production) => production.cropPlanted))
  const municipalities = new Set(
    productions.map((production) => production.farmer.municipality),
  )

  return {
    crops: Array.from(crops),
    municipalities: Array.from(municipalities),
  }
}
