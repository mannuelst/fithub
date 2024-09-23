import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";


//sut: system under test (pattern for testing)

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase



describe("Check-in Use Case", () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to make check-in", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-test-01",
      userId: "user_test"
    })

    expect(checkIn.gym_id).toEqual("gym-test-01")
  })


  it("should not be able to make check-in twice in the same day", async () => {

    vi.setSystemTime(new Date(2021, 4, 15, 4, 12, 32)) // garantia de data


    await sut.execute({
      gymId: "gym-test-2",
      userId: "user_test"
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-test-2",
        userId: "user_test"
      })
    ).rejects.toBeInstanceOf(Error)
  })
})

