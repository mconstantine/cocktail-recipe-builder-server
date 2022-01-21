import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import UserLoginValidator from 'App/Validators/UserLoginValidator'
import UserLogoutValidator from 'App/Validators/UserLogoutValidator'

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

  async logout({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UserLogoutValidator)

    if (data.logout_from_everywhere) {
      await Database.query()
        .from('api_tokens')
        .where('user_id', auth.user!.id)
        .delete()
    } else {
      await auth.logout()
    }

    return response.ok({ message: 'Logged out' })
  }
}
