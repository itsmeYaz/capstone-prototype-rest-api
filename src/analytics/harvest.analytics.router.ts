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
