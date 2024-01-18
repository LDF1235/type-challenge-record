/*
  27958 - CheckRepeatedTuple
  -------
  by bowen (@jiaowoxiaobala) #medium

  ### Question

  Implement type `CheckRepeatedChars<T>` which will return whether type `T` contains duplicated member

  For example:

  ```ts
  type CheckRepeatedTuple<[1, 2, 3]>   // false
  type CheckRepeatedTuple<[1, 2, 1]>   // true
  ```

  > View on GitHub: https://tsch.js.org/27958
*/

/* _____________ Your Code Here _____________ */

type _InCludes<T extends unknown[], A> = T extends [infer F, ...infer R]
  ? F extends A
    ? A extends F
      ? true
      : _InCludes<R, A>
    : false
  : false;

type _CheckRepeatedTuple<T extends unknown[], L extends unknown[] = []> = T extends [infer F, ...infer R]
  ? _InCludes<L, F> extends true
    ? true
    : _CheckRepeatedTuple<R, [...L, F]>
  : false;

type CheckRepeatedTuple<T extends unknown[]> = _CheckRepeatedTuple<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27958/answer
  > View solutions: https://tsch.js.org/27958/solutions
  > More Challenges: https://tsch.js.org
*/
