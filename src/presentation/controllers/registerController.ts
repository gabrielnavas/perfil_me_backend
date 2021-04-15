import { responseHttpOk } from '../helpers/http'
import {
  ControllerProtocol,
  Response
} from '../protocols/Controller'

type Params = {
  body: {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  }
}

const registerController: ControllerProtocol = async (params: Params):Promise<Response> => {
  return responseHttpOk()
}

export { registerController }
