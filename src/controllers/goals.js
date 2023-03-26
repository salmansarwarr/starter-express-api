const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");
const userModel = require("../models/userModel");

// @desc: Get goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc: Set goals
// @route: POST /api/goals
// @access: Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        // return res.status(400).json({msg: "Please add a text field"})
        throw new Error("Please add a text field");
    }
    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json(goal);
});

// @desc: Update goals
// @route: PUT /api/goals/:id
// @access: Private
const updateGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await goalModel.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    console.log(goal, updatedGoal);
    res.status(200).json(updatedGoal);
});

// @desc: Delete goals
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await goalModel.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    await goal.remove();
    res.status(200).json({ id });
});

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
};
