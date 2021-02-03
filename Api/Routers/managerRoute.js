const express = require('express')
const router = express();
const managerControllers = require('../Controllers/managerController');
const auth = require('../../middleware/authManager')

router.get('/managers',managerControllers.getAll)

router.post('/manager/create',managerControllers.create)

router.put('/manager/update/:id',managerControllers.update)

router.post('/manager/login',managerControllers.login);

router.post('/manager/logout',auth,managerControllers.logout);

router.post('/manager/logoutall',auth,managerControllers.logoutall);

router.get('/manager/profile/:id',managerControllers.getOne);

router.delete('/manager/delete/:id', managerControllers.deleteOne)

router.post('/manager/deleteMany', managerControllers.deleteMany)

module.exports = router;