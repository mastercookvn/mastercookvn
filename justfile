docs-dev:
    pnpm -F @mastercookvn/docs dev

docs-build:
    pnpm -F @mastercookvn/docs build

dev-web:
    pnpm -F @mastercookvn/web dev

backend-dev:
    ./mvnw -B -ntp -pl backend spring-boot:run

backend-format:
    ./mvnw -B -ntp -pl backend spotless:apply

backend-check:
    ./mvnw -B -ntp -pl backend -am verify


