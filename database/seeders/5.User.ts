import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'mauro.constantinescu@gmail.com',
      password: 'T3mp0r@ryP@ssw0rd',
      name: 'Mauro Constantinescu',
    })
  }
}
