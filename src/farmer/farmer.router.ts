import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as FarmerService from './farmer.service'

export const farmerRouter = express.Router()

//Get list of farmers
farmerRouter.get('/', async (request: Request, response: Response) => {
  try {
    const farmers = await FarmerService.listFarmers()
    return response.status(200).json(farmers)
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//Get single farmer by ID
farmerRouter.get('/:id', async (request: Request, response: Response) => {
  const id = request.params.id
  try {
    const farmer = await FarmerService.getFarmer(id)
    if (farmer) {
      return response.status(200).json(farmer)
    }
    return response.status(404).json('farmer not found')
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//POST: create farmer
//Params:
farmerRouter.post(
  '/',
  body('firstname').isString(),
  body('middlename').isString(),
  body('lastname').isString(),
  body('birthdate').isDate(),
  body('gender').isString(),
  body('municipality').isString(),
  body('baranggay').isString(),
  body('sitio').isString(),
  body('phoneNumber').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    try {
      const farmer = request.body
      const newFarmer = await FarmerService.createFarmer(farmer)
      return response.status(201).json(newFarmer)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//UPDATE farmer
farmerRouter.put(
  '/:id',
  body('firstname').isString(),
  body('middlename').isString(),
  body('lastname').isString(),
  body('birthdate').isDate(),
  body('gender').isString(),
  body('municipality').isString(),
  body('baranggay').isString(),
  body('sitio').isString(),
  body('phoneNumber').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const id: string = request.params.id
    try {
      const farmer = request.body
      const updateFarmer = await FarmerService.updateFarmer(farmer, id)
      return response.status(200).json(updateFarmer)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

//DELETE farmer based on id
farmerRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id

  try {
    await FarmerService.deleteFarmer(id)
    return response.status(204).json('Farmer successfully deleted.')
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})
