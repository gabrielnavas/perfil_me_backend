import { FindUserByEmailRepository } from './FindUserByEmailRepository'
import { HashCreater } from './HasherProtocol'
import { InsertUserRepository } from './InsertUserRepository'
import { UserModel } from './UserModel'

type UserParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

type Result = Readonly<{
  id: number
  name: string,
  email: string,
  password: string,
}>

export class CreateUserUseCase {
  constructor (
    private readonly user: UserModel,
    private readonly userRepository: FindUserByEmailRepository & InsertUserRepository,
    private readonly hashPassword: HashCreater
  ) {}

  async create (userParams: UserParams): Promise<Result> {
    const userValid = this.user.create(userParams)
    const userFound = await this.userRepository.findByEmail(userValid.email)
    if (userFound !== null) {
      throw new Error('Email exists.')
    }
    const passwordHash = await this.hashPassword.hash(userValid.password)
    const paramInsert = {
      ...userValid,
      password: passwordHash
    }
    const userCreated = await this.userRepository.insert(paramInsert)
    return userCreated
  }
}
