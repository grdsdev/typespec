# Response content types are matched exactly

The client must compare the media type of the response exactly and ignore its parameters. A substring match would let `text/plain; for="application/json"` select the JSON branch.

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
  read():
    | {
        @header contentType: "application/json";
        @body body: Widget[];
      }
    | {
        @header contentType: "text/plain";
        @body body: string;
      };
}
```

## TypeScript

### Response

It should compare the media type before `;` with each declared content type.

```ts src/api/widgetsClient/widgetsClientOperations.ts function read
export async function read(
  client: WidgetsClientContext,
  options?: ReadOptions,
): Promise<Array<Widget> | string> {
  const path = parse("/widgets").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (
    +response.status === 200 &&
    response.headers["content-type"]?.split(";")[0].trim().toLowerCase() === "application/json"
  ) {
    return jsonArrayWidgetToApplicationTransform(response.body)!;
  }
  if (
    +response.status === 200 &&
    response.headers["content-type"]?.split(";")[0].trim().toLowerCase() === "text/plain"
  ) {
    return response.body!;
  }
  throw createRestError(response);
}
```
