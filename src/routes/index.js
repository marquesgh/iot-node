const bodyParser = require('body-parser');

//routes
const faqs = require('./faqsRoute');
const equipments = require('./equipmentsRoute');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(faqs);
  app.use(equipments);
};
