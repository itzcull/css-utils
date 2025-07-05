export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

function toVal(mix: ClassValue): string {
  let k
  let y
  let str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  }

  else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      const len = mix.length
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          const y = toVal(mix[k])
          if (y) {
            str && (str += ' ')
            str += y
          }
        }
      }
    }
    else {
      for (y in mix) {
        if (!mix)
          continue
        const mixed = mix[y]
        if (mixed) {
          str && (str += ' ')
          str += y
        }
      }
    }
  }

  return str
}

export function classNames(...args: ClassValue[]): string {
  let str = ''
  for (const arg of args) {
    if (arg) {
      const x = toVal(arg)
      if (x) {
        str && (str += ' ')
        str += x
      }
    }
  }
  return str
}
