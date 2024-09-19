import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

//sut: system under test (pattern for testing)
describe("Authenticate Use Case", () => {

  it("should be  user be able to authenticate", async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: "User_Test",
      email: "user@test.com",
      password_hash: await hash("123456", 6)
    })


    const { user } = await sut.execute({
      email: "user@test.com",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
  })


  it("should not be able to authenticate with wrong email", async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)



    expect(() => sut.execute({
      email: "wrong@test.com",
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it("should not  be to authenticate with wrong password", async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: "User_Test",
      email: "user@test.com",
      password_hash: await hash("123456", 6)
    })
    expect(() => sut.execute({
      email: "wrong@test.com",
      password: "12345600000",
    })).rejects.toBeInstanceOf(InvalidCredentialError)

    // const { user } = await sut.execute({
    //   email: "user@test.com",
    //   password: "123450000",
    // })

    // expect(user).toHaveProperty("id")
  })


})

