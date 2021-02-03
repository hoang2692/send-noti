const express = require('express')
const router = express();
const testControllers = require('../Controllers/Testontroller');
const authMana = require('../../middleware/authManager')
router.post('/test/create/:id',testControllers.create)
router.get('/tests', testControllers.getAll)
router.post('/test/addQuestion/:idTest', testControllers.addQuestion)
router.delete('/test/delete/:id', testControllers.deleteOne)
router.post('/test/deleteMany', testControllers.deleteMany)
module.exports = router;