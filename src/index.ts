import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { farmerRouter } from './farmer/farmer.router'
import { geographicalRouter } from './geographical/geographical.router'
import { productionRouter } from './production/production.router'
import { harvestRouter } from './harvest/harvest.router'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/farmers', farmerRouter)
app.use('/api/geographical', geographicalRouter)
app.use('/api/production', productionRouter)
app.use('/api/harvest', harvestRouter)

app.listen(PORT, () => {
  console.log(`listening on PORT: http://localhost:${PORT}`)
})
