import { prisma } from '../utils/db.server'

export type HarvestWithProductionID = {
  id: string
  date: Date
  quantity: number
  productionId: string
}

type HarvestCreateInput = {
  date: Date
  quantity: number
  productionId: string
}

export const listOfHarvests = async (): Promise<HarvestWithProductionID[]> => {
  return prisma.harvest.findMany({
    select: {
      id: true,
      date: true,
      quantity: true,
      productionId: true,
    },
  })
}

export const getSingleHarvest = async (
  id: string,
): Promise<HarvestWithProductionID | null> => {
  return prisma.harvest.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      date: true,
      quantity: true,
      productionId: true,
    },
  })
}

export const createHarvest = async (
  harvest: HarvestCreateInput,
): Promise<HarvestWithProductionID> => {
  const { date, quantity, productionId } = harvest

  return prisma.harvest.create({
    data: {
      date,
      quantity,
      productionId,
    },
    select: {
      id: true,
      date: true,
      quantity: true,
      productionId: true,
    },
  })
}

export const updateHarvest = async (
  harvest: HarvestCreateInput,
  id: string,
): Promise<HarvestWithProductionID> => {
  const { date, quantity, productionId } = harvest

  return prisma.harvest.update({
    where: {
      id,
    },
    data: {
      date,
      quantity,
      productionId,
    },
    select: {
      id: true,
      date: true,
      quantity: true,
      productionId: true,
    },
  })
}

export const deleteHarvest = async (id: string): Promise<void> => {
  await prisma.harvest.delete({
    where: {
      id,
    },
  })
}
