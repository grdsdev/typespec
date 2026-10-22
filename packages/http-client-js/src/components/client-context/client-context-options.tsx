import type { Children } from "@alloy-js/core";
import { For, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useTransformNamePolicy, useTsp } from "@typespec/emitter-framework";
import * as ef from "@typespec/emitter-framework/typescript";
import type * as cl from "@typespec/http-client";
import { httpRuntimeTemplateLib } from "../external-packages/ts-http-runtime.js";

export interface ClientContextOptionsDeclarationProps {
  client: cl.Client;
}

export function getClientContextOptionsRef(client: cl.Client) {
  return refkey(client, "options");
}

export function ClientContextOptionsDeclaration(props: ClientContextOptionsDeclarationProps) {
  const ref = getClientContextOptionsRef(props.client);
  const namePolicy = ts.useTSNamePolicy();
  const name = namePolicy.getName(`${props.client.name}Options`, "interface");

  const { $ } = useTsp();
  const propNamer = useTransformNamePolicy();

  // TODO: Here we will calculate and include all the options that the client can accept
  const clientOptions: Map<string, Children> = new Map();

  // Optional server parameters are read from the options, so declare them here.
  for (const param of $.client.getUrlTemplate(props.client).parameters) {
    const name = propNamer.getApplicationName(param);
    if (param.optional && name !== "endpoint") {
      clientOptions.set(name, <ef.TypeExpression type={param.type} />);
    }
  }
  clientOptions.set("endpoint", "string");

  return (
    <ts.InterfaceDeclaration
      export
      name={name}
      refkey={ref}
      extends={<ts.Reference refkey={httpRuntimeTemplateLib.ClientOptions} />}
    >
      <For each={Array.from(clientOptions.entries())} semicolon line enderPunctuation>
        {([key, value]) => <ts.InterfaceMember optional name={key} type={value} />}
      </For>
    </ts.InterfaceDeclaration>
  );
}
