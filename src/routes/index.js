const bodyParser = require('body-parser');

//routes
const faqs = require('./faqsRoute');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(faqs);
};
