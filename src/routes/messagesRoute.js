const { Router } = require('express');
const MessageController = require('../controllers/messageController');

const router = Router();

router.post('/messages/store', MessageController.store);
router.get('/messages', MessageController.getAll);

module.exports = router;
