import { CreateUserUseCase } from '../../src/domain/CreateUser/usecase/CreateUserUseCase'
import {
  FindUserByEmailRepositoryProtocol,
  UserResultFound
} from '../../src/domain/CreateUser/protocols/FindUserByEmailRepositoryProtocol'
import { HashCreater } from '../../src/domain/CreateUser/protocols/HasherProtocol'
import {
  InsertUserRepositoryProtocol,
  Params,
  Result
} from '../../src/domain/CreateUser/protocols/InsertUserRepositoryProtocol'

import { makeSut as userMock } from './mocks/user-mock'

const makeSut = () => {
  const hashedPassword = 'hashed_password'
  const userCreated = {
    id: 1,
    name: 'any_name',
    email: 'any_email',
    password: hashedPassword
  }
  class UserRepository
  implements FindUserByEmailRepositoryProtocol, InsertUserRepositoryProtocol {
    async insert (params: Params): Promise<Result> {
      return userCreated
    }

    async findByEmail (email: string): Promise<UserResultFound> {
      return null
    }
  }
  class HashCreaterSpy implements HashCreater {
    hash (plainText: string): string {
      return hashedPassword
    }
  }
  const { sut: userModelSpy } = userMock()
  const userRepositorySpy = new UserRepository()
  const hashSpy = new HashCreaterSpy()
  const sut = new CreateUserUseCase(
    userModelSpy,
    userRepositorySpy,
    hashSpy
  )
  return {
    sut,
    userModelSpy,
    userRepositorySpy,
    hashSpy,
    hashedPassword,
    userCreated
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
    const { sut, userRepositorySpy } = makeSut()
    const findByEmailSpy = jest.spyOn(userRepositorySpy, 'findByEmail')
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
    const { sut, userRepositorySpy } = makeSut()
    const userFound = {
      id: 1,
      name: 'any_name',
      email: 'any_email',
      password: '123456'
    }
    jest.spyOn(userRepositorySpy, 'findByEmail')
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

  test('should call hash with plain password', async () => {
    const { sut, hashSpy: hash } = makeSut()
    const hashSpy = jest.spyOn(hash, 'hash')
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    await sut.create(user)
    expect(hashSpy).toHaveBeenCalledWith(user.password)
  })

  test('should throw if hash password throws', async () => {
    const { sut, hashSpy } = makeSut()
    jest.spyOn(hashSpy, 'hash').mockImplementationOnce(() => {
      throw new Error('any_error')
    })
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const promise = sut.create(user)
    expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  test('should call InsertUsertRepository with correct params', async () => {
    const { sut, userRepositorySpy, hashedPassword } = makeSut()
    const insertSpy = jest.spyOn(userRepositorySpy, 'insert')
    const userParams = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const paramInsert = {
      name: 'any_name',
      email: 'any_email',
      password: hashedPassword
    }
    await sut.create(userParams)
    expect(insertSpy).toHaveBeenCalledWith(paramInsert)
  })

  test('should throw if InsertUsertRepository throws', () => {
    const { sut, userRepositorySpy } = makeSut()
    jest.spyOn(userRepositorySpy, 'insert').mockImplementationOnce(() => {
      throw new Error('any_error')
    })
    const userParams = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const promise = sut.create(userParams)
    expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  test('should return an user if InsertUsertRepository ok', async () => {
    const { sut, userCreated } = makeSut()
    const userParams = {
      name: 'any_name',
      email: 'any_email',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const user = await sut.create(userParams)
    expect(user).toEqual(userCreated)
  })
})
