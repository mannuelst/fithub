import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in";


//sut: system under test (pattern for testing)

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase



describe("Check-in Use Case", () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)

  })


  it("should be able to make check-in", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-test-01",
      userId: "user_test"
    })


    expect(checkIn.gym_id).toEqual("gym-test-01")
  })
})

