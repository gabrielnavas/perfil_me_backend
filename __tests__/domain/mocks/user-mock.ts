import { IsEmailProtocol } from '../../../src/domain/CreateUser/protocols/IsEmailProtocol'
import { UserModel } from '../../../src/domain/CreateUser/models/UserModel'

type MakeSutResult = {
  sut: UserModel
  isEmailSpy: IsEmailProtocol
}
const makeSut = (): MakeSutResult => {
  class IsEmailSpy implements IsEmailProtocol {
    verify = jest.fn(() => true)
  }
  const isEmailSpy = new IsEmailSpy()
  const sut = new UserModel(isEmailSpy)
  return {
    sut,
    isEmailSpy
  }
}
export { makeSut }
