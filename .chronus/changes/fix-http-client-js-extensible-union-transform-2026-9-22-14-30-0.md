---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Transform an extensible union with the transform of its base variant, the variant that every other variant is assignable to. The transform used the first variant, so a union such as `union AB { A, T, B }`, where `A` is a union of string literals and `T` is a string scalar, emitted code that did not type-check.
