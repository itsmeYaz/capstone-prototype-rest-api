import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as GeographicalService from './geographical.service'
export const geographicalRouter = express.Router()

//GET list of geographical
geographicalRouter.get('/', async (request: Request, response: Response) => {
  try {
    const geographical = await GeographicalService.listGeographical()
    return response.status(200).json(geographical)
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//GET geographical base on id
geographicalRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id

  try {
    const geographical = await GeographicalService.getGeographical(id)
    if (geographical) {
      return response.status(200).json(geographical)
    }
  } catch (err: any) {
    return response.status(500).json(err.message)
  }
})

//create geographical
geographicalRouter.post(
  '/',
  body('farmLocation').isString(),
  body('farmArea').isInt(),
  body('farmCategory').isString(),
  body('farmerId').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    try {
      const geographical = request.body
      const newGeographical =
        await GeographicalService.createGeographical(geographical)
      return response.status(201).json(newGeographical)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

geographicalRouter.put(
  '/:id',
  body('farmLocation').isString(),
  body('farmArea').isInt(),
  body('farmCategory').isString(),
  body('farmerId').isString(),

  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const id: string = request.params.id

    try {
      const geographical = request.body
      const updatedGeographical = await GeographicalService.updateGeographical(
        geographical,
        id,
      )
      return response.status(201).json(updatedGeographical)
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)

geographicalRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const id: string = request.params.id
    try {
      await GeographicalService.deleteGeographical(id)
      return response.status(204).json('Geographical successfully deleted.')
    } catch (err: any) {
      return response.status(500).json(err.message)
    }
  },
)
