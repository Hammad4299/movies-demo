#build image
FROM node:20-alpine as build

#initializing app directory
WORKDIR /app
RUN chown -R node /app
COPY --chown=node ["./package.json","./yarn.lock", "./"]
USER node
ENV NODE_ENV production
RUN yarn install  --production=false

#creating project build
COPY --chown=node ["./tsconfig*.json", "./next.config.js", "./tailwind.config.ts", ".sequelizerc"  ,"./postcss.config.js" , "./"]
COPY --chown=node ["./public", "./public"]
COPY --chown=node ["./src", "./src"]
RUN yarn run build \
    && yarn install

# #creating actual image of the created build
FROM node:20-alpine
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --chown=nextjs:nodejs --from=build [ "/app/package.json","/app/yarn.lock", "/app/.sequelizerc", "./"]

COPY --from=build /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/.next/cache/images ./.next/static/cache/images
COPY --from=build --chown=nextjs:nodejs  ["/app/node_modules","./node_modules"]
USER nextjs
ENV NODE_ENV production
ENV PORT 3000
ENV PROJECT_ROOT /app
EXPOSE 3000
CMD node server.js