
function  init(data) {
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
          // data uotside map
          //document.getElementById("stats").innerHTML = feature.properties.name
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
    });

    // get feature info
    
      
    
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
  
    const popupContent = 
      '<form id="myForm" methos="" action="" class="form"  enctype="multipart/form-data">'+
      
        '<label class="control-label col-sm-5 form-label"><b>Title: </b></label>'+
        '<textarea class="form-control form-text" rows="1" id="title" name="title"></textarea>'+
        
        '<label style="margin-top: 20px" class="control-label col-sm-5 form-label"><b>Description: </b></label>'+   
        '<textarea class="form-control" rows="3" id="description" name="description"></textarea>'+ 
        
        '<input style="display: none;" type="text" id="lat" name="lat" value="'+coords.lat.toFixed(6)+'" />'+
        '<input style="display: none;" type="text" id="lng" name="lng" value="'+coords.lng.toFixed(6)+'" />'+

        '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><a href="index.html" type="button" class="btn">Cancel<a/></div>'+
        '<div style="text-align:center;" class="col-xs-4">'+
        '<button  form="myForm" type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'
        
        +'</form>';

    tempMarker.bindPopup(popupContent,{
          keepInView: true,
          closeButton: false
          }).openPopup();

    let title = document.getElementById('title')
    let descript = document.getElementById("description")
    let lat = document.getElementById('lat')
    let lng = document.getElementById('lng')
    
    myForm.addEventListener('submit', (e)=>{
      e.preventDefault(); // refresh the page when its submitted
      //console.log("Submitted");
      
      let formData = { //js object
          name: title.value,
          description: descript.value,
          geom: 'POINT('+lat.value +' '+lng.value+')'
      }

      console.log(formData);
      
      try {
        //const body = { name, description, geom };
        //http request using fetch
        const response =  fetch("http://localhost:4000/api/layers/layer", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, //http header fields => application/json if the http response is json data   https://www.youtube.com/watch?v=iYM2zFP3Zn0
          body: JSON.stringify(formData)//{name, description, geom}
          
        });
        //console.log(response);
      window.location = "/"; // refresh and show the changes
      } catch (err) {
        console.error(err.message);
      }  
    })
  });
}

//console.log(nameLayer)
function deleteButton ()  {
    let nameLayer = document.getElementById("name");
      console.log(nameLayer.value)
    try {
      //let nameLayerdel = {name:nameLayer}
      //http request using fetch
      const response =  fetch(`http://localhost:4000/api/layers/layer/${nameLayer.value}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }, //http header fields => application/json if the http response is json data   https://www.youtube.com/watch?v=iYM2zFP3Zn0
        //body: JSON.stringify(nameLayerdel)//{name, description, geom}
      });
      console.log(response);
    window.location = "/"; // refresh and show the changes
    } catch (err) {
      console.error(err.message);
    } 
}

function editButton () {
  let nameLayer = document.getElementById("name");
  let newName = document.getElementById("new-name");
  let newDescription = document.getElementById("new-description");

  let newData = {
    "newName": newName.value,
    "newDescription": newDescription.value,
    "name": nameLayer.value
  }

  try {
    const response = fetch(`http://localhost:4000/api/layers/layer/${nameLayer.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }, //http header fields => application/json if the http response is json data   https://www.youtube.com/watch?v=iYM2zFP3Zn0
      body: JSON.stringify(newData)//{name, description, geom}
    });
    console.log(response);
    window.location = "/"; // refresh and show the changes
  }  catch (err) {
    console.error(err.message);
  }
  
}

function openForm() {
  document.getElementById("myFormEdit").style.display = "block";
}

function closeForm() {
  document.getElementById("myFormEdit").style.display = "none";
}

// Full screen map view
const mapId = document.getElementById('map');
function fullScreenView(){
  mapId.requestFullscreen();
}


