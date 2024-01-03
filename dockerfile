FROM node:latest

WORKDIR /src

COPY . .

COPY ./.env ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 8081

CMD ["npm", "run", "start:dev"]