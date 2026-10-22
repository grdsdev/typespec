---
changeKind: fix
packages:
  - "@typespec/http"
---

`httpOperation.flattenResponses` typekit returns one entry per content type when a response declares its `Content-Type` header as a union of literals. It returned a single entry with an `undefined` content type.
