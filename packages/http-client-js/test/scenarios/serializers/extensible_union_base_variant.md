# Should transform an extensible union with the transform of its base variant

The first variant of the union is a named union of string literals, and the base variant is a string scalar that every other variant is assignable to.

## TypeSpec

```tsp
@service
namespace Test;

union A {
  a1: "a=1",
  a2: "a=2",
}
union B {
  b1: "b=1",
  b2: "b=2",
}
@pattern("^t=.+$")
scalar T extends string;
union AB {
  A,
  T,
  B,
}

@get op read(@header prefer?: AB[]): void;
```

## Serializers

Every variant is a string, so the transform returns the input as it is.

```ts src/models/internal/serializers.ts function jsonAbToTransportTransform
export function jsonAbToTransportTransform(input_?: Ab | null): any {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
```

```ts src/models/internal/serializers.ts function jsonAbToApplicationTransform
export function jsonAbToApplicationTransform(input_?: any): Ab {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
```
