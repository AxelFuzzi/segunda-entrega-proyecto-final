const checkAdmin = require('../middlewares/checkAdmin');
const{productoController, productovController, productobController, productoActualizarid}=require('../DAO/mongo/controller/producto.js')
const{carritoController, carritovController, carritobController}=require('../DAO/mongo/controller/carrito.js')
module.exports=(router)=>{
	//rutas productos
	router.post("/agregar",checkAdmin,productoController);//ok
	router.get("/listar/:id?",productovController);//ok
	router.put("/actualizar/:id",checkAdmin,productoActualizarid);//ok
	router.delete("/borrar/:id",checkAdmin,productobController);
	//Apartir de aca las rutas del carrito de compras
	router.post("/agregar/:id_producto",checkAdmin,carritoController);//ok
	router.get("/listar/:id?",carritovController);//ok
	router.delete("/borrar/:id",checkAdmin,carritobController);
	return router;
};