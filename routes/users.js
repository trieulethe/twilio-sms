var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
// router.get('/', userController.verify);
router.post('/', userController.register);

module.exports = router;
