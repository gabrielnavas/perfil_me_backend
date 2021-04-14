import { UserParams, UserValid } from './UserModel'

export interface CreateUserValidProtocol {
  create(user: UserParams): UserValid
}
