import { prisma } from '../utils/db.server'

export type Farmer = {
  createdAt: Date
  firstname: string
  middlename: string
  lastname: string
  birthdate: Date
  gender: string
  municipality: string
  baranggay: string
  sitio: string
  phoneNumber: string
}

type Geographical = {
  id: string
  farmLocation: string
  farmArea: number
  farmCategory: string
}

type Production = {
  id: string
  datePlanted: Date
  cropPlanted: string
  areaPlanted: number
  existence: string
  dateHarvest: Date
  status: string
}

type FarmerWithGeographicalAndProduction = {
  geographical: Geographical
  production: Production
}

export const listFarmers = async (): Promise<Farmer[]> => {
  return prisma.farmer.findMany({
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
  })
}

export const getFarmer = async (id: string): Promise<Farmer | null> => {
  return prisma.farmer.findUnique({
    where: {
      id: id,
    },
    include: {
      geographical: true, // Include Geographical data
      production: true, // Include Production data
    },
  })
}

export const createFarmer = async (
  farmer: Omit<Farmer, 'id'>,
): Promise<Farmer> => {
  const {
    firstname,
    middlename,
    lastname,
    birthdate,
    gender,
    municipality,
    baranggay,
    sitio,
    phoneNumber,
  } = farmer

  // const birthdateISO = new Date(birthdate).toISOString()

  return prisma.farmer.create({
    data: {
      firstname,
      middlename,
      lastname,
      birthdate,
      gender,
      municipality,
      baranggay,
      sitio,
      phoneNumber,
    },
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
  })
}

export const updateFarmer = async (
  farmer: Omit<Farmer, 'id'>,
  id: string,
): Promise<Farmer> => {
  const {
    firstname,
    middlename,
    lastname,
    birthdate,
    gender,
    municipality,
    baranggay,
    sitio,
    phoneNumber,
  } = farmer

  // const birthdateISO = new Date(birthdate).toISOString()

  return prisma.farmer.update({
    where: {
      id,
    },
    data: {
      firstname,
      middlename,
      lastname,
      birthdate,
      gender,
      municipality,
      baranggay,
      sitio,
      phoneNumber,
    },
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
  })
}

export const deleteFarmer = async (id: string): Promise<void> => {
  await prisma.farmer.delete({
    where: {
      id,
    },
  })
}
