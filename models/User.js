"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User",
        {
            auth: { type: DataTypes.STRING, allowNull: false },
            policyagreed: { type: DataTypes.BOOLEAN, allowNull: false },
            deleted: { type: DataTypes.BOOLEAN, allowNull: false },
            confirmed: { type: DataTypes.BOOLEAN, allowNull: false },
            suspended: { type: DataTypes.BOOLEAN, allowNull: false },
            mnehostid: { type: DataTypes.INTEGER, allowNull: true },
            username: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            idnumber: { type: DataTypes.STRING, allowNull: false },
            firstname: { type: DataTypes.STRING, allowNull: false },
            lastname: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            emailstop: { type: DataTypes.BOOLEAN, allowNull: false },
            facebook: { type: DataTypes.STRING, allowNull: true },
            instagram: { type: DataTypes.STRING, allowNull: true },
            twitter: { type: DataTypes.STRING, allowNull: true },
            whatsapp: { type: DataTypes.STRING, allowNull: true },
            phone: { type: DataTypes.STRING, allowNull: true },
            institution: { type: DataTypes.STRING, allowNull: true },
            department: { type: DataTypes.STRING, allowNull: true },
            address: { type: DataTypes.STRING, allowNull: true },
            city: { type: DataTypes.STRING, allowNull: true },
            country: { type: DataTypes.STRING, allowNull: true },
            lang: { type: DataTypes.STRING, allowNull: true },
            calendartype: { type: DataTypes.STRING, allowNull: true },
            theme: { type: DataTypes.STRING, allowNull: true },
            timezone: { type: DataTypes.STRING, allowNull: true },
            firstaccess: { type: DataTypes.INTEGER, allowNull: false },
            lastaccess: { type: DataTypes.INTEGER, allowNull: false },
            lastlogin: { type: DataTypes.INTEGER, allowNull: false },
            currentlogin: { type: DataTypes.INTEGER, allowNull: false },
            lastip: { type: DataTypes.STRING, allowNull: false },
            secret: { type: DataTypes.STRING, allowNull: true },
            picture: { type: DataTypes.INTEGER, allowNull: true },
            url: { type: DataTypes.STRING, allowNull: true },
            description: { type: DataTypes.STRING, allowNull: true },
            descriptionformat: { type: DataTypes.STRING, allowNull: true },
            mailformat: { type: DataTypes.BOOLEAN, allowNull: true },
            maildigest: { type: DataTypes.BOOLEAN, allowNull: true },
            maildisplay: { type: DataTypes.INTEGER, allowNull: true },
            autosubscribe: { type: DataTypes.BOOLEAN, allowNull: true },
            trackforum: { type: DataTypes.BOOLEAN, allowNull: true },
            timecreated: { type: DataTypes.INTEGER, allowNull: false },
            timemodified: { type: DataTypes.INTEGER, allowNull: false },
            trustbitmask: { type: DataTypes.INTEGER, allowNull: false },
            imgalt: { type: DataTypes.STRING, allowNull: true },
            lastnamephonetic: { type: DataTypes.STRING, allowNull: true },
            firstnamephonetic: { type: DataTypes.STRING, allowNull: true },
            middlename: { type: DataTypes.STRING, allowNull: true },
            alternatename: { type: DataTypes.STRING, allowNull: true },
        },
        {
            timestamps: false,
            tableName: 'Users'
        }
    );
    User.associate = function(models) { 
        User.belongsTo(
            models.UserEnrolment,
            // {
            //     foreignKey: 'UserId'
            // }
        );
        User.belongsTo(
            models.UserEnrolment,
            // {
            //     foreignKey: 'modifierId'
            // }
        );
    };
    return User;
};

