import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  // findByEmail(email: string): Promise<User | null>
  // findById(userId: string): Promise<User | null>
}