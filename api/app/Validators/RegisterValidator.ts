import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator' //Import Rules
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'first_name.required': 'This is required',
    'last_name.required': 'This is required',
    'password.minLength': 'Password must have minimum of {{ options.minLength }} characters',
    'email.unique': 'Email already signed in.',
  }
}
