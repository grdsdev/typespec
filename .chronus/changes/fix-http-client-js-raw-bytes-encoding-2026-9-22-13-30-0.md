---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Do not report `unknown-encoding` for `bytes` payloads with a binary content type, such as `application/octet-stream`. They have no encoding and are sent and returned as they are.
