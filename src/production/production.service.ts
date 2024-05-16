import { prisma } from '../utils/db.server'
import type { Farmer } from '../farmer/farmer.service'

type ProductionWithFarmerID = {
  id: string
  datePlanted: Date
  cropPlanted: string
  areaPlanted: number
  existence: string
  dateHarvest: Date
  status: string
  farmer: Farmer
}

type ProductionCreateInput = {
  datePlanted: Date
  cropPlanted: string
  areaPlanted: number
  existence: string
  dateHarvest: Date
  status: string
  farmerId: string
}

const farmerSelectedAttribute = {
  id: true,
  createdAt: true,
  firstname: true,
  middlename: true,
  lastname: true,
  birthdate: true,
  gender: true,
  municipality: true,
  baranggay: true,
  sitio: true,
  phoneNumber: true,
}

export const listOfProduction = async (): Promise<ProductionWithFarmerID[]> => {
  return prisma.production.findMany({
    select: {
      id: true,
      datePlanted: true,
      cropPlanted: true,
      areaPlanted: true,
      existence: true,
      dateHarvest: true,
      status: true,
      farmer: {
        select: farmerSelectedAttribute,
      },
    },
  })
}

export const getSingleProduction = async (
  id: string,
): Promise<ProductionWithFarmerID | null> => {
  return prisma.production.findUnique({
    where: {
      id,
    },
    include: {
      farmer: true,
      harvests: true,
    },
  })
}

export const createProduction = async (
  production: ProductionCreateInput,
): Promise<ProductionWithFarmerID> => {
  const {
    datePlanted,
    cropPlanted,
    areaPlanted,
    existence,
    dateHarvest,
    status,
    farmerId,
  } = production
  return prisma.production.create({
    data: {
      datePlanted,
      cropPlanted,
      areaPlanted,
      existence,
      dateHarvest,
      status,
      farmerId,
    },
    select: {
      id: true,
      datePlanted: true,
      cropPlanted: true,
      areaPlanted: true,
      existence: true,
      dateHarvest: true,
      status: true,
      farmer: {
        select: farmerSelectedAttribute,
      },
    },
  })
}

export const updateProduction = async (
  production: ProductionCreateInput,
  id: string,
): Promise<ProductionWithFarmerID> => {
  const {
    datePlanted,
    cropPlanted,
    areaPlanted,
    existence,
    dateHarvest,
    status,
    farmerId,
  } = production
  return prisma.production.update({
    where: {
      id,
    },
    data: {
      datePlanted,
      cropPlanted,
      areaPlanted,
      existence,
      dateHarvest,
      status,
      farmerId,
    },
    select: {
      id: true,
      datePlanted: true,
      cropPlanted: true,
      areaPlanted: true,
      existence: true,
      dateHarvest: true,
      status: true,
      farmer: {
        select: farmerSelectedAttribute,
      },
    },
  })
}

export const deleteProduction = async (id: string): Promise<void> => {
  await prisma.production.delete({
    where: {
      id,
    },
  })
}
