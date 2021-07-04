
const VodQualityRating = {
  'Audio Only': 10,
  '160': 11,
  '360': 9,
  '480': 8,
  '720': 2,
  '1080': 1,
  'Source': 0
}

class TwitchClient {
  constructor({ twitchM3u8 }) {
    this._twitchM3u8 = twitchM3u8;
  }

  async getAudioVodUrl(vodId) {
    const vods = await this._twitchM3u8.getVod(vodId);
    const vodForAudio = this._getBetterAudioVodForOnlyAudio(vods);

    return vodForAudio.url;
  }

  _getBetterAudioVodForOnlyAudio(vods) {
    let betterAudioVodForOnlyAudio = vods[vods.length - 1];

    for (const vod of vods) {
      const { quality:twitchQuality, resolution, url } = vod;
      const quality = twitchQuality.split('p')[0];
      const rating = VodQualityRating[quality];

      const betterAudioVodForOnlyAudioQuality = betterAudioVodForOnlyAudio.quality.split('p')[0];
      const betterAudioVodForOnlyAudioQualityRating = VodQualityRating[betterAudioVodForOnlyAudioQuality];

      if (rating < betterAudioVodForOnlyAudioQualityRating) {
        betterAudioVodForOnlyAudio = { ...vod };
      }
    }

    return betterAudioVodForOnlyAudio;
  }

}

module.exports = TwitchClient;
