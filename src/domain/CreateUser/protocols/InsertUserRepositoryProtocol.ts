export type Params = {
  name: string,
  email: string,
  password: string
}

export type Result = Params & {
  id: number
}

export interface InsertUserRepositoryProtocol {
  insert(params: Params): Promise<Result>
}
