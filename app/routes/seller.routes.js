module.exports = app => {
    const sellers = require("../controllers/seller.controller.js");
    var router = require("express").Router();
    // Create a new Seller
    router.post("/", sellers.create);
    // Retrieve all Sellers
    router.get("/", sellers.findAll);
    // Retrieve a single seller with id
    router.get("/:id", sellers.findOne);
    // Update a seller with id
    router.put("/:id", sellers.update);
    // Delete a seller with id
    router.delete("/:id", sellers.delete);
    app.use('/api/sellers', router);
  };