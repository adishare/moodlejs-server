const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const Course = require ('../models').Course;
const CourseCategory = require ('../models').CourseCategory;

module.exports = {
    /**
     * Routes different types of search for the model
     * @param {*} req 
     * @param {*} res 
     */
    async searchRecords(req, res){
        var options = utils.getSearchOptions(req);
        switch(options.field){
            case 'any': {
                this.paginatedList(res, options);
                break;
            }
            default:{
                logger.error('Searching on Course with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await Course.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await Course.findAndCountAll({
                where: {
                    [ options.field ]: { [Op.like]: '%' + options.value + '%' }
                },
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({
                error: false,
                total: results.count,
                records: results.rows
            });
        } catch (error) {
            logger.error('Paginated like search on Course with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        console.log(req.body);
        try {
            const result = await Course.create({
                category: req.body.category,
                sortorder: req.body.sortorder,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                marker: req.body.marker,
                maxbytes: req.body.maxbytes,
                defaultgroupingid: req.body.defaultgroupingid,
                timecreated: req.body.timecreated || new Date().getTime(),
                timemodified: req.body.timemodified || new Date().getTime(),
                cacherev: req.body.cacherev,
                visible: req.body.visible,
                visibleold: req.body.visibleold,
                requested: req.body.requested,
                enablecompletion: req.body.enablecompletion,
                completionnotify: req.body.completionnotify,
                summary: req.body.summary,
                newsitems: req.body.newsitems,
                legacyfiles: req.body.legacyfiles,
                showreports: req.body.showreports,
                groupmode: req.body.groupmode,
                groupmodeforce: req.body.groupmodeforce,
                summaryformat: req.body.summaryformat,
                showgrades: req.body.showgrades,
                fullname: req.body.fullname,
                shortname: req.body.shortname,
                idnumber: req.body.idnumber,
                format: req.body.format,
                lang: req.body.lang,
                calendartype: req.body.calendartype,
                theme: req.body.theme,
                courseId: req.body.courseId,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await Course.update(
                {
                    category: req.body.category,
                    sortorder: req.body.sortorder,
                    startdate: req.body.startdate,
                    enddate: req.body.enddate,
                    marker: req.body.marker,
                    maxbytes: req.body.maxbytes,
                    defaultgroupingid: req.body.defaultgroupingid,
                    timecreated: req.body.timecreated,
                    timemodified: req.body.timemodified,
                    cacherev: req.body.cacherev,
                    visible: req.body.visible,
                    visibleold: req.body.visibleold,
                    requested: req.body.requested,
                    enablecompletion: req.body.enablecompletion,
                    completionnotify: req.body.completionnotify,
                    summary: req.body.summary,
                    newsitems: req.body.newsitems,
                    legacyfiles: req.body.legacyfiles,
                    showreports: req.body.showreports,
                    groupmode: req.body.groupmode,
                    groupmodeforce: req.body.groupmodeforce,
                    summaryformat: req.body.summaryformat,
                    showgrades: req.body.showgrades,
                    fullname: req.body.fullname,
                    shortname: req.body.shortname,
                    idnumber: req.body.idnumber,
                    format: req.body.format,
                    lang: req.body.lang,
                    calendartype: req.body.calendartype,
                    theme: req.body.theme,
                    courseId: req.body.courseId,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await Course.findOne({
                where: { id: req.params.id },
                include: [
                    { model: CourseCategory }, // load all pictures
                ]
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await Course.findAll({
                include: [
                    { model: CourseCategory }, 
                ]
            });
            console.log(results);
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await Course.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on Course with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};