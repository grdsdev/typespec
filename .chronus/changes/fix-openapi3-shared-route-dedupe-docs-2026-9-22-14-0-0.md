---
changeKind: fix
packages:
  - "@typespec/openapi3"
---

Do not repeat identical summaries and descriptions when merging `@sharedRoute` operations. Different values are still joined.
