export type UserResultFound = Readonly<{
  id: string
  name: string,
  email: string,
  password: string
}>

export interface FindUserByEmail {
  findByEmail(email: string): Promise<UserResultFound>
}
