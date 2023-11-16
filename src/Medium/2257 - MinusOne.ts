/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

interface MinusOneMap {
  '0': '9';
  '1': '0';
  '2': '1';
  '3': '2';
  '4': '3';
  '5': '4';
  '6': '5';
  '7': '6';
  '8': '7';
  '9': '8';
}

interface PlusOneMap {
  '0': '1';
  '1': '2';
  '2': '3';
  '3': '4';
  '4': '5';
  '5': '6';
  '6': '7';
  '7': '8';
  '8': '9';
  '9': '0';
}

type SingleNumMinusOne<T extends keyof MinusOneMap, A extends boolean = true> = A extends true ? MinusOneMap[T] : T;

type SingleNumPlusOne<T extends keyof PlusOneMap, A extends boolean = true> = A extends true ? PlusOneMap[T] : T;

type LastOfStr<S extends string> = S extends `${infer F}${infer R}` ? (R extends '' ? F : LastOfStr<R>) : S;

type OmitLastLetterOfStr<S extends string, A extends string = ''> = S extends `${infer F}${infer R}`
  ? R extends ''
    ? A
    : OmitLastLetterOfStr<R, `${A}${F}`>
  : A;

type StrPlusOne<T, A extends boolean = true> = T extends `${number}`
  ? `${StrPlusOne<OmitLastLetterOfStr<T>, LastOfStr<T> extends '9' ? A : false>}${SingleNumPlusOne<
      LastOfStr<T> extends keyof PlusOneMap ? LastOfStr<T> : never,
      A
    >}`
  : '';

type StrMinusOne<T, A extends boolean = true> = T extends `${number}`
  ? `${StrMinusOne<OmitLastLetterOfStr<T>, LastOfStr<T> extends '0' ? A : false>}${SingleNumMinusOne<
      LastOfStr<T> extends keyof MinusOneMap ? LastOfStr<T> : never,
      A
    >}`
  : '';

type _MinusOne<
  T extends number,
  MinusOneRet extends string = `${T}` extends `-${infer A extends number}` ? '' : StrMinusOne<`${T}`>,
  NegativeNumberMinusOneRet extends string = `${T}` extends `-${infer A extends number}` ? StrPlusOne<`${A}`> : ''
> = T extends 0
  ? -1
  : `${T}` extends `-${infer B extends number}`
  ? NegativeNumberMinusOneRet extends `0${infer F extends number}`
    ? `-1${NegativeNumberMinusOneRet}` extends `${infer F extends number}`
      ? F
      : ''
    : NegativeNumberMinusOneRet extends `${infer F extends number}`
    ? F
    : ''
  : MinusOneRet extends `0${infer F}`
  ? F extends ''
    ? 0
    : F extends `${infer A extends number}`
    ? A
    : never
  : MinusOneRet extends `${infer A extends number}`
  ? A
  : never;

type MinusOne<T extends number> = _MinusOne<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
