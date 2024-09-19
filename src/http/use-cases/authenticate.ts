import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseResponse {
  user: User
}


interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}


export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }
    return { user }
  }

}