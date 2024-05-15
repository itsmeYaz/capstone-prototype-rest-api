import { prisma } from '../utils/db.server'
import type { Farmer } from '../farmer/farmer.service'

type GeographicalWithFarmer = {
  id: string
  farmLocation: string
  farmArea: number
  farmCategory: string
  farmer: Farmer
}

type GeographicalCreateInput = {
  farmLocation: string
  farmArea: number
  farmCategory: string
  farmerId: string
}

export const listGeographical = async (): Promise<GeographicalWithFarmer[]> => {
  return prisma.geographical.findMany({
    select: {
      id: true,
      farmLocation: true,
      farmArea: true,
      farmCategory: true,
      farmer: {
        select: {
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
        },
      },
    },
  })
}

export const getGeographical = async (
  id: string,
): Promise<GeographicalWithFarmer | null> => {
  return prisma.geographical.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      farmLocation: true,
      farmArea: true,
      farmCategory: true,
      farmer: {
        select: {
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
        },
      },
    },
  })
}

export const createGeographical = async (
  geographical: GeographicalCreateInput,
): Promise<GeographicalWithFarmer> => {
  const { farmLocation, farmArea, farmCategory, farmerId } = geographical

  return prisma.geographical.create({
    data: {
      farmLocation,
      farmArea,
      farmCategory,
      farmerId,
    },
    select: {
      id: true,
      farmLocation: true,
      farmArea: true,
      farmCategory: true,
      farmer: {
        select: {
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
        },
      },
    },
  })
}

export const updateGeographical = async (
  geographical: GeographicalCreateInput,
  id: string,
): Promise<GeographicalWithFarmer> => {
  const { farmLocation, farmArea, farmCategory, farmerId } = geographical
  return prisma.geographical.update({
    where: {
      id,
    },
    data: {
      farmLocation,
      farmArea,
      farmCategory,
      farmerId,
    },
    select: {
      id: true,
      farmLocation: true,
      farmArea: true,
      farmCategory: true,
      farmer: {
        select: {
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
        },
      },
    },
  })
}

export const deleteGeographical = async (id: string): Promise<void> => {
  await prisma.geographical.delete({
    where: {
      id,
    },
  })
}
