const bodyParser = require('body-parser');

//routes
const faqs = require('./faqsRoute');
const equipments = require('./equipmentsRoute');
const messages = require('./messagesRoute');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(faqs);
  app.use(equipments);
  app.use(messages);
};
