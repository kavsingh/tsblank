# syntax=docker/dockerfile:1

# base

FROM node:26-alpine AS base

WORKDIR /repo

COPY package.json pnpm-*.yaml tsconfig.json tsconfig.*.json  ./
COPY vite.config.ts index.html ./
COPY src/ ./src/

RUN npm install -g corepack
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile --ignore-scripts

# dev mode

FROM base AS dev

EXPOSE 5173

# build

FROM base AS build

RUN pnpm run build

# host static build

FROM nginx:alpine AS prod

COPY --from=build /repo/dist /usr/share/nginx/html

EXPOSE 80
