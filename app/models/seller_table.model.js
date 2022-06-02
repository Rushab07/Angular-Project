module.exports = (sequelize, Sequelize) => {
    const Seller_Table = sequelize.define("seller_table",{
        s_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        s_name: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                len: [4,10]
            }
        },
        s_mobile_no: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10,10]
            }
        },
        s_email_id: {
            type: Sequelize.STRING,
            isEmail: true,
        },
        s_address: {
            type: Sequelize.TEXT,
        }
    });
    return Seller_Table;
};