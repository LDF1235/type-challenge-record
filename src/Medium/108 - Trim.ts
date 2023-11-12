/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */

type StrToArr<S extends string, A extends string[] = []> = S extends `${infer F}${infer R}`
  ? StrToArr<R, [...A, F]>
  : A;

type Space = '\n' | '\t' | ' ';

type _TrimArr<T extends string[]> = T extends [infer F, ...infer R]
  ? F extends Space
    ? _TrimArr<R extends string[] ? R : []>
    : T extends [...infer F, infer R]
    ? R extends Space
      ? _TrimArr<F extends string[] ? F : []>
      : T
    : T
  : T;

type ArrToStr<T extends string[], A extends string = ''> = T extends [infer F, ...infer R]
  ? ArrToStr<R extends string[] ? R : [], `${A}${F extends string ? F : ''}`>
  : A;

type Trim<S extends string> = ArrToStr<_TrimArr<StrToArr<S>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
