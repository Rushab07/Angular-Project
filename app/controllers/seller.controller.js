const db = require("../models");
const Seller_Table = db.Seller_Tables;
const Op = db.Sequelize.Op;
// Create and Save a new Seller information
exports.create = (req, res) => {
    // Validate request
    if (!req.body.s_name) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    // Create a Seller
    const seller = {
        s_name: req.body.s_name,
        s_mobile_no: req.body.s_mobile_no,
        s_email_id: req.body.s_email_id,
        s_address: req.body.s_address
    };
     // Save seller in the database
    Seller_Table.create(seller)
        .then(data => {
         res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the seller."
        });
    });
};
// Retrieve all seller information from the database.
exports.findAll = (req, res) => {
        const s_name = req.query.s_name;
        var condition = s_name ? { s_name: { [Op.like]: `%${s_name}%` } } : null;
        Seller_Table.findAll({ where: condition })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Sellers."
            });
          });
      };
// Find a single seller with an id
exports.findOne = (req, res) => {
        const id = req.params.id;
        Seller_Table.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find seller with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving seller with id=" + id
            });
          });
        };
// Update a Seller by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Seller_Table.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "seller was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update seller with id=${id}. Maybe seller was not found or req.body is empty!`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating seller with id=" + id
      });
    });
};
// Delete a Seller with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Seller_Table.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
            res.send({
            message: "Seller was deleted successfully!"
            });
            } else {
                res.send({
                message: `Cannot delete Seller with id=${id}. Maybe Seller was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Seller with id=" + id
            });
        });
};