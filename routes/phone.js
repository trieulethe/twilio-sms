var express = require('express');
var router = express.Router();
const phoneController = require("../controllers/phoneController");

/* GET users listing. */
router.post('/', phoneController.register);
router.post('/verify', phoneController.verify);

module.exports = router;
