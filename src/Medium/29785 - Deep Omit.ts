/*
  29785 - Deep Omit
  -------
  by bowen (@jiaowoxiaobala) #medium #omit object-keys deep

  ### Question

  Implement a type`DeepOmit`, Like Utility types [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), A type takes two arguments.

  For example:

  ```ts
  type obj = {
    person: {
      name: string;
      age: {
        value: number
      }
    }
  }

  type test1 = DeepOmit<obj, 'person'>    // {}
  type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
  type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
  type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
  ```

  > View on GitHub: https://tsch.js.org/29785
*/

/* _____________ Your Code Here _____________ */

type ToPaths<T, A extends string[] = []> = T extends `${infer F}.${infer R}` ? ToPaths<R, [...A, F]> : [...A, T];

type Shift<T extends unknown[]> = T extends [infer F, ...infer R] ? R : [];

type _DeepOmit<T, Paths extends string[], isMatchPath extends boolean = true> = {
  [P in keyof T as P extends Paths[0]
    ? isMatchPath extends true
      ? Paths['length'] extends 1
        ? never
        : P
      : P
    : P]: _DeepOmit<T[P], Shift<Paths>, P extends Paths[0] ? true : false>;
};

type DeepOmit<T, S extends string> = _DeepOmit<T, ToPaths<S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string; age: {} } }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/29785/answer
  > View solutions: https://tsch.js.org/29785/solutions
  > More Challenges: https://tsch.js.org
*/
