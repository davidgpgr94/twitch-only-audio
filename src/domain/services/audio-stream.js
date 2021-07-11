const { BeginAudioInvalidFormat } = require('../errors');

class AudioStream {
  static beginFormatsRegex = {
    hms: /^(\d+h)?(\d{1,2}m)?(\d{1,2}s)?$/,
    doubleDots: /^(\d+:)?(\d{1,2}:)(\d{1,2})$/
  }

  constructor({ streamGenerator }) {
    this._streamGenerator = streamGenerator;
  }

  /**
   * @throws {BeginAudioInvalidFormat}
   */
  createFromUrl(url, begin) {
    if (begin) {
      this._ensureValidBeginFormat(begin);
      return this._streamGenerator(url, { begin });
    }
    return this._streamGenerator(url);
  }

  _ensureValidBeginFormat(begin) {
    if (!this._hasValidHMSFormat(begin) && !this._hasValidDoubleDotFormat(begin)) {
      throw new BeginAudioInvalidFormat('XXhYYmZZs or HH:mm:ss', begin);
    }
  }

  _hasValidHMSFormat(begin) {
    return AudioStream.beginFormatsRegex.hms.test(begin);
  }

  _hasValidDoubleDotFormat(begin) {
    return AudioStream.beginFormatsRegex.doubleDots.test(begin);
  }
}

module.exports = AudioStream;
