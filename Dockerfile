FROM node:21-alpine3.17

LABEL authors="abritom93"

WORKDIR /app

COPY . .

RUN cd /app/client && npm i && npm run build

RUN cd /app/server && npm i

EXPOSE 8080

ENTRYPOINT ["node", "/app/server/index.jsx"]