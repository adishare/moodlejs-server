const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
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
                logger.error('Searching on CourseCategory with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await CourseCategory.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await CourseCategory.findAndCountAll({
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
            logger.error('Paginated like search on CourseCategory with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await CourseCategory.create({
                name: req.body.name,
                idnumber: req.body.idnumber,
                description: req.body.description,
                descriptionformat: req.body.descriptionformat,
                parent: req.body.parent,
                sortorder: req.body.sortorder,
                coursecount: req.body.coursecount,
                visible: req.body.visible,
                visibleold: req.body.visibleold,
                timemodified: req.body.timemodified,
                depth: req.body.depth,
                path: req.body.path,
                theme: req.body.theme,
                category: req.body.category,
                parent: req.body.parent,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await CourseCategory.update(
                {
                    name: req.body.name,
                    idnumber: req.body.idnumber,
                    description: req.body.description,
                    descriptionformat: req.body.descriptionformat,
                    parent: req.body.parent,
                    sortorder: req.body.sortorder,
                    coursecount: req.body.coursecount,
                    visible: req.body.visible,
                    visibleold: req.body.visibleold,
                    timemodified: req.body.timemodified,
                    depth: req.body.depth,
                    path: req.body.path,
                    theme: req.body.theme,
                    category: req.body.category,
                    parent: req.body.parent,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await CourseCategory.findOne({
                where: { id: req.params.id },
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await CourseCategory.findAll({
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await CourseCategory.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on CourseCategory with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};