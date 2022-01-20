import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class UsersController {
  show({ auth }: HttpContextContract) {
    return {
      user: auth.user || null,
    }
  }

  async login({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UserLoginValidator)
    const user = await User.findByOrFail('email', data.email)

    try {
      const token = await auth.use('api').attempt(user.email, data.password)
      return token
    } catch {
      return response.badRequest('Wrong password')
    }
  }

  async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok({ message: 'Logged out' })
  }
}
