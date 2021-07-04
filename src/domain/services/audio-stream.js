class AudioStream {
  constructor({ streamGenerator }) {
    this._streamGenerator = streamGenerator;
  }

  createFromUrl(url) {
    return this._streamGenerator(url);
  }
}

module.exports = AudioStream;
