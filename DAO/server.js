const mongoose = require('mongoose')
const express = require ('express')
const app = express()
const postModel = require('./mongo/schemas/producto.js')
const productoControllers = require('./mongo/controller/producto.js')
const carritoControllers = require('./mongo/controller/carrito.js')
const { carritovController } = require('./mongo/controller/carrito.js')


app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

//variable
let DB = "mongoDB";

//elegir la base de datos.
switch (DB) {
    case "fileSystem":
        console.log("persistencia fileSystem elegida");
        //app.use('/productos',require('../routes/productsFilesystem.js'))
        //app.use('/carrito',require('../routes/cartFilesystem.js'))
        break;
    case "mongoDB":
        console.log("persistencia mongoDB elegida");

        /*----------------------------------------
        ----------rutas de productos--------------
        ----------------------------------------*/

        //app.use('/productos',require('../routes/routesMongo'))
        //app.use('/carrito',require('../routes/routesMongo'))

        /*app.post("/productos/crear", async(req,res)=>{
            const {nombre,descripcion,codigo,foto,precio,stock} = req.body;
        
            try {
                const newPost = await postModel.create({nombre,descripcion,codigo,foto,precio,stock});
                res.json(newPost)
            } catch (error) {
                res.status(500).send(error)
            }
        });*/

        app.post("/productos/crear", productoControllers.productoController)

        /*app.get("/productos/listar", async(req, res)=>{

            try {
                const post = await postModel.find();
                res.json(post)
            } catch (error) {
                res.status(500).send(error)
            }
        });*/

        app.get("/productos/listar", productoControllers.productovController)

        /*app.get("/productos/:id", async(req, res)=>{
            const {id} = req.params
            try {
                const post = await postModel.findById(id);
                res.json(post);
            } catch (error) {
                res.status(500).send(error)
            }
        })*/

        app.get("/productos/listar/:id", productoControllers.productovController)

        /*app.put("/productos/:id", async(req, res)=>{
            const {id} = req.params
            const {nombre,descripcion,codigo,foto,precio,stock} = req.body
            try {
                const post = await postModel.findByIdAndUpdate(id,{nombre,descripcion,codigo,foto,precio,stock});
                res.json(post);
            } catch (error) {
                res.status(500).send(error)
            }
        })*/

        app.put("/productos/actualizar/:id", productoControllers.productoActualizarid)

        /*app.delete("/productos/:id", async(req,res)=>{
            const{id}=re.params
            try {
                const post = await postModel.findById(id);
                await post.remove();
                res.json('producto borrado con exito')
            } catch (error) {
                res.status(500).send(error)
            }
        })*/

        app.delete("/productos/borrar/:id", productoControllers.productobController)

        /*----------------------------------------
        ------------rutas de carrito--------------
        ----------------------------------------*/
        
        app.post("/carrito/agregar/:id", carritoControllers.carritoController)

        app.get("/carrito/listar", carritoControllers.carritovController)

        app.get("/carrito/listar/:id", carritoControllers.carritovController)

        app.delete("/carrito/borrar/:id", carritoControllers.carritobController)

        break;

        
}

// Middleware para manejar errores
app.use((error, req, res, next) => {
    return res.status(error.code || 500).json({ error : error })
  })

//Error de Ruta
app.use((req, res, next) => {
    res.status(404).json({
    status: 404,
    message: `No se encuentra la ruta ${req.originalUrl}`,
    error: 'Not Found'
    })
})

const PORT = process.env.PORT || 8080

/*const conexion = async() => {
        await mongoose.connect('mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/ecommerce?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }); 
   }

conexion();*/

const conexion = () => {
    mongoose.set('strictQuery',true).connect('mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/ecommerce?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    },error=>{
            if(error) console.log(error);
            else console.log("base mongoDB conectada");
        }); 
}

if(DB === 'mongoDB'){
    conexion();
}


app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))

app.on('error',err => console.log(err))