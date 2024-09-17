import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/user-repository";
import { hash } from "bcrypt";


interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}
export class RegisterUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (userWithSameEmail) {
      throw new Error("Email already exists")
    }

    await this.userRepository.create({
      email,
      name,
      password_hash
    })

  }


}
