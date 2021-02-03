const express = require('express')
const router = express();
const notificationControllers = require('../Controllers/notification/notification');
router.post('/sendAll',notificationControllers.sendToAll)

module.exports = router;