const express = require('express')
const router = express.Router()
const checkAdmin = require('../middlewares/checkAdmin');
const productCtrl = require('../DAO/mongo/controller/producto.js')


router.post("/agregar", checkAdmin, productCtrl.productoController);
router.get("/listar/:id?", productCtrl.productovController);
router.put("/actualizar/:id", checkAdmin, productCtrl.productoActualizarid);
router.delete("/borrar/:id", checkAdmin, productCtrl.productobController);

module.exports = router