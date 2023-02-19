const { Router } = require('express');
const FaqController = require('../controllers/faqController');

const router = Router();

router.get('/faqs', FaqController.getAll);

module.exports = router;
