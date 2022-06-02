
module.exports = (sequelize, Sequelize) => {
    const Order_Table = sequelize.define("order_table",{
        o_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        o_name: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                len: [4,10]
            }
        },
        o_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        o_image: {
            type: Sequelize.BLOB,
            allowNull: false,
        },
        o_description: {
            type: Sequelize.TEXT,
        },
        o_status: {
            type: Sequelize.TEXT,
        }
    });
    return Order_Table;
};