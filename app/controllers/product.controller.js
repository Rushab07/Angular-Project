const db = require("../models");
const Product_Table = db.Product_Tables;
const Op = db.Sequelize.Op;

//create product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.p_name) {
      res.status(400).send({
      message: "Content can not be empty!"
  });
  return;
  }
  // Create a Product
  const product = {
      p_name: req.body.p_name,
      p_category: req.body.p_category,
      p_brand: req.body.p_brand,
      p_price: req.body.p_price,
      p_quantity: req.body.p_quantity,
      p_description: req.body.description
  };
   // Save product in the database
  
  Product_Table.create(product)
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
    const p_name = req.query.p_name;
    var condition = p_name ? { p_name: { [Op.like]: `%${p_name}%` } } : null;
    Product_Table.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Product."
        });
      });
  };
// Find a single seller with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product_Table.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find product with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving product with id=" + id
        });
      });
    };
// Update a Product by the id in the request
exports.update = (req, res) => {
const id = req.params.id;
Product_Table.update(req.body, {
    where: { id: id }
})
.then(num => {
    if (num == 1) {
        res.send({
        message: "product was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
    });
    }
})
.catch(err => {
    res.status(500).send({
    message: "Error updating Product with id=" + id
  });
});
};
// Delete a product with the specified id in the request
exports.delete = (req, res) => {
const id = req.params.id;
Product_Table.destroy({
    where: { id: id }
})
    .then(num => {
        if (num == 1) {
        res.send({
        message: "Product was deleted successfully!"
        });
        } else {
            res.send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Could not delete Product with id=" + id
        });
    });
};