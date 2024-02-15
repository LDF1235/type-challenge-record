/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

type Letter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

type IsLetter<T> = T extends string ? (Lowercase<T> extends Letter ? true : false) : false;

type _CapitalizeWords<
  S extends string,
  IsNewWord extends boolean = true,
  A extends string = ''
> = S extends `${infer F}${infer R}`
  ? IsNewWord extends true
    ? IsLetter<F> extends true
      ? _CapitalizeWords<R, false, `${A}${Uppercase<F>}`>
      : _CapitalizeWords<R, true, `${A}${F}`>
    : IsLetter<F> extends true
    ? _CapitalizeWords<R, false, `${A}${F}`>
    : _CapitalizeWords<R, true, `${A}${Uppercase<F>}`>
  : A;

type CapitalizeWords<S extends string> = _CapitalizeWords<S>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<
    Equal<
      CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
      'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
    >
  >,
  Expect<Equal<CapitalizeWords<''>, ''>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
