const { BeginAudioInvalidFormat } = require('../../../domain/errors');

const GetTwitchVodAudioCommand = require('../../../application/get-twitch-vod-audio/get-twitch-vod-audio-command');

module.exports = ({ router, container }) => {
  router.get('/:vodId', async (req, res, next) => {
    const { vodId } = req.params;
    const { s:begin } = req.query;
    console.log(`Getting audio from the video ${vodId}...`);

    const getTwitchVodAudio = container.resolve('GetTwitchVodAudio');
    const getTwitchVodAudioCommand = new GetTwitchVodAudioCommand({ vodId, begin });

    try {
      const { audioStream } = await getTwitchVodAudio.getAudio(getTwitchVodAudioCommand);

      audioStream.pipe(res);
    } catch (err) {
      console.error(err);
      if (err instanceof BeginAudioInvalidFormat) {
        return res.status(400).send({ error: err.message });
      }
      return res.status(500).send({ error: err });
    }
  });

  return router;
}
