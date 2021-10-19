const Pool = require('pg').Pool
const GeoJSON = require('geojson');
const _ = require('underscore');
//  Recuperem les dades de config.js i les passem a variables
const config = require('../config/config');
const { db: { user, host, database, password, port } } = config;


// Usando el objeto Pool del módulo pg  instanciamos un nuevo objeto que usará las credenciales definidas.
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
})

// get layer //
//let layerName = request.params.layername;
// more than 1 layerSELECT * FROM ${layername};
// Almacenamos en una constante la función que realiza la llamada y devuelve el archivo.
const getGeojson = (request, response, next) => {
    // Almacenamos la consulta SQL
    let queryLayer = 'SELECT id, name, description, ST_X(geom) as lng, ST_Y(geom) as lat FROM pointstb;'

    pool.query(queryLayer, (err, res) => {
        if (err) {
            return console.error('Error ejecutando la consulta. ', err.stack)
        }
        let rowNoGeom = [];
        res.rows.forEach(element => {
            let row = _.omit(element, 'geom');
            rowNoGeom.push(row);
        });
        let geojson = GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
        console.log(geojson)
        response.json(geojson);
        
    })
}


module.exports = {
    getGeojson
}