/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

type PlusOne<T extends number, A extends number[] = []> = A['length'] extends T
  ? [...A, 1]['length']
  : PlusOne<T, [...A, 1]>;

type _LastIndexOf<T extends unknown[], U, CurIndex extends number = 0, Index extends number = -1> = T extends [
  infer F,
  ...infer R
]
  ? _LastIndexOf<R, U, PlusOne<CurIndex>, Equal<F, U> extends true ? CurIndex : Index>
  : Index;

type LastIndexOf<T extends unknown[], U> = _LastIndexOf<T, U>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/
