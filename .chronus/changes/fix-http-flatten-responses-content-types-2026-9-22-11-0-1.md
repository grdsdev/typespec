---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Handle responses that declare their `Content-Type` header as a union of literals. The client checked the response content type against `"undefined"` and threw on every successful response.
