import { CreateUserUseCase } from '../../src/domain/CreateUserUseCase'
import { FindUserByEmail, UserResultFound } from '../../src/domain/FindUserByEmailRepository'

import { makeSut as userMock } from './mocks/user-mock'

const makeSut = () => {
  class UserRepository implements FindUserByEmail {
    async findByEmail (email: string): Promise<UserResultFound> {
      return null
    }
  }
  const { sut: userModelSpy } = userMock()
  const findUserByEmailSpy = new UserRepository()
  const sut = new CreateUserUseCase(
    userModelSpy,
    findUserByEmailSpy
  )
  return {
    sut,
    userModelSpy,
    findUserByEmailSpy
  }
}

describe('CreateUserUseCase', () => {
  test('should call user create to valid user params', async () => {
    const { sut, userModelSpy } = makeSut()
    const createSpy = jest.spyOn(userModelSpy, 'create')
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    await sut.create(user)
    expect(createSpy).toHaveBeenCalledWith(user)
  })

  test('should throw if user models throw on create', async () => {
    const { sut, userModelSpy } = makeSut()
    jest.spyOn(userModelSpy, 'create')
      .mockImplementationOnce(() => {
        throw new Error('any_error _in_name')
      })
    const user = {
      name: 'a',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const promise = sut.create(user)
    expect(promise).rejects
      .toThrow(new Error('any_error _in_name'))
  })

  test('should call FindUserByEmailRepository', async () => {
    const { sut, findUserByEmailSpy } = makeSut()
    const findByEmailSpy = jest.spyOn(findUserByEmailSpy, 'findByEmail')
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    await sut.create(user)
    expect(findByEmailSpy).toHaveBeenCalledWith(user.email)
  })

  test('should throw if email exists ', () => {
    const { sut, findUserByEmailSpy } = makeSut()
    const userFound = {
      id: '!@#$1234',
      name: 'any_name',
      email: 'any_email',
      password: '123456'
    }
    jest.spyOn(findUserByEmailSpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(userFound))
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const promise = sut.create(user)
    expect(promise).rejects
      .toThrow(new Error('Email exists.'))
  })

  // test.skip('should return a user created', async () => {
  //   const { sut } = makeSut()
  //   const user = {
  //     name: 'any_name',
  //     email: 'any_email',
  //     password: '123456',
  //     passwordConfirmation: '123456'
  //   }
  //   const userCreated = await sut.create(user)
  //   const { id, ...restUser } = userCreated
  //   expect(typeof id).toEqual('string')
  //   expect(id.length).toBeGreaterThan(0)
  //   expect(restUser).toEqual({
  //     name: 'any_name',
  //     email: 'any_email',
  //     password: Array(61).fill('a').join(''),
  //     passwordConfirmation: '123456'
  //   })
  // })
})
