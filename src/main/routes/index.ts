import { Express, Router } from 'express'
import userRoutes from './userRoutes'

const configRoute = (app: Express) => {
  const router = Router()
  userRoutes(router)
}

export default configRoute
