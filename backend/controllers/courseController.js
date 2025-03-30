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
    const { title, credits, description, start_date } = req.body;
    try {
    const course = await Course.create({ userId: req.user.id, title, credits, description, start_date });
    res.status(201).json(course);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

// update course
const updateCourse = async (
    req,
    res) => {
    const { title, credits, description, completed, start_date } = req.body;
    try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    course.title = title || course.title;
    course.credits = credits || course.credits;
    course.description = description || course.description;
    course.completed = completed ?? course.completed;
    course.start_date = start_date || course.start_date;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

// delete course
const deleteCourse = async (
    req,
    res) => {
    try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.remove();
    res.json({ message: 'Course deleted' });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };
    module.exports = { getCourses, addCourse, updateCourse, deleteCourse };