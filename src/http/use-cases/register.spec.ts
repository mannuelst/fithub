import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { compare } from "bcrypt"
import { describe, expect, it } from "vitest"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { RegisterUseCase } from "./register"

// test("it works", () => {
//   expect(1 + 2).toBe(3)
// })
describe("Register Use Case", () => {

  it("should be  user be able to register", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "jd@email.com",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
  })


  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "jd@email.com",
      password: "123456",
    })


    const isPassHashed = await compare("123456", user.password_hash)

    expect(isPassHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const email = "twicejd@email.com"
    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    })


    expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})
