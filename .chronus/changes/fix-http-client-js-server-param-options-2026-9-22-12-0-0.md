---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Declare optional server parameters in the client options interface. When the `@server` parameter was not named `endpoint`, the context factory read `options.<name>`, but the options interface did not declare it, so the emitted client did not type-check.
