FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# FROM base AS build
# ENV NODE_ENV=production
# RUN npm run build

# FROM node:20-alpine AS production
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/package.json ./package.json
# COPY --from=build /app/node_modules ./node_modules
# EXPOSE 3000
# CMD ["npm", "run", "start"]