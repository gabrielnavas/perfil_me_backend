export type Response = {
  body: any
  statusCode: number
}

export type Params = {
  body?: unknown
  query?: unknown
  params?: unknown
}

export type ControllerProtocol =
  (params: Params) => Promise<Response>
