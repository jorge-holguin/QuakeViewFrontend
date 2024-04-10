// Dentro de src/@types/web-vitals.d.ts

declare module 'web-vitals' {
  export function getCLS(onPerfEntry: Function): void;
  export function getFID(onPerfEntry: Function): void;
  export function getFCP(onPerfEntry: Function): void;
  export function getLCP(onPerfEntry: Function): void;
  export function getTTFB(onPerfEntry: Function): void;
}
