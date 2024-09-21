import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {

  public items: User[] = []
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: "user-1654656-5454",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }
    this.items.push(user)
    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)
    if (!user) {
      return null
    }
    return user

  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find(item => item.id === userId)
    if (!user) {
      return null
    }
    return user
  }


}