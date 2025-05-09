FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json ./

RUN npm ci --legacy-peer-deps

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run postinstall

RUN npm run lint-fix

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/prisma prisma

EXPOSE 3000

CMD ["npm", "start"]
