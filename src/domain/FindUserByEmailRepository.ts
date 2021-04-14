export type UserResultFound = Readonly<{
  id: number
  name: string,
  email: string,
  password: string
}>

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserResultFound>
}
