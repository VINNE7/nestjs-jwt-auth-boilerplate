# fase base para todas as outras fases
FROM node:lts AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app 
WORKDIR /home/node/app 
USER node 

# fase para reaproveitar com o docker-compose de dev
FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm i
COPY --chown=node:node . .

FROM dependencies AS build
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm i --omit=dev 
COPY --chown=node:node --from=build /home/node/app/dist .
EXPOSE $PORT
CMD [ "node", "main.js" ]