const express = require('express');
// La clase Router permite crear rutas modulares.
const router = express.Router();
// Importamos el archivo del controlador
const layer  = require('../controllers/layerController')



// Definimos la ruta para el método GET y añadimos como middleware la función del controlador
router.get('/layers/layer', layer.getGeojson)
router.route("/").get(layer.getGeojson);
// GET by name
router.get('/layers/layer/:name', layer.getGeojsonByName)

//post
router.post('/layers/layer', layer.postGeojson)
//router.route("/").post(layer.postGeojson)    

// PUT update
router.put('/layers/layer/:name', layer.putGeojsonByName)

// Delete
router.delete('/layers/layer/:name', layer.deleteGeojsonByName);
// Exportamos el código 
module.exports = router;