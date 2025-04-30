FROM node:lts-alpine AS builder
RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY frontend/package.json frontend/

# I have to add all dependencies here because for some reason docker complains of missing types on the build stage with
# production only dependencies. If  you try to run yarn workspace focus frontend build, it will work with no issues
RUN yarn workspaces focus --all frontend

COPY . .
RUN yarn workspace frontend build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY frontend/nginx.default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
