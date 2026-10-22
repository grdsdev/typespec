# Should send an optional header with a single possible value only when it is set

```tsp
@service
namespace Test;

@get op get(@header rangeUnit?: "items"): void;
```

## Operation

The literal value is not a default, because the header is optional.

```ts src/api/testClientOperations.ts function get
export async function get(client: TestClientContext, options?: GetOptions): Promise<void> {
  const path = parse("/").expand({});
  const httpRequestOptions = {
    headers: {
      ...(options?.rangeUnit && { "range-unit": options.rangeUnit }),
    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
```

## Options

```ts src/api/testClientOperations.ts interface GetOptions
export interface GetOptions extends OperationOptions {
  rangeUnit?: "items";
}
```
