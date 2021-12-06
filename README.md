# Geo-app

REST API using Node, Express, Postgres, Leaflet.
Hosted on AWS using NGINX as a webserver.


[https://visualatles.cat](https://visualatles.cat)

<br>

* Geo-app allows the user to create edit and delete locations and descriptions on a geological,  orthographic and topographic maps being able to consult the geologic description from the ICGC WMS. 

<br>

```bash
# Server on localhost:4000
npm run dev (nodemon)
or
npm start

# Api routes (development)
GET all locations    		        http://localhost:4000/api/layers/layer
Get one location, delete, update 	http://localhost:4000/api/layers/layer/:name

# Api routes (production)
GET all locations    		        https://visualatles.cat/api/layers/layer
Get one location, delete, update 	https://visualatles.cat/api/layers/layer/:name

```
<br>

Geologic WMS: https://geoserveis.icgc.cat/arcgis/services/geologic/icgc_mg50m/MapServer/WMSServer?
Source: [https://www.icgc.cat/Administracio-i-empresa/Serveis/Geologia/WMS-Cartografia-geologica](https://www.icgc.cat/Administracio-i-empresa/Serveis/Geologia/WMS-Cartografia-geologica)

<p align="center">
<img   src="./img/appmapa.PNG">
<img   src="./img/desc.PNG">
</p>