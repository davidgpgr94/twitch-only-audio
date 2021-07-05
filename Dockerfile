FROM node:fermium-alpine3.11

RUN apk add --no-cache ffmpeg

ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV FFPROBE_PATH=/usr/bin/ffprobe

USER node
WORKDIR /home/node

COPY package*.json .
RUN npm install
COPY src ./src

CMD ["npm", "start"]
