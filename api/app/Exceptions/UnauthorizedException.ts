import { Exception } from '@adonisjs/core/build/standalone'

export default class UnauthorizedException extends Exception {
  constructor(message: string) {
    super(message, 403)
  }

  public async handle(error: this, {}) {
    return error.message
  }
}
