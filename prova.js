function init() {
    const map = L.map('map', {
      center: [41.6863, 2.4382],
      zoom: 10,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoMonICGC = L.tileLayer('https://geoserveis.icgc.cat/styles/icgc/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    }).addTo(map);
    const topoWebMonICGC = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/osm_suau/CAT3857_15/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoICGC = L.tileLayer(
      'https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/topo/GRID3857/{z}/{x}/{y}.jpeg', {
      maxZoom: 19,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoICGCWEB = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/topo_suau/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoICGCDark = L.tileLayer(
      'https://tilemaps.icgc.cat/mapfactory/wmts/nit_topo_suau/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 20,
      tms: false,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const topoICGCGris = L.tileLayer(
      'https://tilemaps.icgc.cat/mapfactory/wmts/gris_topo_suau/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const geologicICGC = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/geologia/MON3857NW/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const ortoICGC =
      L.tileLayer('https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
      });
     const ortoEsri = L.tileLayer(
              'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              maxZoom: 17,
              minZoom: 1,
              attribution: 'Tiles © Esri',
          })  
    const ortoICGC_H =
      L.tileLayer('https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
      });
    const ortoAugICGC =
      L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/orto_augmentada/CAT3857/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
      });
    const hibridICGC = L.tileLayer(
      'https://tilemaps.icgc.cat/mapfactory/wmts/hibrida_total/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const toponimICGC = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/toponimia/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const relleuICGC = L.tileLayer('https://tilemaps.icgc.cat/mapfactory/wmts/relleu/CAT3857/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Institut Cartogràfic i Geològic de Catalunya CC-BY-SA-3'
    });
    const hibrida = L.layerGroup([ortoICGC_H, hibridICGC,toponimICGC]);
    const ortoMon = L.layerGroup([ortoEsri, ortoICGC_H]);
    const mapaBase = {
      'Món topo ContextMaps ICGC': topoMonICGC,
      'Món top Web ICGC': topoWebMonICGC,
      'Món orto ICGC + ESRI': ortoMon,
      'Cat. Ortofoto': ortoICGC,
      'Cat. Orto Aug.': ortoAugICGC,
      'Cat. Clàssic': topoICGC,
      'Cat. Web': topoICGCWEB,
      'Cat. Geològic': geologicICGC,
      'Cat. Fosc': topoICGCDark,
      'Cat. Gris': topoICGCGris,
      'Cat. Híbrid (grup)': hibrida,
      'Cat. Toponímia': toponimICGC,
      'Cat. Relleu': relleuICGC
    };
    controlCapas = L.control.layers(mapaBase, null, {
      collapsed: false
    });
    controlCapas.addTo(map)
  }