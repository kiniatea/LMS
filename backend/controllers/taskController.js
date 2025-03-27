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

// update course
const updateCourse = async (
    req,
    res) => {
    const { title, description, completed, deadline } = req.body;
    try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    course.title = title || course.title;
    course.description = description || course.description;
    course.completed = completed ?? course.completed;
    course.deadline = deadline || course.deadline;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };