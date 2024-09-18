export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exits with this email!")
  }
}