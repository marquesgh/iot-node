const { Router } = require('express');
const EquipmentController = require('../controllers/equipmentController');

const router = Router();

router.get('/equipment-active', EquipmentController.getActive);
router.get('/equipment-status', EquipmentController.getStatus);
router.get('/equipment-situation', EquipmentController.getSituation);

module.exports = router;
