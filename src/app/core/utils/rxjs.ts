import { MonoTypeOperatorFunction, OperatorFunction, pipe, tap } from "rxjs";
import { filter } from "rxjs/operators";

export function rejectNil<T>(): OperatorFunction<T, NonNullable<T>> {
  return pipe(
    filter(
      (value): value is NonNullable<T> => value !== null && value !== undefined
    )
  );
}

export function consoleLog<T>(): MonoTypeOperatorFunction<T> {
  return pipe(tap(value => console.log(value)));
}
