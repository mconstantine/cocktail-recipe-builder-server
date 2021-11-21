import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cocktail from 'App/Models/Cocktail'
import CocktailIngredient from 'App/Models/CocktailIngredient'
import Ingredient from 'App/Models/Ingredient'
import Technique, { TechniqueCode } from 'App/Models/Technique'
import Unit from 'App/Models/Unit'

export default class CocktailSeeder extends BaseSeeder {
  public async run() {
    const ingredients = await Ingredient.all()
    const units = await Unit.all()
    const techniques = await Technique.all()

    // Techniques
    const built = techniques.find(({ code }) => code === TechniqueCode.BUILT)!
    const shaken = techniques.find(({ code }) => code === TechniqueCode.SHAKEN)!

    const stirred = techniques.find(
      ({ code }) => code === TechniqueCode.STIRRED,
    )!

    const shakenWithEgg = techniques.find(
      ({ code }) => code === TechniqueCode.SHAKEN_WITH_EGG,
    )!

    const blended = techniques.find(
      ({ code }) => code === TechniqueCode.BLENDED,
    )!

    const carbonated = techniques.find(
      ({ code }) => code === TechniqueCode.CARBONATED,
    )!

    // Ingredients
    const lemonJuice = ingredients.find(({ name }) => name === 'Lemon juice')!
    const limeJuice = ingredients.find(({ name }) => name === 'Lime juice')!
    const simpleSyrup = ingredients.find(({ name }) => name === 'Simple syrup')!
    const saline = ingredients.find(({ name }) => name === 'Saline solution')!
    const eggWhite = ingredients.find(({ name }) => name === 'Egg white')!
    const campari = ingredients.find(({ name }) => name === 'Campari')!
    const gin = ingredients.find(({ name }) => name === 'Generic Dry Gin')!
    const cointreau = ingredients.find(({ name }) => name === 'Cointreau')!
    const mezcal = ingredients.find(({ name }) => name === 'Generic Mezcal')!

    const ryeWhisky = ingredients.find(
      ({ name }) => name === 'Rittenhouse rye',
    )!

    const anticaFormula = ingredients.find(
      ({ name }) => name === 'Carpano Antica Formula',
    )!

    const angostura = ingredients.find(
      ({ name }) => name === 'Angostura bitters',
    )!

    const whiteRum = ingredients.find(
      ({ name }) => name === 'Generic white Rum',
    )!

    const maraschino = ingredients.find(
      ({ name }) => name === 'Luxardo Maraschino',
    )!

    const grapefruitJuice = ingredients.find(
      ({ name }) => name === 'Grapefruit juice',
    )!

    const vermouth = ingredients.find(
      ({ name }) => name === 'Generic sweet vermouth',
    )!

    const bourbon = ingredients.find(
      ({ name }) => name === 'Elijah Craig 12yo bourbon',
    )!

    const corianderSyrup = ingredients.find(
      ({ name }) => name === 'Coriander syrup',
    )!

    const yellowChartreuse = ingredients.find(
      ({ name }) => name === 'Yellow Chartreuse',
    )!

    const hellfireBitters = ingredients.find(
      ({ name }) => name === 'Hellfire bitters',
    )!

    // Units
    const ozUnit = units.find(({ unit }) => unit === 'oz')!
    const dashUnit = units.find(({ unit }) => unit === 'dash')!
    const dropUnit = units.find(({ unit }) => unit === 'drop')!

    // Cocktails
    const manhattan = await Cocktail.create({
      name: 'Manhattan',
      techniqueId: stirred.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: manhattan.id,
        ingredientId: ryeWhisky.id,
        amount: 2,
        unitId: ozUnit.id,
      },
      {
        cocktailId: manhattan.id,
        ingredientId: anticaFormula.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: manhattan.id,
        ingredientId: angostura.id,
        amount: 2,
        unitId: dashUnit.id,
      },
    ])

