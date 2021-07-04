const awilix = require('awilix');

// third-part packages
const m3u8stream = require('m3u8stream');
const ffmpeg = require('fluent-ffmpeg');

// application
const GetTwitchVodAudio = require('./application/get-twitch-vod-audio');

// domain
const AudioStream = require('./domain/services/audio-stream');
const TwitchClient = require('./domain/services/twitch-client');

// infrastructure
const TwitchM3u8 = require('./infrastructure/twitch/twitch-m3u8');
const { ServerConfig } = require('./infrastructure/config');
const FfmpegVideoConverter = require('./infrastructure/services/ffmpeg-video-converter');

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({

    // application
    GetTwitchVodAudio: awilix.asClass(GetTwitchVodAudio),

    // domain
    audioStream: awilix.asClass(AudioStream),
    twitchClient: awilix.asClass(TwitchClient),
    videoConverter: awilix.asClass(FfmpegVideoConverter),

    // infrastructure
    twitchM3u8: awilix.asClass(TwitchM3u8),
    serverPort: awilix.asValue(ServerConfig.port),

    // third-part packages
    streamGenerator: awilix.asValue(m3u8stream),
    ffmpegApi: awilix.asValue(ffmpeg),
  });

  return container;
}



module.exports = {
  createContainer
};
