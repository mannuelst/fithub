import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInRepository implements CheckInsRepository {

  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validation_at: data?.validation_at ? new Date(data?.validation_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,

    }
    this.items.push(checkIn)
    return checkIn
  }

}