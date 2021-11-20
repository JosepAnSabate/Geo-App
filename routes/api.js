const express = require('express');
// La clase Router permite crear rutas modulares.
const router = express.Router();
// Importamos el archivo del controlador
const layer  = require('../controllers/layerController')



// Definimos la ruta para el método GET y añadimos como middleware la función del controlador
router.get('/layers/layer', layer.getGeojson)
router.route("/").get(layer.getGeojson);

//post
router.post('/layers/layer', layer.postGeojson)
    
// Exportamos el código 
module.exports = router;