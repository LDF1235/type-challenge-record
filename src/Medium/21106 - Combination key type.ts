/*
  21106 - Combination key type
  -------
  by Nauxscript (@Nauxscript) #medium

  ### Question

  1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
  2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

  > View on GitHub: https://tsch.js.org/21106
*/

/* _____________ Your Code Here _____________ */

type _Combs<
  T extends any[],
  A = T extends [infer F, ...infer R] ? F : never,
  B = T extends [infer F, ...infer R] ? R : []
> = B extends [infer F, ...infer R]
  ? `${A extends string ? A : never} ${F extends string ? F : never}` | _Combs<T, A, R>
  : never;

// 实现 Combs
type Combs<T extends any[]> = T extends [infer F, ...infer R] ? _Combs<T> | Combs<R> : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn'];
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn';

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21106/answer
  > View solutions: https://tsch.js.org/21106/solutions
  > More Challenges: https://tsch.js.org
*/
