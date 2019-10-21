const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const Enrol = require ('../models').Enrol;

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
                logger.error('Searching on Enrol with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await Enrol.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await Enrol.findAndCountAll({
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
            logger.error('Paginated like search on Enrol with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await Enrol.create({
                status: req.body.status,
                courseid: req.body.courseid,
                sortorder: req.body.sortorder,
                enrolperiod: req.body.enrolperiod,
                enrolstartdate: req.body.enrolstartdate,
                enrolenddate: req.body.enrolenddate,
                expirythreshold: req.body.expirythreshold,
                roleid: req.body.roleid,
                customint1: req.body.customint1,
                customint2: req.body.customint2,
                customint3: req.body.customint3,
                customint4: req.body.customint4,
                customint5: req.body.customint5,
                customint6: req.body.customint6,
                customint7: req.body.customint7,
                customint8: req.body.customint8,
                timecreated: req.body.timecreated,
                timemodified: req.body.timemodified,
                expirynotify: req.body.expirynotify,
                notifyall: req.body.notifyall,
                customdec1: req.body.customdec1,
                customdec2: req.body.customdec2,
                customtext1: req.body.customtext1,
                customtext2: req.body.customtext2,
                customtext3: req.body.customtext3,
                customtext4: req.body.customtext4,
                enrol: req.body.enrol,
                name: req.body.name,
                password: req.body.password,
                cost: req.body.cost,
                currency: req.body.currency,
                customchar1: req.body.customchar1,
                customchar2: req.body.customchar2,
                customchar3: req.body.customchar3,
                enrolId: req.body.enrolId,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await Enrol.update(
                {
                    status: req.body.status,
                    courseid: req.body.courseid,
                    sortorder: req.body.sortorder,
                    enrolperiod: req.body.enrolperiod,
                    enrolstartdate: req.body.enrolstartdate,
                    enrolenddate: req.body.enrolenddate,
                    expirythreshold: req.body.expirythreshold,
                    roleid: req.body.roleid,
                    customint1: req.body.customint1,
                    customint2: req.body.customint2,
                    customint3: req.body.customint3,
                    customint4: req.body.customint4,
                    customint5: req.body.customint5,
                    customint6: req.body.customint6,
                    customint7: req.body.customint7,
                    customint8: req.body.customint8,
                    timecreated: req.body.timecreated,
                    timemodified: req.body.timemodified,
                    expirynotify: req.body.expirynotify,
                    notifyall: req.body.notifyall,
                    customdec1: req.body.customdec1,
                    customdec2: req.body.customdec2,
                    customtext1: req.body.customtext1,
                    customtext2: req.body.customtext2,
                    customtext3: req.body.customtext3,
                    customtext4: req.body.customtext4,
                    enrol: req.body.enrol,
                    name: req.body.name,
                    password: req.body.password,
                    cost: req.body.cost,
                    currency: req.body.currency,
                    customchar1: req.body.customchar1,
                    customchar2: req.body.customchar2,
                    customchar3: req.body.customchar3,
                    enrolId: req.body.enrolId,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await Enrol.findOne({
                where: { id: req.params.id },
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await Enrol.findAll({
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await Enrol.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on Enrol with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};