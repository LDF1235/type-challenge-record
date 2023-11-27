/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type Includes<T extends unknown[], A> = T extends [infer F, ...infer R] ? (A extends F ? true : Includes<R, A>) : false;

type StrToArr<T extends string, A extends string[] = []> = T extends `${infer F}${infer R}`
  ? StrToArr<R, [...A, F]>
  : A;

type _FirstUniqueCharIndex<T extends string, Left extends string[] = []> = T extends `${infer F}${infer R}`
  ? Includes<StrToArr<R>, F> extends true
    ? _FirstUniqueCharIndex<R, [...Left, F]>
    : Includes<Left, F> extends true
    ? _FirstUniqueCharIndex<R, [...Left, F]>
    : Left['length']
  : -1;

type a = FirstUniqueCharIndex<'leetcode'>;

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
