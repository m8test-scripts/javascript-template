# 01: Adopt self-contained APK defaults for JavaScript

**What to build:** This template produces an APK that includes the Runtime Extensions its script declares by default, and explains how the author can explicitly choose runtime dependency delivery instead.

**Blocked by:** 01: Expose default-on APK Extension bundling.

**Status:** claimed

- [ ] The template uses the default-on APK bundling behavior without forcing bundling for ordinary project runs.
- [ ] The template documentation explains that default APKs can run offline and documents the explicit opt-out trade-off.
- [ ] Generated build source preserves the default behavior for this language.
- [ ] An opt-out configuration for this template omits bundled Extension APKs while retaining runtime dependency declarations.
- [ ] Template build verification confirms the produced APK contains only this script's declared Extension dependencies.
