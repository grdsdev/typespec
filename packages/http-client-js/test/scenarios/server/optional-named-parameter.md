# Should declare optional server parameters in the client options

## Spec

This spec defines a server whose optional parameter is not named `endpoint`.

```tsp
@service(#{ title: "Parametrized Endpoint" })
@server(
  "{baseUrl}",
  "Test server with a named parameter.",
  {
    baseUrl?: url = "http://localhost:3000",
  }
)
namespace Test;

op noOperationParams(): NoContentResponse;
```

## Client Context

The client options should declare `baseUrl`, because the context factory reads it from the options.

```ts src/api/testClientContext.ts
import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface TestClientContext extends Client {}
export interface TestClientOptions extends ClientOptions {
  baseUrl?: string;
  endpoint?: string;
}
export function createTestClientContext(options?: TestClientOptions): TestClientContext {
  const params: Record<string, any> = {
    baseUrl: options?.baseUrl ?? "http://localhost:3000",
  };
  const resolvedEndpoint = "{baseUrl}".replace(/{([^}]+)}/g, (_, key) =>
    key in params
      ? String(params[key])
      : (() => {
          throw new Error(`Missing parameter: ${key}`);
        })(),
  );
  return getClient(resolvedEndpoint, {
    ...options,
  });
}
```
