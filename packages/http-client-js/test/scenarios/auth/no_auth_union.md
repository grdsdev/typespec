# Handles an authentication scheme that also allows anonymous requests

With `NoAuth` in the `@useAuth` union, the client must accept calls without a credential.

## Typespec

```tsp
@service(#{ title: "Test Service" })
@useAuth(ApiKeyAuth<ApiKeyLocation.header, "x-api-key"> | NoAuth)
namespace Test;

@route("/valid")
@get
op valid(): NoContentResponse;
```

## TypeScript

### Client

The credential stays a positional parameter, but it is optional.

```ts src/testClient.ts class TestClient
export class TestClient {
  #context: TestClientContext;
  constructor(endpoint: string, credential?: ApiKeyCredential, options?: TestClientOptions) {
    this.#context = createTestClientContext(endpoint, credential, options);
  }
  async valid(options?: ValidOptions) {
    return valid(this.#context, options);
  }
}
```

### ClientContext

Without a credential, the runtime adds no authentication policy, so the client sends no `x-api-key` header.

```ts src/api/testClientContext.ts function createTestClientContext
export function createTestClientContext(
  endpoint: string,
  credential?: ApiKeyCredential,
  options?: TestClientOptions,
): TestClientContext {
  const params: Record<string, any> = {
    endpoint: endpoint,
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params
      ? String(params[key])
      : (() => {
          throw new Error(`Missing parameter: ${key}`);
        })(),
  );
  return getClient(resolvedEndpoint, {
    ...options,
    credential,
    authSchemes: [
      {
        kind: "apiKey",
        apiKeyLocation: "header",
        name: "x-api-key",
      },
    ],
  });
}
```
