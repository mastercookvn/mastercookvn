# Backend development

Read the root `AGENTS.md` and `backend/README.md` as well as these instructions.

## Specification and scope

- Start with `docs/src/specification.md`, then the relevant use cases, class and sequence diagrams under `docs/src/diagrams/`. Cite the BR/UC identifiers that govern a change.
- Use an agreed API contract when one exists. The frontend's mocks, local storage and pricing tests are examples, not the backend specification. Resolve contradictions with the specification before implementation; phone/password authentication does not imply OTP.
- Keep documentation aligned with implemented behavior. Observe `docs/AGENTS.md` when changing docs, and never commit generated SVG diagrams.
- Implement one complete use case at a time. The class diagram describes the domain; it is not a request to generate every entity, repository or CRUD endpoint.

## Java and Spring

- Use the Java version in the root POM and mise configuration, the Maven wrapper, and the Spring Boot BOM. Check actual dependency versions before using APIs.
- Use Context7 for current Spring Boot, Spring Security, JPA and Flyway documentation. Resolve the library first and prefer version-matched documentation. Confirm imports against the resolved jars when documentation targets another version; Boot 4 has modularized starters and test packages.
- Keep code under `mastercookvn.mastercookvn`. Group new code by business feature, introducing controller/service/repository/DTO boundaries where needed rather than empty architectural layers.
- Prefer constructor injection. Keep controllers responsible for HTTP mapping and request validation; put business rules and transaction boundaries in services/domain code.
- Use request/response DTOs (records when appropriate), not JPA entities, at the HTTP boundary. Use Jakarta Bean Validation for request shape and explicit business checks for state transitions.
- Use a consistent Spring `ProblemDetail` error contract when introducing endpoints. Translate expected domain errors at the boundary, preserve useful diagnostics, and never swallow exceptions or expose internal stack traces to clients.
- Enforce role unions and record ownership on the server. Do not trust client-submitted roles, prices, payment status or resource availability.
- Keep atomic changes within a transaction. For capacity reservations, payments and monthly closing, explicitly design database constraints, locking and idempotency; application-side prechecks alone do not prevent concurrent conflicts.
- Avoid Lombok `@Data` on JPA entities; do not generate equality, string output or traversal across lazy relationships accidentally.

## Domain and persistence

- Follow the specification for UUID identifiers, statuses, historical snapshots and multi-meal contracts. Use enums/constants for stable domain values.
- Use `BigDecimal` for exact money, unit prices, quantities and ratios, with explicit scale/rounding at the specified business boundary. Do not use binary floating point or round intermediate calculations arbitrarily. VND amounts and the nearest-500 meal-total rule are defined in the specification.
- Model instants/time-zone-aware timestamps explicitly. Use `Asia/Ho_Chi_Minh` when deriving business dates/months, `YearMonth` for monthly periods, and an injectable `Clock` for time-dependent rules.
- Add versioned Flyway SQL under `src/main/resources/db/migration/` when schema changes are needed. Do not rewrite applied migrations. Keep Hibernate in validation mode for integration tests and use migrations as schema authority.
- Put uniqueness, referential integrity and essential invariants in PostgreSQL as well as validating requests. Keep migrations compatible with existing records and document any required backfill.

## Verification

- Add focused JUnit tests for actual domain behavior, especially rounding, deadline boundaries, transitions and idempotency. Prefer test-first for nontrivial rules; avoid tests that merely repeat accessors or framework behavior.
- Name DB-free unit and MVC/security slice tests `*Test` or `*Tests`. Use the existing test starters, `@WebMvcTest`/MockMvc for HTTP boundaries and Spring Security test support for allowed/denied/ownership cases as endpoints are added.
- Name PostgreSQL/full-context tests `*IT`, activate `integration-test`, and use the separate test database documented in the README. Use real PostgreSQL for migrations, constraints and locking; do not substitute H2 for these guarantees.
- When a use case needs concurrency guarantees, test competing transactions and retries against PostgreSQL. Keep test data isolated and repeatable; avoid relying on other tests' ordering or manual seed state.
- Run `just backend-format` and `just backend-check` for backend changes, plus `just backend-integration-test` for persistence/full-context changes. Do not report integration tests as covered by the DB-free check. Report commands run, results, and concrete blockers.
- Use the repository Prettier/lint/typecheck checks for affected JS/TS/configuration files before committing. Maven compilation is the Java type check; Spotless is the Java formatting gate.
