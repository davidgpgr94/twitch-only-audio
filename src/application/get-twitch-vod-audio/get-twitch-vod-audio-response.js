class GetTwitchVodAudioResponse {
  constructor({ audioStream }) {
    this._audioStream = audioStream;
  }

  get audioStream() {
    return this._audioStream;
  }
}

module.exports = GetTwitchVodAudioResponse;
