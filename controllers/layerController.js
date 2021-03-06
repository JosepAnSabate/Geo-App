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
const getGeojson = async (request, response, next) => {
    // Almacenamos la consulta SQL
    let queryLayer = 'SELECT id, name, description, ST_X(geom) as lng, ST_Y(geom) as lat FROM pointstb;'

   await pool.query(queryLayer, (err, res) => {
        if (err) {
            return console.error('Error ejecutando la consulta. ', err.stack)
        }
        let rowNoGeom = [];
        res.rows.forEach(element => {
            let row = _.omit(element, 'geom');
            rowNoGeom.push(row);
    });
        let geojson = GeoJSON.parse(res.rows, { Point: ['lng', 'lat'] }); // a leaflet lat long va al reves
        console.log(geojson);
        response.json(geojson);   
    })
}

// GET  geojson by name
const getGeojsonByName = async (request, response) => {
    const name = request.params.name;//url
    const res = await pool.query(`SELECT * FROM pointstb WHERE name = $1;`, [name]);
    response.json(res.rows)
}

// Post layer
const postGeojson = async (request, response) => {
  try{
    //console.log(request.body)
    const {name, description, geom} = request.body;
    //let resLayer = 'INSERT INTO pointstb (name, description, geom) VALUES ($1, $2, $3)', [name, description, geom];
    const res = await pool.query('INSERT INTO pointstb (name, description, geom) VALUES ($1, $2, $3)', [name, description, geom]);
   
    console.log(res);
    //console.log(response);
    response.json({
        message: 'Site recorded',
        body: {
            FormData: {name, description, geom}
        }
    })
    //return console.log(response.status) //201 means something crated
} catch (e) {
    console.log(e)
}
}

const putGeojsonByName = async (request, response) => {
    try {
        const name = request.params.name;// url
        const {newName, newDescription} = request.body;
        let queryPut = `UPDATE pointstb SET name = $1, 
        description = $2 WHERE name = $3;`;
        let queryFields = [newName, newDescription, name]
        const res = await pool.query(queryPut, queryFields)
        console.log(res);

        response.json({
            message: 'Site update',
            body: {
                updatedData: {newName, newDescription, name}
            }
        });
    } catch (e) {
        console.log(e)
    }
}

const deleteGeojsonByName = async(request, response) => {
  //res.send('User deleted' + request.params.name); 
  const name = request.params.name; //url
  const res = await pool.query('DELETE FROM pointstb WHERE name= $1;', [name]);
  console.log(res)
  response.json(`User ${name} deleted`)
}


module.exports = {
    getGeojson,
    getGeojsonByName,
    postGeojson,
    putGeojsonByName,
    deleteGeojsonByName,
}