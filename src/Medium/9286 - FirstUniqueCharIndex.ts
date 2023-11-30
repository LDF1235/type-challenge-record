/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type UniqueIndexMap<
  T extends string,
  A extends Record<string, number> = {},
  B extends string[] = []
> = T extends `${infer F}${infer R}`
  ? UniqueIndexMap<
      R,
      {
        [P in keyof A as P extends F ? never : P]: A[P];
      } & Record<F, F extends keyof A ? -1 : B['length']>,
      [...B, F]
    >
  : {
      [P in keyof A]: A[P];
    };

type _FirstUniqueCharIndex<T extends string, IndexMap = UniqueIndexMap<T>> = T extends `${infer F}${infer R}`
  ? F extends keyof IndexMap
    ? IndexMap[F] extends -1
      ? _FirstUniqueCharIndex<R, IndexMap>
      : IndexMap[F]
    : _FirstUniqueCharIndex<R, IndexMap>
  : -1;

type FirstUniqueCharIndex<T extends string> = _FirstUniqueCharIndex<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
