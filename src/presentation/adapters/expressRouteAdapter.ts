import { Request, Response } from 'express'
import { ControllerProtocol } from '../protocols/Controller'

const expressRouteAdapter = (controller: ControllerProtocol) => {
  return async (req: Request, res: Response) => {
    const params = {
      body: { ...req.body } || {},
      query: { ...req.query } || {},
      params: { ...req.params } || {}
    }
    const response = await controller(params)
    res.status(response.statusCode).json(response.body)
  }
}

export { expressRouteAdapter }
