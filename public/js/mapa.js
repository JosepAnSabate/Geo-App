//const { getGeojson } = require("../../controllers/layerController");

function init() {
    const map = L.map('map', {
      // drawControl: true, // draw tools, more down
      center: [41.6863, 1.6382],
      zoom: 8,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoMonICGC = L.tileLayer('https://geoserveis.icgc.cat/styles/icgc/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    }).addTo(map);
    const geologicICGC = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/geologia/MON3857NW/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const ortoICGC =
      L.tileLayer('https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
      });
      const mapaBase = {
        'Topogràfic': topoMonICGC,
        'Ortofoto': ortoICGC,
        'Geològic': geologicICGC,
      };
      controlCapes = L.control.layers(mapaBase, null, {collapsed: false});
     controlCapes.addTo(map)
    
    // get geojson from postgis//
    // Fetch stores from API
    async function getPoints() {
      const res = await fetch('/api/layers/layer');
      const data = await res.json(); // convert to json

      console.log(data);
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<h4 class="popup">'+feature.properties.name+`</h4>
          <hr class="popup">
          <p class="popup"><span class="popup-description">Description: </span>`+feature.properties.description+`</p>
          <p id="popupcoord">Lat: `+feature.geometry.coordinates[1]+', Long:'+
          feature.geometry.coordinates[0]+'</p>'
          );
        }
      }).addTo(map);
    };
    getPoints();


      // show your current location
      L.control.locate().addTo(map);
      // add map scale
      L.control.scale({position: 'bottomleft'}).addTo(map)
      //FULL SCREEN 
      L.control.fullscreen().addTo(map);
      // map coordinates mouse
      map.on('mousemove', function(e) {
      //console.log(e)
      const latitude = e.latlng.lat.toFixed(5);
      const longitude = e.latlng.lng.toFixed(5);
      $('.coordinate').html(`Lat: ${latitude}     Long: ${longitude}`)
    })
    
    // DRAWN NEW MARKERS//
  // initiate a variable to store the drawn items:
  // FeatureGroup is to store editable layers
  let drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

//create drawing controls and toolbar
  const drawControl = new L.Control.Draw({
    draw: {
      circle: false,
      marker: true,
      polyline: false, 
      polygon: false,
      rectangle: false
    }
  }).addTo(map);


  //  capture the data that is drawn using  event on Leaflet called ‘draw:created’
  map.on('draw:created', (e) => {
    // Each time we create a feature(point, line or polygon), we add this feature to the feature group wich is drawnItems in this case
    drawnItems.addLayer(e.layer);

    drwanItemsGJ = drawnItems.toGeoJSON();
    //console.log(drwanItemsGJ.features) // 
    //console.log(drwanItemsGJ.features[0].geometry); // get geometry first marker
    //console.log(drwanItemsGJ.features[0].geometry.coordinates[0]);  //get coordinate x
    const coords = e.layer._latlng;
    console.log(coords) // get coordinates of the last marker
 //   popup entry data, form
   const tempMarker = drawnItems.addLayer(e.layer);
 
   const popupContent = '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
   '<div class="form-group">'+
   '<label class="control-label col-sm-5"><strong>Description: </strong></label>'+
   '<textarea class="form-control" rows="6" id="descrip" name="descript"></textarea>'+
  '</div>' +
  '<input style="display: none;" type="text" id="lat" name="lat" value="'+coords.lat.toFixed(6)+'" />'+
  '<input style="display: none;" type="text" id="lng" name="lng" value="'+coords.lng.toFixed(6)+'" />'+
   '<div class="form-group">'+
     '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><a href="index.html" type="button" class="btn">Cancel<a/></div>'+
     '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
   '</div>'+
   '</form>';
   tempMarker.bindPopup(popupContent,{
        keepInView: true,
        closeButton: false
        }).openPopup();
   
        $("#form").submit(function(e){
            e.preventDefault();
            console.log("didnt submit");
            var date =$("#date").val();
            console.log(date);
    });
  });
}


// Full screen map view
const mapId = document.getElementById('map');
function fullScreenView(){
  mapId.requestFullscreen();
}


