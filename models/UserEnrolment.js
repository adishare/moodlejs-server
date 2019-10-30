"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserEnrolment = sequelize.define("UserEnrolment",
        {
            status: { type: DataTypes.INTEGER, allowNull: false },
            enrolId: { type: DataTypes.INTEGER, allowNull: false },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            timestart: { type: DataTypes.INTEGER, allowNull: false },
            timeend: { type: DataTypes.INTEGER, allowNull: false },
            modifierId: { type: DataTypes.INTEGER, allowNull: false },
            timecreated: { type: DataTypes.INTEGER, allowNull: false },
            timemodified: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            timestamps: false,
            tableName: 'UserEnrolments'
        }
    );
    UserEnrolment.associate = function(models) { 
        UserEnrolment.hasMany(
            models.User,
            // {
            //     foreignKey: 'UserId'
            // }
        );
        UserEnrolment.hasMany(
            models.User,
            // {
            //     foreignKey: 'modifierId'
            // }
        );
        UserEnrolment.hasMany(
            models.Enrol,
            // {
            //     foreignKey: 'EnrolId'
            // }
        );
    };
    return UserEnrolment;
};

