const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Seller_Tables = require("./seller_table.model.js")(sequelize, Sequelize);
db.Product_Tables = require("./product_table.model.js")(sequelize, Sequelize);
db.Order_Tables = require("./order_table.model.js")(sequelize, Sequelize);
db.Seller_Tables.hasMany(db.Product_Tables);
db.Product_Tables.belongsTo(db.Seller_Tables, {
  foreignKey: "s_id",
});
db.Product_Tables.hasMany(db.Order_Tables);
db.Order_Tables.belongsTo(db.Product_Tables, {
  foreignKey: "p_id",
});
module.exports = db;