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
- Ensure do not commit any generated svg diagrams

## Technologies

- Both frontend and backend are developed with local running process, not docker
- Prefer test driven development, but skip if not worth to test, or too obvious to test
- Each sub projects have their own `AGENTS.md`, should be maintained and synchronized, briefly, cohesive, comprehensive

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
- Might use variable and function name in vietnamese, not english
- Use pnpm workspace, packages catalog, in `pnpm-workspace.yaml`, `pnpm dlx` over npx
- Do not wrap small/obvious logic (error handling, simple mapping) into a function, inline it for readability
- **No writing unnecessary comments** in the code
- If something is not worth to code/fix, but might have issue in the future, then comments
- Prefer breakline for human readable, over one-line; code, naming convention over saving token because human still maintain the source code
- Do not swallow errors/exceptions in code, always log, or throw/return to caller
- Constant/enum Some over hard string (e.g. concurrency `VND`, `USD`, or others), easier for expansion, testing, type safety
- Maintainable over fast, technical debt
- Do prettier, ... lint, typecheck on every before committing