    const whiskySour = await Cocktail.create({
      name: 'Whisky Sour',
      techniqueId: shakenWithEgg.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: whiskySour.id,
        ingredientId: ryeWhisky.id,
        amount: 2,
        unitId: ozUnit.id,
      },
      {
        cocktailId: whiskySour.id,
        ingredientId: lemonJuice.id,
        amount: 0.5,
        unitId: ozUnit.id,
      },
      {
        cocktailId: whiskySour.id,
        ingredientId: simpleSyrup.id,
        amount: 0.75,
        unitId: ozUnit.id,
      },
      {
        cocktailId: whiskySour.id,
        ingredientId: saline.id,
        amount: 2,
        unitId: dropUnit.id,
      },
      {
        cocktailId: whiskySour.id,
        ingredientId: eggWhite.id,
        amount: 1,
        unitId: ozUnit.id,
      },
    ])

    const daiquiri = await Cocktail.create({
      name: 'Daiquiri',
      techniqueId: shaken.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: daiquiri.id,
        ingredientId: whiteRum.id,
        amount: 2,
        unitId: ozUnit.id,
      },
      {
        cocktailId: daiquiri.id,
        ingredientId: simpleSyrup.id,
        amount: 0.75,
        unitId: ozUnit.id,
      },
      {
        cocktailId: daiquiri.id,
        ingredientId: limeJuice.id,
        amount: 0.75,
        unitId: ozUnit.id,
      },
      {
        cocktailId: daiquiri.id,
        ingredientId: saline.id,
        amount: 2,
        unitId: dropUnit.id,
      },
    ])

    const hemingwayDaiquiri = await Cocktail.create({
      name: 'Hemingway Daiquiri',
      techniqueId: shaken.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: hemingwayDaiquiri.id,
        ingredientId: whiteRum.id,
        amount: 2,
        unitId: ozUnit.id,
      },
      {
        cocktailId: hemingwayDaiquiri.id,
        ingredientId: limeJuice.id,
        amount: 0.75,
        unitId: ozUnit.id,
      },
      {
        cocktailId: hemingwayDaiquiri.id,
        ingredientId: maraschino.id,
        amount: 0.5,
        unitId: ozUnit.id,
      },
      {
        cocktailId: hemingwayDaiquiri.id,
        ingredientId: grapefruitJuice.id,
        amount: 0.5,
        unitId: ozUnit.id,
      },
      {
        cocktailId: hemingwayDaiquiri.id,
        ingredientId: saline.id,
        amount: 2,
        unitId: dropUnit.id,
      },
    ])

    const negroni = await Cocktail.create({
      name: 'Negroni',
      techniqueId: stirred.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: negroni.id,
        ingredientId: gin.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: negroni.id,
        ingredientId: campari.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: negroni.id,
        ingredientId: vermouth.id,
        amount: 1,
        unitId: ozUnit.id,
      },
    ])

    const oldFashioned = await Cocktail.create({
      name: 'Cliff Old Fashioned',
      techniqueId: built.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: oldFashioned.id,
        ingredientId: bourbon.id,
        amount: 2,
        unitId: ozUnit.id,
      },
      {
        cocktailId: oldFashioned.id,
        ingredientId: corianderSyrup.id,
        amount: 0.375,
        unitId: ozUnit.id,
      },
      {
        cocktailId: oldFashioned.id,
        ingredientId: angostura.id,
        amount: 2,
        unitId: dashUnit.id,
      },
    ])

    const blenderMarg = await Cocktail.create({
      name: 'Blender Marg',
      techniqueId: blended.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: blenderMarg.id,
        ingredientId: cointreau.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: blenderMarg.id,
        ingredientId: mezcal.id,
        amount: 0.75,
        unitId: ozUnit.id,
      },
      {
        cocktailId: blenderMarg.id,
        ingredientId: yellowChartreuse.id,
        amount: 0.5,
        unitId: ozUnit.id,
      },
      {
        cocktailId: blenderMarg.id,
        ingredientId: limeJuice.id,
        amount: 0.5,
        unitId: ozUnit.id,
      },
      {
        cocktailId: blenderMarg.id,
        ingredientId: hellfireBitters.id,
        amount: 10,
        unitId: dropUnit.id,
      },
      {
        cocktailId: blenderMarg.id,
        ingredientId: saline.id,
        amount: 5,
        unitId: dropUnit.id,
      },
    ])

    const carbonatedNegroni = await Cocktail.create({
      name: 'Carbonated Negroni',
      techniqueId: carbonated.id,
    })

    await CocktailIngredient.createMany([
      {
        cocktailId: carbonatedNegroni.id,
        ingredientId: gin.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: carbonatedNegroni.id,
        ingredientId: campari.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: carbonatedNegroni.id,
        ingredientId: vermouth.id,
        amount: 1,
        unitId: ozUnit.id,
      },
      {
        cocktailId: carbonatedNegroni.id,
        ingredientId: limeJuice.id,
        amount: 0.25,
        unitId: ozUnit.id,
      },
      {
        cocktailId: carbonatedNegroni.id,
        ingredientId: saline.id,
        amount: 4,
        unitId: dropUnit.id,
      },
    ])
  }
}
