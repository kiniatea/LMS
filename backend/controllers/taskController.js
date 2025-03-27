// get course (read)
const Course = require('../models/Course');
const getCourses = async (
req,
res) => {
try {
const courses = await Course.find({ userId: req.user.id });
res.json(courses);
} catch (error) {
res.status(500).json({ message: error.message });
}}

// add course
const addCourse = async (
    req,
    res) => {
    const { title, description, deadline } = req.body;
    try {
    const course = await Course.create({ userId: req.user.id, title, description, deadline });
    res.status(201).json(course);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };