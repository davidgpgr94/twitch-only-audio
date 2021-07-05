const GetTwitchVodAudioCommand = require('../../../application/get-twitch-vod-audio/get-twitch-vod-audio-command');

module.exports = ({ router, container }) => {
  router.get('/:vodId', async (req, res, next) => {
    const { vodId } = req.params;
    console.log(`Getting audio from the video ${vodId}...`);

    const getTwitchVodAudio = container.resolve('GetTwitchVodAudio');
    const getTwitchVodAudioCommand = new GetTwitchVodAudioCommand({ vodId });

    try {
      const { audioStream } = await getTwitchVodAudio.getAudio(getTwitchVodAudioCommand);

      audioStream.pipe(res);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: err });
    }
  });

  return router;
}
