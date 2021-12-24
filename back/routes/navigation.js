const express = require('express');
const router = express.Router();
const path = require ('path')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../front/html/index.html'));
  });

  router.get('/product-details', function(req, res) {
    res.sendFile(path.join(__dirname, '../../front/html/product.html'));
  });

  router.get('/cart', function(req, res) {
    res.sendFile(path.join(__dirname, '../../front/html/cart.html'));
  });

  router.get('/confirmation', function(req, res) {
    res.sendFile(path.join(__dirname, '../../front/html/confirmation.html'));
  });

  module.exports = router;
  