#Base Stage
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json .
COPY . .

#Development Stage
FROM base AS dev

ENV NODE_ENV=development
RUN npm i
CMD npm run dev



#Production Stage
FROM base AS prod

#SET OWNER FIRST FOR FAST REBUILD
RUN chown -R node:node /app
COPY package*.json /app
RUN npm ci --only=production
RUN npx prisma db push

#Change directory ownership
USER node
ENV NODE_ENV=production
CMD npm start