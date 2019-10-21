const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const UserEnrolment = require ('../models').UserEnrolment;

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
                logger.error('Searching on UserEnrolment with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await UserEnrolment.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await UserEnrolment.findAndCountAll({
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
            logger.error('Paginated like search on UserEnrolment with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await UserEnrolment.create({
                status: req.body.status,
                enrolId: req.body.enrolId,
                userId: req.body.userId,
                timestart: req.body.timestart,
                timeend: req.body.timeend,
                modifierId: req.body.modifierId,
                timecreated: req.body.timecreated,
                timemodified: req.body.timemodified,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await UserEnrolment.update(
                {
                    status: req.body.status,
                    enrolId: req.body.enrolId,
                    userId: req.body.userId,
                    timestart: req.body.timestart,
                    timeend: req.body.timeend,
                    modifierId: req.body.modifierId,
                    timecreated: req.body.timecreated,
                    timemodified: req.body.timemodified,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await UserEnrolment.findOne({
                where: { id: req.params.id },
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await UserEnrolment.findAll({
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await UserEnrolment.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on UserEnrolment with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};