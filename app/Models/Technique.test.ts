import test from 'japa'
import Technique, { TechniqueCode } from './Technique'

test.group('Technique model', () => {
  test('it hould work', async assert => {
    const built = await Technique.query()
      .where('id', 1)
      .preload('ranges', query => query.preload('unit'))
      .firstOrFail()

    assert.equal(built.code, TechniqueCode.BUILT)
    assert.isAtLeast(built.ranges.length, 1)
    assert.equal(built.ranges[0].unit.unit, 'oz')
    assert.equal(built.ranges[0].min, 2.33)
    assert.equal(built.ranges[0].max, 2.5)
  })
})
