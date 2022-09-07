'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })

      this.belongsTo(models.ReportType, {
        foreignKey: 'report_type_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Report.init({
    user_id: DataTypes.INTEGER,
    report_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    evidence: DataTypes.STRING,
    follow_up_suggestions: DataTypes.TEXT,
    status: DataTypes.ENUM('pending', 'approved', 'rejected')
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};