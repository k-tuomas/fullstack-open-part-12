FROM node:16

RUN npm install --global nodemon

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*
  
USER node

CMD ["npm", "run", "dev"]