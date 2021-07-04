class GetTwitchVodAudioCommand {
  constructor({ vodId }) {
    this._vodId = vodId;
  }

  get vodId() {
    return this._vodId;
  }
}

module.exports = GetTwitchVodAudioCommand;
