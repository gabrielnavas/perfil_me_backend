import { Response } from '../protocols/Controller'

export const responseHttpOk = (body?: any): Response => ({
  body,
  statusCode: 200
})
