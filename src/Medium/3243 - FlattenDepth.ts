/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
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

type _FlatOnce<T extends unknown[], A extends unknown[] = []> = T extends [infer F, ...infer R]
  ? _FlatOnce<R, [...A, ...(F extends unknown[] ? F : [F])]>
  : A;

type IsLinearArr<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? false
    : IsLinearArr<R>
  : true;

type _FlattenDepth<
  T extends unknown[],
  Dep extends number = 1,
  IsDone extends boolean = IsLinearArr<T>
> = IsDone extends true
  ? T
  : Dep extends 0
  ? T
  : T extends [infer F, ...infer R]
  ? _FlattenDepth<_FlatOnce<T>, MinusOne<Dep>>
  : T;

type FlattenDepth<T extends unknown[], K extends number = 1> = _FlattenDepth<T, K, false>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
