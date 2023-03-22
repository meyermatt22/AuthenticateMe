
const express = require('express');
const router = express.Router();


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

const apiRouter = require('./api');

router.use('/api', apiRouter);
// router.use('/api', )

module.exports = router;
