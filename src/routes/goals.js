const express = require('express');
const {getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goals');
const router = express.Router();
const {protect} = require("../middleware/auth")

router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;