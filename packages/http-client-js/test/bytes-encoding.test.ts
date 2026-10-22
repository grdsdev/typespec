import { expectDiagnosticEmpty } from "@typespec/compiler/testing";
import { it } from "vitest";
import { emitWithDiagnostics } from "./test-host.js";

it("does not report unknown-encoding for raw bytes bodies", async () => {
  const [, diagnostics] = await emitWithDiagnostics(`
    import "@typespec/http";
    using Http;

    @service
    namespace Test;

    @post op upload(@header contentType: "application/octet-stream", @body body: bytes): void;
    @get op download(): { @header contentType: "application/octet-stream"; @body body: bytes };
  `);
  expectDiagnosticEmpty(diagnostics);
});
