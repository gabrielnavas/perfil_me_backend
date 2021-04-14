export type Params = {
  name: string,
  email: string,
  password: string
}

export type Result = Params & {
  id: number
}

export interface InsertUserRepository {
  insert(params: Params): Promise<Result>
}
