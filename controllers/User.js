const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const User = require ('../models').User;

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
                logger.error('Searching on User with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await User.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await User.findAndCountAll({
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
            logger.error('Paginated like search on User with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await User.create({
                auth: req.body.auth,
                policyagreed: req.body.policyagreed,
                deleted: req.body.deleted,
                confirmed: req.body.confirmed,
                suspended: req.body.suspended,
                mnehostid: req.body.mnehostid,
                username: req.body.username,
                password: req.body.password,
                idnumber: req.body.idnumber,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                emailstop: req.body.emailstop,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                twitter: req.body.twitter,
                whatsapp: req.body.whatsapp,
                phone: req.body.phone,
                institution: req.body.institution,
                department: req.body.department,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                lang: req.body.lang,
                calendartype: req.body.calendartype,
                theme: req.body.theme,
                timezone: req.body.timezone,
                firstaccess: req.body.firstaccess,
                lastaccess: req.body.lastaccess,
                lastlogin: req.body.lastlogin,
                currentlogin: req.body.currentlogin,
                lastip: req.body.lastip,
                secret: req.body.secret,
                picture: req.body.picture,
                url: req.body.url,
                description: req.body.description,
                descriptionformat: req.body.descriptionformat,
                mailformat: req.body.mailformat,
                maildigest: req.body.maildigest,
                maildisplay: req.body.maildisplay,
                autosubscribe: req.body.autosubscribe,
                trackforum: req.body.trackforum,
                timecreated: req.body.timecreated,
                timemodified: req.body.timemodified,
                trustbitmask: req.body.trustbitmask,
                imgalt: req.body.imgalt,
                lastnamephonetic: req.body.lastnamephonetic,
                firstnamephonetic: req.body.firstnamephonetic,
                middlename: req.body.middlename,
                alternatename: req.body.alternatename,
                UserId: req.body.UserId,
                modifierId: req.body.modifierId,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await User.update(
                {
                    auth: req.body.auth,
                    policyagreed: req.body.policyagreed,
                    deleted: req.body.deleted,
                    confirmed: req.body.confirmed,
                    suspended: req.body.suspended,
                    mnehostid: req.body.mnehostid,
                    username: req.body.username,
                    password: req.body.password,
                    idnumber: req.body.idnumber,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    emailstop: req.body.emailstop,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter,
                    whatsapp: req.body.whatsapp,
                    phone: req.body.phone,
                    institution: req.body.institution,
                    department: req.body.department,
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    lang: req.body.lang,
                    calendartype: req.body.calendartype,
                    theme: req.body.theme,
                    timezone: req.body.timezone,
                    firstaccess: req.body.firstaccess,
                    lastaccess: req.body.lastaccess,
                    lastlogin: req.body.lastlogin,
                    currentlogin: req.body.currentlogin,
                    lastip: req.body.lastip,
                    secret: req.body.secret,
                    picture: req.body.picture,
                    url: req.body.url,
                    description: req.body.description,
                    descriptionformat: req.body.descriptionformat,
                    mailformat: req.body.mailformat,
                    maildigest: req.body.maildigest,
                    maildisplay: req.body.maildisplay,
                    autosubscribe: req.body.autosubscribe,
                    trackforum: req.body.trackforum,
                    timecreated: req.body.timecreated,
                    timemodified: req.body.timemodified,
                    trustbitmask: req.body.trustbitmask,
                    imgalt: req.body.imgalt,
                    lastnamephonetic: req.body.lastnamephonetic,
                    firstnamephonetic: req.body.firstnamephonetic,
                    middlename: req.body.middlename,
                    alternatename: req.body.alternatename,
                    UserId: req.body.UserId,
                    modifierId: req.body.modifierId,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await User.findOne({
                where: { id: req.params.id },
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await User.findAll({
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await User.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on User with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};