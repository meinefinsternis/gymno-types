// @errors: 2344
type Expect<T extends true> = T
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type
type EndsWith<A extends string, B extends string> = A extends `${string}${" "}${infer Last}` ? Last extends B ? true : false : false

// Tests
type cases = [
  Expect<Equal<EndsWith<"ice cream", "cream">, true>>,
  Expect<Equal<EndsWith<"ice cream", "chocolate">, false>>
]
