/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

/* _____________ Your Code Here _____________ */
type PlusOne<T extends number, Arr extends 1[] = []> = Arr['length'] extends T
  ? [...Arr, 1]['length']
  : PlusOne<T, [...Arr, 1]>;

type StrLen<T extends string, N extends number = 0> = T extends `${infer A}${infer R}` ? StrLen<R, PlusOne<N>> : N;

type _FindAll<T extends string, P extends string, Ret extends number[] = [], PrevStr extends string = ''> = T extends ''
  ? Ret
  : P extends ''
  ? Ret
  : _FindAll<
      T extends `${infer F}${infer R}` ? R : '',
      P,
      T extends `${P}${infer R}` ? [...Ret, StrLen<PrevStr>] : Ret,
      `${PrevStr}${T extends `${infer F}${infer R}` ? F : ''}`
    >;

type FindAll<T extends string, P extends string> = _FindAll<T, P>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21104/answer
  > View solutions: https://tsch.js.org/21104/solutions
  > More Challenges: https://tsch.js.org
*/
