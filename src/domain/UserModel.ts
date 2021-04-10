import { IsEmailProtocol } from './IsEmailProtocol'

export type UserParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export type UserValid = Readonly<Omit<UserParams, 'passwordConfirmation'>>

export interface CreateUserValidProtocol {
  create(user: UserParams): UserValid
}

export class UserModel implements CreateUserValidProtocol {
  constructor (
    private readonly isEmail: IsEmailProtocol
  ) { }

  create = (params: UserParams): UserValid => {
    if (params.name.length <= 1) {
      throw new Error('O nome deve ser maior que 1 caracteres.')
    }
    if (params.name.length >= 61) {
      throw new Error('O nome está muito grande.')
    }
    if (!this.isEmail.verify(params.email)) {
      throw new Error('O email está inválido.')
    }
    if (params.password.length < 6) {
      throw new Error('A senha deve ser maior que 6 caracteres.')
    }
    if (params.password.length > 60) {
      throw new Error('A senha é muito grande.')
    }
    if (params.passwordConfirmation.length < 6) {
      throw new Error('A confirmação de senha deve ser maior que 6 caracteres.')
    }
    if (params.passwordConfirmation.length > 60) {
      throw new Error('A confirmação de senha está muito grande.')
    }
    if (params.password !== params.passwordConfirmation) {
      throw new Error('A confirmação de senha está diferente da senha.')
    }
    const { passwordConfirmation, ...userLessPasswordConfirmation } = params
    return userLessPasswordConfirmation
  }
}
