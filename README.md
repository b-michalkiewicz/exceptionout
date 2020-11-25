# exceptionout - no more exceptions

With `exceptionout` you can get rid of exceptions and write your code in more predictable (functional) way

---

## Table of Contents

-   [Either](#Either)
-   [Result](#Result)
-   [Tuple](#Tuple)

---

## Either

`Either` is inspired by either monad and stands for either Left (error) or Right (success).

```typescript
import { getEither } from "exceptionout";

...
const externalCall = Math.random() >= 0.5 ? Promise.resolve(1) : Promise.reject(new Error("external error"));
const result = await getEither(externalCall, (e) => e);

result
  .mapRight((r) => r.toFixed(1)) // r is number
  .mapLeft((l) => l.message) // l is Error
```

---

## Result

`Result` is an union type of Error or success T.

```typescript
import { getResult, isSuccess } from "exceptionout";

...
const externalCall = Math.random() >= 0.5 ? Promise.resolve(1) : Promise.reject(new Error("external error"));
const result = await getResult(externalCall);

if (isSuccess(result)) {
  result.toFixed(1); // result is number
} else {
  result.message; // result is Error
}
```

---

## Tuple

`Tuple` represents a tuple of Error and success T.

```typescript
import { getTuple } from "exceptionout";

...
const externalCall = Math.random() >= 0.5 ? Promise.resolve(1) : Promise.reject(new Error("external error"));
const [, success] = await getTuple(externalCall);

if (success) {
    success.toFixed(1); // success
}

const nextExternalCall = Math.random() >= 0.5 ? Promise.resolve(1) : Promise.reject(new Error("external error"));
const [error] = await getTuple(nextExternalCall);

if (error) {
    error.message; // error
}
```
