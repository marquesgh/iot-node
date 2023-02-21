const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3001;

routes(app);
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`server is running on port ${port}`));
}

module.exports = app;
