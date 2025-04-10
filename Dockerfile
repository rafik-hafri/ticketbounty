FROM node:22-alpine AS base

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY . .

RUN npm install -g npm@latest && npm install --legacy-peer-deps

RUN npm run postinstall

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=base /app/.next .next
COPY --from=base /app/public public
COPY --from=base /app/node_modules node_modules
COPY --from=base /app/package.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
