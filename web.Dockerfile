FROM node:26.13.0-alpine3.23 AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY web/.next/standalone ./
COPY web/public ./web/public
COPY web/.next/static ./web/.next/static

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

ENTRYPOINT ["node", "web/server.js"]
