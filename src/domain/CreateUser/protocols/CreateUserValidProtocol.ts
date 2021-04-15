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
