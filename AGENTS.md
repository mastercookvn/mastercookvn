# MastercookVN

Vietnamese Catering service web app

## Structure

```
docs/                     # Vitepress Documentation (business spec, use cases, class, sequence, architecture diagrams, database, etc.)
web/                      # Frontend
backend/                  # Backend
pom.xml                   # Maven root pom.xml
package.json
tsconfig.json             # tsconfig monorepo
tsconfig.base.json
```

## Docs

- Should read and use this as source of specification, always reflect the current state of the system
- Do not introduce new concepts, business rules that are out of scope, not in docs with no asking and confirmation
- Docs is the contract, the specification, always
- Ensure do not commit any generated svg diagrams

## Technologies

- Both frontend and backend are developed with local running process, not docker
- Prefer test driven development, but skip if not worth to test, or too obvious to test
- Each sub projects have their own `AGENTS.md`, should be maintained and synchronized, briefly, cohesive, comprehensive
- Writing code should use English terminologies, docs might preserve Vietnamese for user-facing content

### Tool chains

- Mise manages packages

### Frontend

- NextJS 16, React 19, TailwindCSS
- Pnpm
- If you wish to read nextjs documentation (new nextjs version, not the old you have been trained),
  read in `node_modules/next/dist/docs/`

### Backend

- Java 27, Spring Boot 4.1.2
- Maven

## Rules

- Use convetional commits, scope allowed (docs, web, backend, repo), others are not
- Use English domain names, identifiers and enum values consistently with the docs; keep user-facing content in Vietnamese
- Use pnpm workspace, packages catalog, in `pnpm-workspace.yaml`, `pnpm dlx` over npx
- Do not wrap small/obvious logic (error handling, simple mapping) into a function, inline it for readability
- **No writing unnecessary comments** in the code
- If something is not worth to code/fix, but might have issue in the future, then comments
- Prefer breakline for human readable, over one-line; code, naming convention over saving token because human still maintain the source code
- Do not swallow errors/exceptions in code, always log, or throw/return to caller
- Constant/enum Some over hard string (e.g. concurrency `VND`, `USD`, or others), easier for expansion, testing, type safety
- Maintainable over fast, technical debt
- Do prettier, ... lint, typecheck on every before committing

<!-- CODEGRAPH_START -->

## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `pnpm exec codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, auto init with `pnpm exec codegraph init`
<!-- CODEGRAPH_END -->
