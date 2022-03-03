const {Sequelize , DataTypes} = require("sequelize");
const db = require("../config/database");

const distributer = db.define(
  "distributer",
  {
    name: {
      type: Sequelize.STRING,
      default: true,
    },
    email: {
      type: Sequelize.TEXT,
      default: true,
    },
    phone: {
      type: Sequelize.STRING,
      default: true,
    },
    website: {
        type: Sequelize.STRING,
        default: true,
      },
      // contactNumber: {
      //   type: Sequelize.STRING,
      //   default: true,
      // },
      // contactPerson: {
      //   type: Sequelize.STRING,
      //   default: true,
      // },
      address: {
        type: Sequelize.STRING,
        default: true,
      },
      zipcode : {
        type: Sequelize.STRING,
        default: true,
      },
      city : {
        type: Sequelize.STRING,
        default: true,
      },
      active : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
      },
  },
  { timestamps: true }
);

module.exports = distributer;