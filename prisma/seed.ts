import { prisma } from '../src/utils/db.server'

type Farmer = {
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
  farmLocation: string
  farmArea: number
  farmCategory: string
}

type Production = {
  datePlanted: Date
  cropPlanted: string
  areaPlanted: number
  existence: string
  dateHarvest: Date
  status: string
}

type Harvest = {
  date: Date
  quantity: number
}

async function seed() {
  await Promise.all(
    getFarmers().map((farmer) => {
      return prisma.farmer.create({
        data: {
          firstname: farmer.firstname,
          middlename: farmer.middlename,
          lastname: farmer.lastname,
          birthdate: farmer.birthdate,
          gender: farmer.gender,
          municipality: farmer.municipality,
          baranggay: farmer.baranggay,
          sitio: farmer.sitio,
          phoneNumber: farmer.phoneNumber,
        },
      })
    }),
  )

  const farmer = await prisma.farmer.findFirst({
    where: {
      firstname: 'Maricel',
    },
  })

  await Promise.all(
    getGeographical().map((geographical) => {
      const { farmLocation, farmArea, farmCategory } = geographical
      return prisma.geographical.create({
        data: {
          farmLocation,
          farmArea,
          farmCategory,
          farmerId: farmer.id,
        },
      })
    }),
  )
}

seed()

//return fake data
function getFarmers(): Array<Farmer> {
  return [
    {
      firstname: 'YanpingCho',
      middlename: 'S',
      lastname: 'SunitaMendez',
      birthdate: new Date('2003-04-04'),
      gender: 'Male',
      municipality: 'Gasan',
      baranggay: 'Cabugao',
      sitio: 'Kabog',
      phoneNumber: '123456789010',
    },
    {
      firstname: 'AnilKumar',
      middlename: 'J',
      lastname: 'DeviFernandez',
      birthdate: new Date('2001-09-15'),
      gender: 'Female',
      municipality: 'Boac',
      baranggay: 'Isok',
      sitio: 'Mabunga',
      phoneNumber: '098765432109',
    },
    {
      firstname: 'Maricel',
      middlename: 'L',
      lastname: 'DomingoGarcia',
      birthdate: new Date('1998-11-22'),
      gender: 'Female',
      municipality: 'Buenavista',
      baranggay: 'Sihi',
      sitio: 'Tagpo',
      phoneNumber: '112233445566',
    },
  ]
}

function getGeographical(): Array<Geographical> {
  return [
    {
      farmLocation: 'Libtangin',
      farmArea: 2000,
      farmCategory: 'Vegetable Farm',
    },
    {
      farmLocation: 'Bayanan',
      farmArea: 1500,
      farmCategory: 'Fruit Farm',
    },
    {
      farmLocation: 'Bangbangalon',
      farmArea: 3000,
      farmCategory: 'Dairy Farm',
    },
  ]
}

function getProduction(): Array<Production> {
  return [
    {
      datePlanted: new Date('2024-02-15'),
      cropPlanted: 'Tomatoes',
      areaPlanted: 500,
      existence: 'Abundant',
      dateHarvest: new Date('2024-06-15'),
      status: 'Harvested',
    },
    {
      datePlanted: new Date('2023-08-01'),
      cropPlanted: 'Corn',
      areaPlanted: 1200,
      existence: 'Moderate',
      dateHarvest: new Date('2024-01-15'),
      status: 'Ready for Harvest',
    },
    {
      datePlanted: new Date('2024-03-20'),
      cropPlanted: 'Lettuce',
      areaPlanted: 300,
      existence: 'Scarce',
      dateHarvest: new Date('2024-05-25'),
      status: 'Growing',
    },
  ]
}

function getHarvest(): Array<Harvest> {
  return [
    {
      date: new Date('2024-04-10'),
      quantity: 1200,
    },
    {
      date: new Date('2024-05-15'),
      quantity: 1500,
    },
    {
      date: new Date('2024-06-20'),
      quantity: 900,
    },
  ]
}
