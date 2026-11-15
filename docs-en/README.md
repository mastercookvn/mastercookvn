# MasterCookVN English Documentation

This package is the English review copy of the maintained documentation in `../docs`.

- The Vietnamese documentation remains the source for page-by-page comparison.
- Filenames and relative links intentionally match the Vietnamese source.
- Business rules and identifiers such as `BR*`, `UC-*`, and `TS*` must remain equivalent.
- Terminology follows the existing English names in `../web` where available, while the documentation remains the authority for behaviour.

## Local commands

Run from the repository root:

```bash
pnpm --filter @mastercookvn/docs-en dev
pnpm --filter @mastercookvn/docs-en build
pnpm --filter @mastercookvn/docs-en preview
```