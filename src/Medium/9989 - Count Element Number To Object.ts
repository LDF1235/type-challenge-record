/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

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

type SingleNumPlusOne<T extends keyof PlusOneMap, A extends boolean = true> = A extends true ? PlusOneMap[T] : T;

type OmitLastLetterOfStr<S extends string, A extends string = ''> = S extends `${infer F}${infer R}`
  ? R extends ''
    ? A
    : OmitLastLetterOfStr<R, `${A}${F}`>
  : A;

type LastOfStr<S extends string> = S extends `${infer F}${infer R}` ? (R extends '' ? F : LastOfStr<R>) : S;

type StrPlusOne<T, A extends boolean = true> = T extends `${number}`
  ? `${StrPlusOne<OmitLastLetterOfStr<T>, LastOfStr<T> extends '9' ? A : false>}${SingleNumPlusOne<
      LastOfStr<T> extends keyof PlusOneMap ? LastOfStr<T> : never,
      A
    >}`
  : '';

type PlusOne<T extends number, S = StrPlusOne<`${T}`>> = S extends `0${infer F}`
  ? `1${S}` extends `${infer F extends number}`
    ? F
    : 0
  : S extends `${infer F extends number}`
  ? F
  : 0;

type _CountElementNumberToObject<T, A extends Record<string, number> = {}> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? _CountElementNumberToObject<F, A>
    : _CountElementNumberToObject<
        R,
        {
          [P in keyof A as P extends F ? never : P]: A[P];
        } & Record<F extends string | number | symbol ? F : '', F extends keyof A ? PlusOne<A[F]> : 1>
      >
  : A;

type CountElementNumberToObject<T> = {
  [P in keyof _CountElementNumberToObject<T>]: _CountElementNumberToObject<T>[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
