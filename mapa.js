function init() {
    const map = L.map('map', {
      // drawControl: true, // draw tools, more down
      // draw: {
      //   circle: false,
      //   marker: true,
      //   polyline: false, 
      //   polygon: false,
      //   rectangle: false
      // },
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
      $('.coordinate').html(`Latitud: ${latitude}     Longitud:${longitude}`)
    })

    // DRAWN MARKERS//
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
    //console.log(drwanItemsGJ.features)
    console.log(drwanItemsGJ.features[0].geometry); // get geometry
    console.log(drwanItemsGJ.features[0].geometry.coordinates[0]);  //get coordinate x
    const coords = e.layer._latlng;
    console.log(coords) // get coordinates
  });
  
}


// Full screen map view
const mapId = document.getElementById('map');
function fullScreenView(){
  mapId.requestFullscreen();
}



