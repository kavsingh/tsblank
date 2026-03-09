# syntax=docker/dockerfile:1

# base

FROM oven/bun:latest AS base

WORKDIR /repo

COPY package.json bun.lock tsconfig.json tsconfig.*.json  ./
COPY vite.config.ts index.html ./
COPY src/ ./src/

RUN --mount=type=cache,id=bun,target=/root/.local/share/bun/store \
	bun install --frozen-lockfile

# dev mode

FROM base AS dev

EXPOSE 5173

# build

FROM base AS build

RUN --mount=type=cache,id=bun,target=/root/.local/share/bun/store \
	bun run build

# host static build

FROM nginx:alpine AS prod

COPY --from=build /repo/dist /usr/share/nginx/html

EXPOSE 80
