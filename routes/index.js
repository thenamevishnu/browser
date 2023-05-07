const express = require('express');
const router = express.Router();
const controller = require("../controller/indexController")

router.get('/', controller.index);
router.get("/search", controller.search)

router.post("/search", controller.searchPost)

module.exports = router;
