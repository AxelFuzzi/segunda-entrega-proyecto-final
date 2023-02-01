const express = require('express')
const router  = express.Router()
const carritoCtrl = require('../DAO/mongo/controller/carrito.js');
const checkAdmin = require('../middlewares/checkAdmin.js');

router.post("/agregar/:id", checkAdmin, carritoCtrl.carritoController);
router.get("/listar/:id?", carritoCtrl.carritovController);
router.delete("/borrar/:id", checkAdmin, carritoCtrl.carritobController);

module.exports = router