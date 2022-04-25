const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./dashboard-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;