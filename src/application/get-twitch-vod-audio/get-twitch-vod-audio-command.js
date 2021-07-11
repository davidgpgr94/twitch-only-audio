class GetTwitchVodAudioCommand {
  constructor({ vodId, begin }) {
    this._vodId = vodId;
    this._begin = begin;
  }

  get vodId() {
    return this._vodId;
  }

  get begin() {
    return this._begin;
  }
}

module.exports = GetTwitchVodAudioCommand;
