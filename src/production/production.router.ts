import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as ProductionService from './production.service'
import * as GeographicalService from '../geographical/geographical.service'
export const productionRouter = express.Router()

//GET list of productions
productionRouter.get('/', async (request: Request, response: Response) => {
  try {
    const production = await ProductionService.listOfProduction()
    return response.status(200).json(production)
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//GET single production
productionRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id

  try {
    const production = await ProductionService.getSingleProduction(id)
    if (production) {
      return response.status(200).json(production)
    }
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//POST create production
productionRouter.post(
  '/',
  body('datePlanted').isDate().toDate(),
  body('cropPlanted').isString(),
  body('areaPlanted').isInt(),
  body('existence').isString(),
  body('dateHarvest').isDate().toDate(),
  body('status').isString(),
  body('farmerId').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    try {
      const production = request.body
      const newProduction = await ProductionService.createProduction(production)
      return response.status(201).json(newProduction)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//Update existing production
productionRouter.put(
  '/:id',
  body('datePlanted').isDate().toDate(),
  body('cropPlanted').isString(),
  body('areaPlanted').isInt(),
  body('existence').isString(),
  body('dateHarvest').isDate().toDate(),
  body('status').isString(),
  body('farmerId').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const id: string = request.params.id

    try {
      const production = request.body
      const updatedProduction = await ProductionService.updateProduction(
        production,
        id,
      )
      return response.status(201).json(updatedProduction)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//DELETE existing production
productionRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const id: string = request.params.id
    try {
      await ProductionService.deleteProduction(id)
      return response.status(204).json('Production successfully deleted.')
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)
