docs-dev:
    pnpm -F @mastercookvn/docs dev

docs-build:
    pnpm -F @mastercookvn/docs build

format-docs:
    pnpm -F @mastercookvn/docs format

web-dev:
    pnpm -F @mastercookvn/web dev

web-format:
    pnpm -F @mastercookvn/web format

backend-dev:
    ./mvnw -B -ntp -pl backend spring-boot:run

backend-format:
    ./mvnw -B -ntp -pl backend spotless:apply

backend-check:
    ./mvnw -B -ntp -pl backend -am verify
