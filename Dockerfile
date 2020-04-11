FROM keymetrics/pm2:12-alpine

WORKDIR /app

# Usefull tools
RUN apk add bash mc

COPY . .

RUN rm -rf node_modules

COPY package*.json ./

RUN yarn --production

COPY ./pm2.config.js .

COPY app.js .
COPY ./src ./

CMD [ "pm2-runtime", "pm2.config.js" ]