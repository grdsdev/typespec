---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Make the client `credential` parameter optional when every operation of the client accepts `NoAuth`, for example with `@useAuth(BearerAuth | NoAuth)`. Without a credential, the client sends no authentication header.
