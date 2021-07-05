const express = require('express');
const cors = require('cors');

const twitchAudioEndpoint = require('./endpoints/twitch-audio');

module.exports = ({ container }) => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  const router = express.Router();

  app.use('/favicon.ico', (req, res) => {
    return res.status(204).send();
  });

  app.use('/health-check', (req, res) => {
    res.status(200).json({ msg: 'ok' });
  });

  app.use('/', twitchAudioEndpoint({ router, container }));

  app.use('/*', (req, res, next) => {
    return res.status(404).send({ error: 'Route not found' });
  })

  app.use((error, req, res, next) => {
    console.error(error.stack);

    return res.status(500).json({ error: error.message });
  });

  const port = container.resolve('serverPort');
  const server = app.listen(port, () => {
    console.log(`TwitchOnlyAudio server running on port ${port}`)
  })
  return {
    app,
    server
  }
}
