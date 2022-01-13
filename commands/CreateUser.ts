import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:user'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Creates a new User'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')
    const name = await this.prompt.ask('User full name')
    const email = await this.prompt.ask('User e-mail address')
    const password = await this.prompt.secure('User password')

    await User.create({ name, email, password })
  }
}
