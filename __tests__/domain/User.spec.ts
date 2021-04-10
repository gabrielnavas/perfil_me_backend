import { IsEmailProtocol } from '../../src/domain/IsEmailProtocol'
import { UserModel } from '../../src/domain/UserModel'

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

describe('User Model', () => {
  test('should create a user validate', () => {
    const { sut } = makeSut()
    const user = sut.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(user).toEqual({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('should return an error if name is small', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'a',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(execute)
      .toThrowError(
        new Error('O nome deve ser maior que 1 caracteres.')
      )
  })

  test('should return an error if name is great', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: Array(61).fill('a').join(''),
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(execute)
      .toThrowError(new Error('O nome está muito grande.'))
  })

  test('should return an error if email is wrong', () => {
    const { sut, isEmailSpy } = makeSut()
    jest.spyOn(isEmailSpy, 'verify')
      .mockReturnValueOnce(false)
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(execute).toThrowError(new Error('O email está inválido.'))
  })

  test('should return an error if password is small', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: '123',
      passwordConfirmation: '123456'
    })
    expect(execute).toThrowError(new Error('A senha deve ser maior que 6 caracteres.'))
  })

  test('should return an error if password is great', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: Array(61).fill('a').join(''),
      passwordConfirmation: '123456'
    })
    expect(execute).toThrowError(new Error('A senha é muito grande.'))
  })

  test('should return an error if passwordConfirmation is small', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123'
    })
    expect(execute).toThrowError(new Error('A confirmação de senha deve ser maior que 6 caracteres.'))
  })

  test('should return an error if passwordConfirmation is great', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: Array(61).fill('a').join('')
    })
    expect(execute).toThrowError(new Error('A confirmação de senha está muito grande.'))
  })

  test('should return an error if password is different passwordConfirmation is great', () => {
    const { sut } = makeSut()
    const execute = () => sut.create({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: 'different_password'
    })
    expect(execute).toThrowError(new Error('A confirmação de senha está diferente da senha.'))
  })
})
