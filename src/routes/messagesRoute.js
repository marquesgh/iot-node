const { Router } = require('express');
const MessageController = require('../controllers/messageController');

const router = Router();

router.post('/store', MessageController.store);

module.exports = router;
