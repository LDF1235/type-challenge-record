/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */

type PickFirst<T> = T extends [infer F, ...infer R] ? F : never;

type OmitFirst<T> = T extends [infer F, ...infer R] ? R : [];

type PickArrByCount<T, U extends number, A extends any[] = [PickFirst<T>]> = A['length'] extends U
  ? A
  : PickArrByCount<OmitFirst<T>, U, [...A, PickFirst<OmitFirst<T>>]>;

type NumberToArr<T extends number, A extends number[] = []> = A['length'] extends T ? A : NumberToArr<T, [...A, 1]>;

type GreaterThan<T extends number, U extends number> = T extends U
  ? false
  : NumberToArr<T> extends [...NumberToArr<U>, ...infer R]
  ? true
  : false;

type OmitByCount<T, U extends number> = T extends [...PickArrByCount<T, U>, ...infer R] ? R : [];

type Chunk<T extends any[], U extends number> = T extends []
  ? []
  : GreaterThan<U, T['length']> extends true
  ? [T]
  : [PickArrByCount<T, U>, ...Chunk<OmitByCount<T, U>, U>];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/
