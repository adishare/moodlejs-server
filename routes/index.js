var models  = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../utils');
var apiVersion = '1.0.0';

//Required routes
const UserRoute = require('./User');
const CourseRoute = require('./Course');
const CourseCategoryRoute = require('./CourseCategory');
const EnrolRoute = require('./Enrol');
const UserEnrolmentRoute = require('./UserEnrolment');

//Registered routes
router.use('/users', UserRoute);
router.use('/courses', CourseRoute);
router.use('/courseCategories', CourseCategoryRoute);
router.use('/enrols', EnrolRoute);
router.use('/userEnrolments', UserEnrolmentRoute);

//API start
router.get('/', function(req, res) {
    res.status(200).send({
        message: 'Welcome to the  API - v' + apiVersion,
    });
});

module.exports = router;