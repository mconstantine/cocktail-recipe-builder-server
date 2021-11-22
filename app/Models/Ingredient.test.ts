import test from 'japa'
import Ingredient from './Ingredient'

test.group('Ingredient model', () => {
  test('it should work', async assert => {
    const carpano = await Ingredient.query()
      .preload('ranges', query => query.preload('unit'))
      .where('id', 1)
      .firstOrFail()

    assert.equal(carpano.name, 'Carpano Antica Formula')
    assert.isAtLeast(carpano.ranges.length, 3)
    assert.equal(carpano.ranges[0].unit.name, 'ABV')
    assert.equal(carpano.ranges[0].amount, 16.5)
    assert.equal(carpano.ranges[1].unit.name, 'Sugar')
    assert.equal(carpano.ranges[1].amount, 16)
    assert.equal(carpano.ranges[2].unit.name, 'Acid')
    assert.equal(carpano.ranges[2].amount, 0.6)
  })
})
