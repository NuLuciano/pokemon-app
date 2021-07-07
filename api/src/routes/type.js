const { Router } = require('express')
const { getMyTypes } = require('../controllers/type')
const router = Router();

router.get('/', getMyTypes )

module.exports = router;