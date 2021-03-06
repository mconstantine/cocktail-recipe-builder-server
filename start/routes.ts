/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import packageJson from '../package.json'
import { cocktailUnitsRoute } from './routes/cocktailUnits'
import { ingredientUnitsRoute } from './routes/ingredientUnits'

Route.get('/', () => {
  const { name, version } = packageJson
  return { name, version }
})

Route.get('cocktails/units', cocktailUnitsRoute)
Route.get('ingredients/units', ingredientUnitsRoute)
Route.resource('techniques', 'TechniquesController').only(['index'])
Route.post('users/login', 'UsersController.login')
Route.post('users/logout', 'UsersController.logout').middleware('auth')
Route.put('users/update', 'UsersController.update').middleware('auth')

Route.resource('ingredients', 'IngredientsController')
  .apiOnly()
  .middleware({
    create: ['auth'],
    store: ['auth'],
    edit: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })

Route.resource('cocktails', 'CocktailsController')
  .apiOnly()
  .middleware({
    create: ['auth'],
    store: ['auth'],
    edit: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
