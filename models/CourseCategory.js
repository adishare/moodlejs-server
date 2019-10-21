"use strict";

module.exports = function(sequelize, DataTypes) {
    var CourseCategory = sequelize.define("CourseCategory",
        {
            name: { type: DataTypes.STRING, allowNull: false },
            idnumber: { type: DataTypes.STRING, allowNull: true },
            description: { type: DataTypes.STRING, allowNull: true },
            descriptionformat: { type: DataTypes.INTEGER, allowNull: true },
            parent: { type: DataTypes.INTEGER, allowNull: true },
            sortorder: { type: DataTypes.INTEGER, allowNull: true },
            coursecount: { type: DataTypes.INTEGER, allowNull: true },
            visible: { type: DataTypes.BOOLEAN, allowNull: true },
            visibleold: { type: DataTypes.BOOLEAN, allowNull: true },
            timemodified: { type: DataTypes.INTEGER, allowNull: true },
            depth: { type: DataTypes.INTEGER, allowNull: true },
            path: { type: DataTypes.STRING, allowNull: true },
            theme: { type: DataTypes.STRING, allowNull: true },
        },
        {
            timestamps: false,
            tableName: 'CourseCategories'
        }
    );
    CourseCategory.associate = function(models) { 
        CourseCategory.belongsTo(
            models.Course,
            {
                foreignKey: 'category'
            }
        );
        CourseCategory.belongsTo(
            models.CourseCategory,
            {
                foreignKey: 'parent'
            }
        );
        CourseCategory.hasMany(
            models.CourseCategory,
            {
                foreignKey: 'CourseCategoryId'
            }
        );
    };
    return CourseCategory;
};

