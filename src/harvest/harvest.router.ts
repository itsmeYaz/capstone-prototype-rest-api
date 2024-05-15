import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as HarvestService from './harvest.service'
import * as ProductionService from '../production/production.service'
import { productionRouter } from '../production/production.router'
export const harvestRouter = express.Router()

//GET list of harvest
harvestRouter.get('/', async (request: Request, response: Response) => {
  try {
    const harvests = await HarvestService.listOfHarvests()
    return response.status(200).json(harvests)
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//GET single harvest
harvestRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id

  try {
    const harvest = await HarvestService.getSingleHarvest(id)
    if (harvest) {
      return response.status(200).json(harvest)
    }
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//Create harvest
harvestRouter.post(
  '/',
  body('date').isDate().toDate(),
  body('quantity').isInt(),
  body('productionId').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    try {
      const harvest = request.body
      const newHarvest = await HarvestService.createHarvest(harvest)
      return response.status(201).json(newHarvest)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//Update Harvest
harvestRouter.put(
  '/:id',
  body('date').isDate().toDate(),
  body('quantity').isInt(),
  body('productionId').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const id: string = request.params.id

    try {
      const harvest = request.body
      const updatedHarvest = await HarvestService.updateHarvest(harvest, id)
      return response.status(201).json(updatedHarvest)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//DELETE existing harvest
harvestRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id
  try {
    await HarvestService.deleteHarvest(id)
    return response.status(204).json('Harvest successfully deleted.')
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})
