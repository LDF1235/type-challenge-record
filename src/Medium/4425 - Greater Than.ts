/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type strToLenStr<T extends string, A extends string = ''> = T extends `${infer F}${infer R}`
  ? strToLenStr<R, `${A}1`>
  : A;

type StrToNumberArr<T extends string, A extends number[] = []> = `${A['length']}` extends T
  ? A
  : StrToNumberArr<T, [...A, 1]>;

type CompareSingleNumberStr<
  A extends string,
  B extends string,
  C extends number[] = StrToNumberArr<A>,
  D extends number[] = StrToNumberArr<B>
> = C extends [...D, infer F] ? true : false;

type CompareNumberStr<A extends string, B extends string> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareSingleNumberStr<AF, BF> extends true
      ? true
      : CompareNumberStr<AR, BR>
    : false
  : false;

type _GreaterThan<
  T extends number,
  U extends number,
  A extends string = strToLenStr<`${T}`>,
  B extends string = strToLenStr<`${U}`>
> = A extends `${B}${infer R}` ? (R extends '' ? CompareNumberStr<`${T}`, `${U}`> : true) : false;

type GreaterThan<T extends number, U extends number> = _GreaterThan<T, U> extends true ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
