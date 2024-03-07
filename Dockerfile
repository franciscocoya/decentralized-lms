FROM node:20.9.0
LABEL org.opencontainers.image.source https://github.com/franciscocoya/decentralized-lms
COPY . /app
WORKDIR /app

RUN npm install

RUN npm run build

CMD ["npm", "start"]
