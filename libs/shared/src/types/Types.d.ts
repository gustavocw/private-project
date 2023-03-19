// type Join<K, P> = K extends string | number ?
//   P extends string | number ?
//     `${K}${'' extends P ? '' : '.'}${P}`
//     : never : never;
//
// type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];
//
// type Paths<T, D extends number = 5> = [D] extends [never] ? never : T extends object ?
//   { [K in keyof T]-?: K extends string | number ?
//     `${K}` | Join<K, Paths<T[K], Prev[D]>>
//     : never
//   }[keyof T] : '';

// TODO corrigir
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Paths<T> = string;

type Constructor<T> = new (...args: Array<any>) => T;

// Assets
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.jpeg' {
  const value: any;
  export = value;
}

declare module '*.gif' {
  const value: any;
  export = value;
}
