const express = require('express')
const router = express();
const customerControllers = require('../Controllers/customerController');
const auth = require('../../middleware/authCustomer')
const authMana = require('../../middleware/authManager')

router.post('/customers',authMana,customerControllers.getAll);

router.post('/customer/deleteMany',authMana,customerControllers.deleteMany)

router.post('/customer/:id',authMana,customerControllers.getOne);

router.post('/customer/create',customerControllers.create)

router.post('/manager/customer/create',authMana,customerControllers.create)

router.post('/customer/login',customerControllers.login);

router.post('/customer/logout',auth,customerControllers.logout);

router.post('/customer/logoutall',auth,customerControllers.logoutall);

router.delete('/delete/:id',authMana,customerControllers.deleteOne)

router.put('/customers/update/:id',customerControllers.update);

module.exports = router;