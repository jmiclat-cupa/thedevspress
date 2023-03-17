import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(RegisterValidator)
    const user = await User.create(validatedData)
    const token = await auth.login(user)
    const responseData = { ...token.toJSON(), ...user.toJSON() }
    return response.ok(responseData)
  }
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      const user = await User.findBy('email', email)
      const responseData = { ...user?.toJSON(), ...token.toJSON() }
      return response.ok(responseData)
    } catch (error) {
      return response.badRequest({ message: "We couldn't verify your credentials" })
    }
  }
}
