---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Send an optional parameter with a single literal type only when the caller sets it. The literal value was used as a default, so a header such as `@header rangeUnit?: "items"` was always sent. Required literal parameters, such as `Content-Type`, keep their default.
