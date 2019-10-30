"use strict";

module.exports = function(sequelize, DataTypes) {
    var Enrol = sequelize.define("Enrol",
        {
            status: { type: DataTypes.INTEGER, allowNull: true },
            courseid: { type: DataTypes.INTEGER, allowNull: false },
            sortorder: { type: DataTypes.INTEGER, allowNull: true },
            enrolperiod: { type: DataTypes.INTEGER, allowNull: true },
            enrolstartdate: { type: DataTypes.INTEGER, allowNull: true },
            enrolenddate: { type: DataTypes.INTEGER, allowNull: true },
            expirythreshold: { type: DataTypes.INTEGER, allowNull: true },
            roleid: { type: DataTypes.INTEGER, allowNull: true },
            customint1: { type: DataTypes.INTEGER, allowNull: true },
            customint2: { type: DataTypes.INTEGER, allowNull: true },
            customint3: { type: DataTypes.INTEGER, allowNull: true },
            customint4: { type: DataTypes.INTEGER, allowNull: true },
            customint5: { type: DataTypes.INTEGER, allowNull: true },
            customint6: { type: DataTypes.INTEGER, allowNull: true },
            customint7: { type: DataTypes.INTEGER, allowNull: true },
            customint8: { type: DataTypes.INTEGER, allowNull: true },
            timecreated: { type: DataTypes.INTEGER, allowNull: false },
            timemodified: { type: DataTypes.INTEGER, allowNull: false },
            expirynotify: { type: DataTypes.BOOLEAN, allowNull: true },
            notifyall: { type: DataTypes.BOOLEAN, allowNull: true },
            customdec1: { type: DataTypes.INTEGER, allowNull: true },
            customdec2: { type: DataTypes.INTEGER, allowNull: true },
            customtext1: { type: DataTypes.STRING, allowNull: true },
            customtext2: { type: DataTypes.STRING, allowNull: true },
            customtext3: { type: DataTypes.STRING, allowNull: true },
            customtext4: { type: DataTypes.STRING, allowNull: true },
            enrol: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: true },
            cost: { type: DataTypes.STRING, allowNull: true },
            currency: { type: DataTypes.STRING, allowNull: true },
            customchar1: { type: DataTypes.STRING, allowNull: true },
            customchar2: { type: DataTypes.STRING, allowNull: true },
            customchar3: { type: DataTypes.STRING, allowNull: true },
        },
        {
            timestamps: false,
            tableName: 'Enrols'
        }
    );
    Enrol.associate = function(models) { 
        Enrol.hasMany(
            models.Course,
            // {
            //     foreignKey: 'CourseId'
            // }
        );
        Enrol.belongsTo(
            models.UserEnrolment,
            // {
            //     foreignKey: 'enrolId'
            // }
        );
    };
    return Enrol;
};

