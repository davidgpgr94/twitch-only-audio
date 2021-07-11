const DomainError = require('./domain-error');

class BeginAudioInvalidFormat extends DomainError {
  constructor(expected, given) {
    super(`The begin audio input has a invalid format, expected "${expected}" and give "${given}"`);

    this.data = { expected, given };
  }
}

module.exports = BeginAudioInvalidFormat;
