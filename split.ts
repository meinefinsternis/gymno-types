// https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/

// @errors: 2344
type Expect<T extends true> = T
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// ---cut---

// Implement this type
type Split<S extends string, SEP extends string> = S extends `${infer Head}${SEP}${infer Last}` ? [Head, ...Split<Last, SEP>] : S extends SEP ? [] : string extends S ? string[] : S extends SEP ? [""] : [S]

type t = Split<string, "whatever">

// Tests

type cases = [
  Expect<
    Equal<
      Split<"Hi! How are you?", "z">,
      ["Hi! How are you?"]
    >
  >,
  Expect<
    Equal<
      Split<"Hi! How are you?", " ">,
      ["Hi!", "How", "are", "you?"]
    >
  >,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
]
