
const GetTwitchVodAudioResponse = require('./get-twitch-vod-audio-response');

class GetTwitchVodAudio {

  constructor({audioStream, twitchClient, videoConverter}) {
    this.audioStream = audioStream;
    this.twitchClient = twitchClient;
    this.videoConverter = videoConverter;
  }

  /**
   * @throws {BeginAudioInvalidFormat}
   */
  async getAudio({ vodId, begin }) {
    const vodUrl = await this.twitchClient.getAudioVodUrl(vodId);
    const videoStream = this.audioStream.createFromUrl(vodUrl, begin);

    const audioStream = this.videoConverter.toMp3Stream(videoStream);

    return new GetTwitchVodAudioResponse({ audioStream });
  }

}

module.exports = GetTwitchVodAudio;
