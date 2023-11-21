/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

type NumberToArr<T extends number, A extends number[] = []> = A['length'] extends T ? A : NumberToArr<T, [...A, 1]>;

type GreaterThan<T extends number, U extends number> = T extends U
  ? false
  : NumberToArr<T> extends [...NumberToArr<U>, ...infer R]
  ? true
  : false;

type EqualOrGreaterThan<A extends number, B extends number> = A extends B ? true : GreaterThan<A, B>;

type NumberPlusOne<A, B extends number[] = []> = B['length'] extends A
  ? [...B, 1]['length']
  : NumberPlusOne<A, [...B, 1]>;

type _Fill<T extends unknown[], N, Start extends number, End extends number, CurIndex extends number = 0> = T extends [
  infer F,
  ...infer R
]
  ? [
      EqualOrGreaterThan<CurIndex, Start> extends true ? (GreaterThan<End, CurIndex> extends true ? N : F) : F,
      ..._Fill<R, N, Start, End, NumberPlusOne<CurIndex>>
    ]
  : [];

type Fill<T extends unknown[], N, Start extends number = 0, End extends number = T['length']> = _Fill<T, N, Start, End>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
