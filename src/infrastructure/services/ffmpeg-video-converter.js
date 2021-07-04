const VideoConverter = require('../../domain/services/video-converter');

const ffmpeg = require('fluent-ffmpeg');

class FfmpegVideoConverter extends VideoConverter {
  constructor({ ffmpegApi }) {
    super();
    this.ffmpegApi = ffmpegApi;
  }

  toMp3Stream(input) {
    return ffmpeg(input).format('mp3').writeToStream(undefined, { end: true });
  }
}

module.exports = FfmpegVideoConverter;
