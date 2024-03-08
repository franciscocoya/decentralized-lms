FROM node:20.9.0
LABEL org.opencontainers.image.source https://github.com/franciscocoya/decentralized-lms
COPY . /app
WORKDIR /app

EXPOSE 4000

RUN npm install

RUN npm run build


