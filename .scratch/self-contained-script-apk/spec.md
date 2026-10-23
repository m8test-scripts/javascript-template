## Problem Statement

A JavaScript script APK may be built without carrying the Runtime Extensions required by its script. A fresh installation then depends on network access before the script can run.

## Solution

This template uses the default-on APK dependency bundling behavior. Authors can explicitly disable it when they accept the need to provide missing Extensions at runtime.

## User Stories

1. As a JavaScript script author, I want the APK to include the Runtime Extensions my script declares, so that a fresh installation can run offline.
2. As a JavaScript script author, I want unrelated installed Extensions excluded, so that the APK only contains artifacts needed by my script.
3. As a JavaScript script author, I want to opt out of bundling, so that I can choose a smaller APK when I provide dependencies another way.
4. As a JavaScript script author, I want the template documentation to explain the offline behavior and opt-out, so that I can choose the right distribution mode.

## Implementation Decisions

- The template uses the default enabled APK dependency-bundling option.
- Dependency selection follows the script's declared runtime Extension dependency closure.
- An explicit opt-out leaves dependency acquisition to the runtime environment.
- Template instructions describe only this template's own configuration and usage.

## Testing Decisions

- Verify the template's generated build source carries the default bundling behavior.
- Build an APK using this template and inspect the embedded project archive for the declared runtime dependencies.
- Verify explicit opt-out omits Extension APK payloads while retaining the script dependency declarations.
- For the canary script, install the APK into a clean application state with networking unavailable, execute the script, and assert its externally observable Extension behavior.

## Out of Scope

- Changing this language's script API or runtime implementation.
- Bundling Extensions not declared by the script.
- Changing APK identity, signing, or launch behavior.

## Further Notes

A fresh offline installation is guaranteed only when dependency bundling is enabled. With bundling disabled, missing artifacts must be available to the application or resolvable from a reachable Maven repository.
