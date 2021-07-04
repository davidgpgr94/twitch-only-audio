const twitchM3u8 = require('twitch-m3u8');

class TwitchM3u8 {
  getVod(vodId) {
    return twitchM3u8.getVod(vodId);
  }
}

module.exports = TwitchM3u8;
