import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}


interface CheckInUseCaseRequest {
  userId: string,
  gymId: string
}


export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) { }
  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId
    })


    return { checkIn }
  }

}