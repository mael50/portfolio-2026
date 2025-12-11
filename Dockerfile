ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

FROM base as build

COPY package.json package-lock.json ./

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y python3 make g++

RUN npm ci

COPY . .

RUN npm run build

FROM base

COPY --from=build /app/.output /app/.output

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
