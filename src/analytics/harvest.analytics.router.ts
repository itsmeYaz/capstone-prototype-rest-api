import express from 'express'
import type { Request, Response } from 'express'

import * as HarvestAnalytics from '../analytics/harvest.analytics.service'

export const harvestAnalyticsRouter = express.Router()

harvestAnalyticsRouter.get(
  '/yield-trends-by-crop',
  async (request: Request, response: Response) => {
    try {
      const yieldTrends = await HarvestAnalytics.getYieldTrendsByCrop()
      return response.status(200).json(yieldTrends)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

harvestAnalyticsRouter.get('/total-harvest/:municipality', async (req, res) => {
  try {
    const municipality = req.params.municipality
    const result = await HarvestAnalytics.getTotalHarvestByCrops(municipality)
    res.json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

harvestAnalyticsRouter.get('/total-harvest', async (req, res) => {
  const cropPlanted = req.query.cropPlanted as string
  const municipality = req.query.municipality as string
  const startMonth = req.query.startMonth as string
  const endMonth = (req.query.endMonth as string) || startMonth
  const year = req.query.year as string

  if (!cropPlanted || !municipality || !startMonth || !year) {
    return res
      .status(400)
      .send(
        'Missing required query parameters: cropPlanted, municipality, startMonth, or year',
      )
  }

  try {
    const data = await HarvestAnalytics.getTotalHarvestByCrop(
      cropPlanted,
      municipality,
      startMonth,
      endMonth,
      year,
    )
    res.json(data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

harvestAnalyticsRouter.get('/municipalities-and-crops', async (req, res) => {
  try {
    const data = await HarvestAnalytics.getAllMunicipalitiesAndCrops()
    res.json(data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
