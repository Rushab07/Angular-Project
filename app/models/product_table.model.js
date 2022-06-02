module.exports = (sequelize, Sequelize) => {
    const Product_Table = sequelize.define("product_table",{
        p_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        p_name: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                len: [4,10]
            }
        },
        p_category: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10,20]
            }
        },
        p_brand: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        p_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        p_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        p_image: {
            type: Sequelize.BLOB,
            allowNull: false,
        },
        p_description: {
            type: Sequelize.TEXT,
        }
    });
    return Product_Table;
};