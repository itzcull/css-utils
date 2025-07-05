import { expect, it } from 'vitest'

import { classNames } from './classes'

it('(compat) keeps object keys with truthy values', () => {
  const out = classNames({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 })
  expect(out).toBe('a f')
})

it('(compat) joins arrays of class names and ignore falsy values', () => {
  const out = classNames('a', 0, null, undefined, true, 1, 'b')
  expect(out).toBe('a 1 b')
})

it('(compat) supports heterogenous arguments', () => {
  expect(classNames({ a: true }, 'b', 0)).toBe('a b')
})

it('(compat) should be trimmed', () => {
  expect(classNames('', 'b', {}, '')).toBe('b')
})

it('(compat) returns an empty string for an empty configuration', () => {
  expect(classNames({})).toBe('')
})

it('(compat) supports an array of class names', () => {
  expect(classNames(['a', 'b'])).toBe('a b')
})

it('(compat) joins array arguments with string arguments', () => {
  expect(classNames(['a', 'b'], 'c')).toBe('a b c')
  expect(classNames('c', ['a', 'b'])).toBe('c a b')
})

it('(compat) handles multiple array arguments', () => {
  expect(classNames(['a', 'b'], ['c', 'd'])).toBe('a b c d')
})

it('(compat) handles arrays that include falsy and true values', () => {
  expect(classNames(['a', 0, null, undefined, false, true, 'b'])).toBe('a b')
})

it('(compat) handles arrays that include arrays', () => {
  expect(classNames(['a', ['b', 'c']])).toBe('a b c')
})

it('(compat) handles arrays that include objects', () => {
  expect(classNames(['a', { b: true, c: false }])).toBe('a b')
})

it('(compat) handles deep array recursion', () => {
  expect(classNames(['a', ['b', ['c', { d: true }]]])).toBe('a b c d')
})

it('(compat) handles arrays that are empty', () => {
  expect(classNames('a', [])).toBe('a')
})

it('(compat) handles nested arrays that have empty nested arrays', () => {
  expect(classNames('a', [[]])).toBe('a')
})

it('(compat) handles all types of truthy and falsy property values as expected', () => {
  const out = classNames({
    // falsy:
    null: null,
    emptyString: '',
    noNumber: Number.NaN,
    zero: 0,
    negativeZero: -0,
    false: false,
    undefined,

    // truthy (literally anything else):
    nonEmptyString: 'foobar',
    whitespace: ' ',
    function: Object.prototype.toString,
    emptyObject: {},
    nonEmptyObject: { a: 1, b: 2 },
    emptyList: [],
    nonEmptyList: [1, 2, 3],
    greaterZero: 1,
  })

  expect(out).toBe('nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero')
})
