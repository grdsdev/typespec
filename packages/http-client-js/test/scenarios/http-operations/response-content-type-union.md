# Response whose content type is a union

A response that declares its `Content-Type` header as a union of literals.

## TypeSpec

```tsp
@service(#{ title: "Widget Service" })
namespace DemoService;

model Widget {
  name: string;
}

@route("/widgets")
@tag("Widgets")
interface Widgets {
  @test
  @get
  read(): {
    @header contentType: "application/json" | "application/merge-patch+json";
    @body body: Widget;
  };
}
```

## TypeScript

### Response

It should check the response for each declared content type.

```ts src/api/widgetsClient/widgetsClientOperations.ts function read
export async function read(client: WidgetsClientContext, options?: ReadOptions): Promise<Widget> {
  const path = parse("/widgets").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonWidgetToApplicationTransform(response.body)!;
  }
  if (
    +response.status === 200 &&
    response.headers["content-type"]?.includes("application/merge-patch+json")
  ) {
    return jsonWidgetToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
```
