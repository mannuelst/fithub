import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";


//sut: system under test (pattern for testing)

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase



describe("Get User Profile Use Case", () => {

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)

  })


  it("should be able to get user profile", async () => {

    const userCreated = await userRepository.create({
      name: "User_Test",
      email: "user@test.com",
      password_hash: await hash("123456", 6)
    })


    const { user } = await sut.execute({

      userId: userCreated.id,
    })

    expect(user.name).toEqual("User_Test")
  })


  it("should not be able to get user profile with wrong id", async () => {

    expect(() => sut.execute({
      userId: "WrongID"

    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})

