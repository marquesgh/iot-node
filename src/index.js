const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`server is running on port ${port}`));
}

module.exports = app;
