// @errors: 2344
type Expect<T extends true> = T
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type
// Equal<Head, U> extends true => Head extends U
type IndexOf<T extends unknown[], U extends number, Index extends any[] = []> = T extends [infer Head, ...infer Rest] ? Equal<Head, U> extends true ? Index['length'] : IndexOf<Rest, U, [...Index, any]> : -1

// Tests

type t = IndexOf<[1, 2, 3], 2>

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>
]
