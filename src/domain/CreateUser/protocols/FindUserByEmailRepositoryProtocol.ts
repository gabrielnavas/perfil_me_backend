export type UserResultFound = Readonly<{
  id: number
  name: string,
  email: string,
  password: string
}>

export interface FindUserByEmailRepositoryProtocol {
  findByEmail(email: string): Promise<UserResultFound>
}
