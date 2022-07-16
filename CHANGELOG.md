# Changelog

## v3.1.0

- Updated Readme.md

## v3.0.0

### Breaking Changes

- Creating a cache store now doesn't require a type for the keys. It is assumed to be a string.

### Other Changes

- Setting store.set on a key that already exists will also override the value.
- Updates internal build dependencies

## v2.1.1

- Remove debug statements

## v2.1.0

- Better type assertions on store
- Bump dev deps

## v2.0.0

- Added support for UMD (Can directly run in the browser)
- Added support for CJS require
- **[Breaking Change]** Changed the output dir from `lib` to `dist`
- **[Breaking Change]** Added separate `esm` and `umd` builds
- **[Breaking Change]** Removed the `options.strategy` option
