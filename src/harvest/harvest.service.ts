import { prisma } from '../utils/db.server'

type HarvestWithProductionID = {
  id: string
  date: Date
}
