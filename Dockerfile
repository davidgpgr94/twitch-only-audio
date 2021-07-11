FROM node:fermium-alpine3.11

RUN apk add --no-cache ffmpeg

ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV FFPROBE_PATH=/usr/bin/ffprobe

WORKDIR /app

COPY package*.json .
RUN npm install
COPY src ./src
COPY pm2.json .

RUN npm install pm2

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# CMD ["pm2-runtime", "start", "pm2.json"]
CMD ["npm", "run", "start:heroku"]
