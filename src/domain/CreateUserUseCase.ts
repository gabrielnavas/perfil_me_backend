import { FindUserByEmail } from './FindUserByEmailRepository'
import { UserModel, UserParams } from './UserModel'

// export type UserCreated = UserValid & {id: string}

export class CreateUserUseCase {
  constructor (
    private readonly user: UserModel,
    private readonly findUserByEmail: FindUserByEmail
  ) {}

  async create (userParams: UserParams): Promise<void> {
    const userValid = this.user.create(userParams)
    const userFound = await this.findUserByEmail.findByEmail(userValid.email)
    if (userFound !== null) {
      throw new Error('Email exists.')
    }
  }
}
