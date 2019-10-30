"use strict";

module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course",
        {
            category: { type: DataTypes.INTEGER, allowNull: true },
            sortorder: { type: DataTypes.INTEGER, allowNull: true },
            startdate: { type: DataTypes.BIGINT, allowNull: true },
            enddate: { type: DataTypes.BIGINT, allowNull: true },
            marker: { type: DataTypes.INTEGER, allowNull: true },
            maxbytes: { type: DataTypes.INTEGER, allowNull: true },
            defaultgroupingid: { type: DataTypes.INTEGER, allowNull: true },
            timecreated: { type: DataTypes.BIGINT, allowNull: false },
            timemodified: { type: DataTypes.BIGINT, allowNull: false },
            cacherev: { type: DataTypes.INTEGER, allowNull: true },
            visible: { type: DataTypes.STRING, allowNull: false },
            visibleold: { type: DataTypes.STRING, allowNull: true },
            requested: { type: DataTypes.STRING, allowNull: true },
            enablecompletion: { type: DataTypes.STRING, allowNull: true },
            completionnotify: { type: DataTypes.STRING, allowNull: true },
            summary: { type: DataTypes.STRING, allowNull: true },
            newsitems: { type: DataTypes.INTEGER, allowNull: true },
            legacyfiles: { type: DataTypes.INTEGER, allowNull: true },
            showreports: { type: DataTypes.INTEGER, allowNull: true },
            groupmode: { type: DataTypes.INTEGER, allowNull: true },
            groupmodeforce: { type: DataTypes.INTEGER, allowNull: true },
            summaryformat: { type: DataTypes.INTEGER, allowNull: true },
            showgrades: { type: DataTypes.INTEGER, allowNull: true },
            fullname: { type: DataTypes.STRING, allowNull: false },
            shortname: { type: DataTypes.STRING, allowNull: false },
            idnumber: { type: DataTypes.STRING, allowNull: true },
            format: { type: DataTypes.STRING, allowNull: true },
            lang: { type: DataTypes.STRING, allowNull: true },
            calendartype: { type: DataTypes.STRING, allowNull: true },
            theme: { type: DataTypes.STRING, allowNull: true },
        },
        {
            timestamps: false,
            tableName: 'Courses'
        }
    );
    Course.associate = function(models) { 
        Course.belongsTo(
            models.CourseCategory, {
                foreignKey: 'category'
            }
        );
        // Course.belongsTo(
        //     models.Enrol,
        //     {
        //         foreignKey: 'courseId'
        //     }
        // );
    };
    return Course;
};

