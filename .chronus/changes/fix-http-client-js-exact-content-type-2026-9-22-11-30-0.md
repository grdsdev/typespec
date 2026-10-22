---
changeKind: fix
packages:
  - "@typespec/http-client-js"
---

Match response content types exactly. The client compared the `Content-Type` header with `includes()`, so a media type parameter that contains another media type, such as `text/plain; for="application/json"`, selected the wrong branch. The client now compares the media type before `;`, case-insensitively.
