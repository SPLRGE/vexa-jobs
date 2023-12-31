ARG NODE_IMAGE=node:lts-alpine

# -- PREPARE IMAGE --
FROM $NODE_IMAGE AS prepare
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g pnpm
USER node

# -- INSTALL DEPENCIES --
FROM prepare AS dependencies
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .

# -- BUILD --
FROM dependencies AS build
RUN pnpm run build

# -- PROD --
FROM prepare as prod
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node --from=build /home/node/app/.output .
COPY --chown=node:node bin/ bin/
CMD ["/bin/sh", "-c", "pnpm run migrate:deploy;dumb-init node .output/server/index.mjs"]
