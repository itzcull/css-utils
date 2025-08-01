import { describe, it } from 'vitest'
import { calc } from './calc'

describe(calc.name, () => {
  describe(calc.name, () => {
    it('standard usage', ({ expect }) => {
      expect(calc('10px').add('20px').toString()).toMatchInlineSnapshot(
        `"calc(10px + 20px)"`,
      )
      expect(calc('10px').add('20px', '30px').toString()).toMatchInlineSnapshot(
        `"calc(10px + 20px + 30px)"`,
      )
      expect(calc('20px').subtract('10px').toString()).toMatchInlineSnapshot(
        `"calc(20px - 10px)"`,
      )
      expect(
        calc('20px').subtract('5px', '5px').toString(),
      ).toMatchInlineSnapshot(`"calc(20px - 5px - 5px)"`)
      expect(calc('10px').multiply(10).toString()).toMatchInlineSnapshot(
        `"calc(10px * 10)"`,
      )
      expect(calc('10px').multiply(10, 2).toString()).toMatchInlineSnapshot(
        `"calc(10px * 10 * 2)"`,
      )
      expect(calc('10px').divide(10).toString()).toMatchInlineSnapshot(
        `"calc(10px / 10)"`,
      )
      expect(calc('10px').divide(10, 2).toString()).toMatchInlineSnapshot(
        `"calc(10px / 10 / 2)"`,
      )
      expect(
        calc('10px').add('20px').multiply(2).toString(),
      ).toMatchInlineSnapshot(`"calc((10px + 20px) * 2)"`)
      expect(
        calc('10px').add('20px').divide(2).toString(),
      ).toMatchInlineSnapshot(`"calc((10px + 20px) / 2)"`)
      expect(
        calc('20px').subtract('10px').negate().toString(),
      ).toMatchInlineSnapshot(`"calc((20px - 10px) * -1)"`)
      expect(
        calc('10px').multiply(100).divide(2).negate().toString(),
      ).toMatchInlineSnapshot(`"calc(((10px * 100) / 2) * -1)"`)
      expect(
        calc('10px')
          .add('50px')
          .subtract('20px')
          .multiply(100)
          .divide(2)
          .negate()
          .toString(),
      ).toMatchInlineSnapshot(
        `"calc(((((10px + 50px) - 20px) * 100) / 2) * -1)"`,
      )
    })

    it('bailing early', ({ expect }) => {
      expect(calc('10px').toString()).toMatchInlineSnapshot(`"10px"`)
    })

    it('string coercion', ({ expect }) => {
      expect(calc('10px').toString()).toMatchInlineSnapshot(`"10px"`)
      expect(calc('10px').add('20px').toString()).toMatchInlineSnapshot(
        `"calc(10px + 20px)"`,
      )
      expect(`${calc('10px').add('20px')}`).toMatchInlineSnapshot(
        `"calc(10px + 20px)"`,
      )
      expect(
        `${calc('10px').add(calc('20px').subtract('4em'))}`,
      ).toMatchInlineSnapshot(`"calc(10px + (20px - 4em))"`)
      expect(`${calc('10px').add(calc('20px'))}`).toMatchInlineSnapshot(
        `"calc(10px + 20px)"`,
      )
    })
  })

  it(calc.add.name, ({ expect }) => {
    expect(calc.add(1, 2)).toMatchInlineSnapshot(`"calc(1 + 2)"`)
    expect(calc.add(1, 2, 3)).toMatchInlineSnapshot(`"calc(1 + 2 + 3)"`)
    expect(calc.add('1', 2, 3 - 4)).toMatchInlineSnapshot(`"calc(1 + 2 + -1)"`)
    expect(calc.add('10px', '2em')).toMatchInlineSnapshot(`"calc(10px + 2em)"`)
    expect(
      calc.add('10px', '2em', calc.add('2', '6rem')),
    ).toMatchInlineSnapshot(`"calc(10px + 2em + (2 + 6rem))"`)
    expect(
      calc.add(
        calc.multiply(
          calc.subtract('10px', '2em'),
          calc.add('2', '6rem'),
          '4px',
        ),
      ),
    ).toMatchInlineSnapshot(`"calc(((10px - 2em) * (2 + 6rem) * 4px))"`)
  })

  it(calc.subtract.name, ({ expect }) => {
    expect(calc.subtract(1, 2)).toMatchInlineSnapshot(`"calc(1 - 2)"`)
    expect(calc.subtract(1, 2, 3)).toMatchInlineSnapshot(`"calc(1 - 2 - 3)"`)
    expect(calc.subtract('1', 2, 3 - 4)).toMatchInlineSnapshot(
      `"calc(1 - 2 - -1)"`,
    )
    expect(calc.subtract('10px', '2em')).toMatchInlineSnapshot(
      `"calc(10px - 2em)"`,
    )
    expect(
      calc.subtract('10px', '2em', calc.add('2', '6rem')),
    ).toMatchInlineSnapshot(`"calc(10px - 2em - (2 + 6rem))"`)
  })

  it(calc.multiply.name, ({ expect }) => {
    expect(calc.multiply(1, 2)).toMatchInlineSnapshot(`"calc(1 * 2)"`)
    expect(calc.multiply(1, 2, 3)).toMatchInlineSnapshot(`"calc(1 * 2 * 3)"`)
    expect(calc.multiply('1', 2, 3 - 4)).toMatchInlineSnapshot(
      `"calc(1 * 2 * -1)"`,
    )
    expect(calc.multiply('10px', '2em')).toMatchInlineSnapshot(
      `"calc(10px * 2em)"`,
    )
    expect(
      calc.multiply('10px', '2em', calc.add('2', '6rem')),
    ).toMatchInlineSnapshot(`"calc(10px * 2em * (2 + 6rem))"`)
  })

  it(calc.divide.name, ({ expect }) => {
    expect(calc.divide(1, 2)).toMatchInlineSnapshot(`"calc(1 / 2)"`)
    expect(calc.divide(1, 2, 3)).toMatchInlineSnapshot(`"calc(1 / 2 / 3)"`)
    expect(calc.divide('1', 2, 3 - 4)).toMatchInlineSnapshot(
      `"calc(1 / 2 / -1)"`,
    )
    expect(calc.divide('10px', '2em')).toMatchInlineSnapshot(
      `"calc(10px / 2em)"`,
    )
    expect(
      calc.divide('10px', '2em', calc.add('2', '6rem')),
    ).toMatchInlineSnapshot(`"calc(10px / 2em / (2 + 6rem))"`)
  })

  it(calc.negate.name, ({ expect }) => {
    expect(calc.negate(2)).toMatchInlineSnapshot(`"calc(2 * -1)"`)
    expect(calc.negate(3 - 4)).toMatchInlineSnapshot(`"calc(-1 * -1)"`)
    expect(calc.negate(calc.add('10px', '2em'))).toMatchInlineSnapshot(
      `"calc((10px + 2em) * -1)"`,
    )
  })
})
