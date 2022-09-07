const { Router } = require('express')
const auth = require("../app/middleware/authenticate")
const { isAdmin } = require("../app/middleware/checkRole")
const ReportTypeController = require('../app/controllers/ReportTypeController')
const ReportController = require('../app/controllers/ReportController')
const upload = require('../config/multer')
const router = Router();

router.get('/report-types', [auth], ReportTypeController.index)
router.post('/report-types', [auth, isAdmin], ReportTypeController.create)
router.get('/report-types/:id', [auth], ReportTypeController.show)
router.put('/report-types/:id', [auth, isAdmin], ReportTypeController.update)
router.delete('/report-types/:id', [auth, isAdmin], ReportTypeController.destroy)

router.get('/reports', [auth], ReportController.index)
router.post('/reports', [auth, upload.single('evidence')], ReportController.create)
router.get('/reports/:id', [auth], ReportController.show)
// router.put('/reports/:id', [auth], ReportController.update)
// router.delete('/reports/:id', [auth, isAdmin], ReportController.destroy)
router.get('/reports/:id/approve', [auth, isAdmin], ReportController.approve)
router.get('/reports/:id/reject', [auth, isAdmin], ReportController.reject)

module.exports = router