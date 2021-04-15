import { Router } from 'express'
import { expressRouteAdapter } from '../../presentation/adapters/expressRouteAdapter'
import { registerController } from '../../presentation/controllers/registerController'

const userRoutes = (route: Router) => {
  route.post('/user', expressRouteAdapter(registerController))
}

export default userRoutes
