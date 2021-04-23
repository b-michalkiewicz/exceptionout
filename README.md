# exceptionout = no more exceptions

With `exceptionout` you can get rid of exceptions and write your code in more predictable, functional way.  
Simply wrap code that may throw, in one of the following functions and deal with error in an easy way.

---

## Table of Contents

-   [Either](#Either)
-   [Optional](#Optional)
-   [Result](#Result)
-   [Tuple](#Tuple)

---

## Either

`Either` is inspired by either monad and stands for either Left (error) or Right (success).

```typescript
import { either } from "exceptionout";

const externalCall = Math.random() >= 0.5 
  ? Promise.resolve(42) 
  : Promise.reject(new Error("external error"));

const result = await either(externalCall, () => new Error("error"));

result
  .mapRight((r) => r.toFixed(1)) // r is number
  .mapLeft((l) => l.message) // l is Error
```

---

## Optional

`Optional` means value or `undefined` if an error occurred.

```typescript
import { either } from "exceptionout";

const externalCall = Math.random() >= 0.5 
  ? Promise.resolve(42) 
  : Promise.reject(new Error("external error"));

const result = await optional(externalCall);

if (result) {
    result.toFixed(1); // result is number
}
```

---

## Result

`Result` is an union type of Error or success T.

```typescript
import { result, isSuccess } from "exceptionout";

const externalCall = Math.random() >= 0.5 
  ? Promise.resolve(42) 
  : Promise.reject(new Error("external error"));

const result = await result(externalCall);

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
import { tuple } from "exceptionout";

const externalCall = () => Math.random() >= 0.5 
  ? Promise.resolve(42) 
  : Promise.reject(new Error("external error"));

const [, success] = await tuple(externalCall());

if (success) {
    success.toFixed(1); // success
}

const [error] = await tuple(externalCall());

if (error) {
    error.message; // error
}
```
