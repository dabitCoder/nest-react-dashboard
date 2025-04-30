FROM node:lts-alpine AS builder

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY backend/package.json backend/

RUN yarn workspaces focus --production backend

COPY . .

RUN yarn workspace backend build

FROM node:20-alpine

RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app

COPY --from=builder /app/node_modules   ./node_modules
COPY --from=builder /app/backend/dist   ./dist
COPY --from=builder /app/backend/package.json ./

COPY backend/docker-entrypoint.sh /usr/local/bin/


EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT ["docker-entrypoint.sh"]
