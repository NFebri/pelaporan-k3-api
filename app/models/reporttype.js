'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Report, {
        foreignKey: 'report_type_id'
      })
    }
  }
  ReportType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReportType',
  });
  return ReportType;
};