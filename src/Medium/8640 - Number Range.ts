/*
  8640 - Number Range
  -------
  by AaronGuo (@HongxuanG) #medium

  ### Question

  Sometimes we want to limit the range of numbers...
  For examples.
  ```ts
  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ```

  > View on GitHub: https://tsch.js.org/8640
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

type StrPlusOne<T, A extends boolean = true> = T extends `${number}`
  ? `${StrPlusOne<OmitLastLetterOfStr<T>, LastOfStr<T> extends '9' ? A : false>}${SingleNumPlusOne<
      LastOfStr<T> extends keyof PlusOneMap ? LastOfStr<T> : never,
      A
    >}`
  : '';

type LastOfStr<S extends string> = S extends `${infer F}${infer R}` ? (R extends '' ? F : LastOfStr<R>) : S;

type PlusOne<T extends number, StrRet = StrPlusOne<`${T}`>> = StrRet extends `0${infer F}`
  ? `1${StrRet}` extends `${infer N extends number}`
    ? N
    : T
  : StrRet extends `${infer N extends number}`
  ? N
  : T;

type _NumberRange<L extends number, H extends number, Cur extends number = L, A extends number[] = []> = Cur extends H
  ? [...A, H][number]
  : _NumberRange<L, H, PlusOne<Cur>, [...A, Cur]>;

type NumberRange<L extends number, H extends number> = _NumberRange<L, H>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
type Result1 = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Result2 = 0 | 1 | 2;
type Result3 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140;
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8640/answer
  > View solutions: https://tsch.js.org/8640/solutions
  > More Challenges: https://tsch.js.org
*/
