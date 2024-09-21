import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseResponse {
  user: User
}


interface GetUserProfileUseCaseRequest {
  userId: string,

}


export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }
    // const doesPasswordMatches = await compare(password, user.password_hash)
    // if (!doesPasswordMatches) {
    //   throw new InvalidCredentialError()
    // }
    return { user }
  }

}