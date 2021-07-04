require('dotenv').config();

const { createContainer } = require('./container');
const startApiServer = require('./infrastructure/server/server');

(async () => {
  const container = await createContainer();

  startApiServer({ container });
})();
