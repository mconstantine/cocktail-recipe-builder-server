import test from 'japa'
import Cocktail from './Cocktail'
import { TechniqueCode } from './Technique'

test.group('Cocktail model', () => {
  test('it should work', async assert => {
    const manhattan = await Cocktail.query()
      .preload('technique')
      .preload('ingredients', query =>
        query
          .preload('ingredient', query =>
            query.preload('ranges', query => query.preload('unit')),
          )
          .preload('unit'),
      )
      .where('id', 1)
      .firstOrFail()

    assert.equal(manhattan.name, 'Manhattan')
    assert.equal(manhattan.technique.code, TechniqueCode.STIRRED)
    assert.equal(manhattan.ingredients.length, 3)
    assert.equal(manhattan.ingredients[0].ingredient.name, 'Rittenhouse rye')
    assert.equal(manhattan.ingredients[0].amount, 2)
    assert.equal(manhattan.ingredients[0].unit.unit, 'oz')
    assert.equal(
      manhattan.ingredients[1].ingredient.name,
      'Carpano Antica Formula',
    )
    assert.equal(manhattan.ingredients[1].amount, 1)
    assert.equal(manhattan.ingredients[1].unit.unit, 'oz')
    assert.equal(manhattan.ingredients[2].ingredient.name, 'Angostura bitters')
    assert.equal(manhattan.ingredients[2].amount, 2)
    assert.equal(manhattan.ingredients[2].unit.unit, 'dash')
  })
})
