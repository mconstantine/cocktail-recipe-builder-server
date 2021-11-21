import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Ingredient from 'App/Models/Ingredient'
import Unit from 'App/Models/Unit'

export default class IngredientSeeder extends BaseSeeder {
  public async run() {
    const abvs = [
      16.5, 16, 17.5, 16, 17.5, 16.5, 17, 16, 30, 15, 11, 40, 24, 55, 40, 40,
      24, 20, 40, 39, 32, 44.7, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14.5, 0, 0, 0, 31, 40, 40, 40, 34, 32.5, 44,
      35, 34, 41.2, 16, 16, 16.5, 19.5, 19.5, 18.5, 18.75, 18.5, 18.75, 18.5,
      18.5, 18.5, 41.3, 40, 42, 42.5, 40, 40, 40, 40, 40, 40, 40, 40, 40, 45,
    ]

    const sugars = [
      16, 13, 3, 13, 3, 16, 9.5, 16, 16, 20, 24, 24.5, 24, 25, 31.2, 25, 39.5,
      37.5, 30, 8, 35, 4.2, 5, 14.7, 18, 13.3, 13, 10.4, 13.8, 12.4, 8, 14.7, 0,
      1.6, 0, 1.6, 12.4, 61.5, 42.1, 61.5, 61.5, 61.5, 61.5, 87.5, 61.5, 85.5,
      61.5, 61.5, 0.2, 6, 0, 12.3, 0, 0, 0, 0, 0, 16.5, 18.5, 18.5, 0, 0, 2.5,
      2.5, 2.5, 2.5, 2.5, 25, 80, 60, 127.5, 160, 160, 212, 3, 0, 0, 0, 0, 0,
      20, 20, 20, 0, 0, 0, 0, 0,
    ]

    const acids = [
      0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1.25, 0.5, 3.6, 0.93, 2.4, 0.66, 0.8, 1.5, 1.25, 6, 6, 6, 6,
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.55, 0, 1.5, 4.5, 0.75, 0, 0, 0, 0,
      0.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]

    const ingredients = await Ingredient.createMany([
      { name: 'Carpano Antica Formula' },
      { name: 'Dolin Blanc' },
      { name: 'Dolin Dry' },
      { name: 'Dolin Rouge' },
      { name: 'Generic dry vermouth' },
      { name: 'Generic sweet vermouth' },
      { name: 'Lillet Blanc' },
      { name: 'Martinelli' },
      { name: 'Amaro Ciociaro' },
      { name: 'Amer Picon' },
      { name: 'Aperol' },
      { name: 'Benedictine' },
      { name: 'Campari' },
      { name: 'Green Chartreuse' },
      { name: 'Yellow Chartreuse' },
      { name: 'Cointreau' },
      { name: 'White crème de cacao' },
      { name: 'Crème de violette' },
      { name: 'Drambuie' },
      { name: 'Fernet Branca' },
      { name: 'Luxardo Maraschino' },
      { name: 'Angostura' },
      { name: 'Peychauds' },
      { name: "Ashmead's Kernel apple juice" },
      { name: 'Concord grape juice' },
      { name: 'Cranberry juice' },
      { name: 'Granny Smith apple juice' },
      { name: 'Grapefruit juice' },
      { name: 'Honeycrisp apple juice' },
      { name: 'Orange juice' },
      { name: 'Strawberry juice' },
      { name: 'Wickson apple juice' },
      { name: 'Champagne acid' },
      { name: 'Lemon jiuce' },
      { name: 'Lime acid orange' },
      { name: 'Lime juice' },
      { name: 'Orange juice, lime strength' },
      { name: 'Caramel syrup (77 Brix)' },
      { name: 'Butter syrup' },
      { name: 'Coriander syrup' },
      { name: 'Demerara syrup' },
      { name: 'Djer syrup' },
      { name: 'Honey syrup' },
      { name: 'Maple syrup' },
      { name: 'Any nut orgeat' },
      { name: 'Commercial orgeat' },
      { name: 'Quinine simple syrup' },
      { name: 'Simple syrup' },
      { name: 'Cabernet sauvignon' },
      { name: 'Coconut water' },
      { name: 'Espresso' },
      { name: 'Sour orange juice' },
      { name: 'Café Zacapa' },
      { name: 'Chocolate vodka' },
      { name: 'Jalapeño Tequila' },
      { name: 'Lemongrass Vodka' },
      { name: 'Milk-Washed Rum' },
      { name: 'Peanut Butter and Jelly Vodka' },
      { name: 'Sugared 100 proof' },
      { name: 'Sugared 80 proof' },
      { name: 'Tea Vodka' },
      { name: 'Turmeric Gin' },
      { name: 'Generic Fino Sherry' },
      { name: 'Generic Manzanilla Sherry' },
      { name: 'Generic Amontillado Sherry' },
      { name: 'Generic Palo Cortado Sherry' },
      { name: 'Generic Oloroso Sherry' },
      { name: 'Generic Dry Sherry' },
      { name: 'Generic Pale Cream Sherry' },
      { name: 'Generic Medium Sherry' },
      { name: 'Generic Cream Sherry' },
      { name: 'Generic Sweet Sherry' },
      { name: 'Generic Moscatel Sherry' },
      { name: 'Generic Pedro Ximénez Sherry' },
      { name: 'Generic Pisco' },
      { name: 'Generic Old Tom Gin' },
      { name: 'Generic Dry Gin' },
      { name: 'Generic Rye Whisky' },
      { name: 'Generic Bourbon Whisky' },
      { name: 'Generic Scotch Whisky' },
      { name: 'Generic white Rum' },
      { name: 'Generic dark Rum' },
      { name: 'Generic Rum Agricole' },
      { name: 'Generic Vodka' },
      { name: 'Generic Tequila' },
      { name: 'Generic Cognac' },
      { name: 'Generic Brandy' },
      { name: 'Generic Mezcal' },
    ])

    console.assert(abvs.length === ingredients.length)
    console.assert(sugars.length === ingredients.length)
    console.assert(acids.length === ingredients.length)

    const units = await Unit.all()
    const abv = units.find(({ name }) => name === 'ABV')!
    const sugar = units.find(({ name }) => name === 'Sugar')!
    const acid = units.find(({ name }) => name === 'Acid')!

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i]

      await ingredient.related('ranges').createMany([
        { unitId: abv.id, amount: abvs[i] },
        { unitId: sugar.id, amount: sugars[i] },
        { unitId: acid.id, amount: acids[i] },
      ])
    }
  }
}
