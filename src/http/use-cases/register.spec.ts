import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { compare } from "bcrypt"

import { beforeEach, describe, expect, it } from "vitest"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { RegisterUseCase } from "./register"

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase
describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it("should be  user be able to register", async () => {

    const { user } = await sut.execute({
      name: "John Doe",
      email: "jd@email.com",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
  })


  it("should hash user password upon registration", async () => {

    const { user } = await sut.execute({
      name: "John Doe",
      email: "jd@email.com",
      password: "123456",
    })

    const isPassHashed = await compare("123456", user.password_hash)
    expect(isPassHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const email = "twicejd@email.com"
    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    })


    await expect(async () =>

      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})
