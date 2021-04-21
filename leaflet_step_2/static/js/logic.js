

 // Store API query variables
 var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//  var tect = "static/GeoJSON/PB2002_boundaries.json";
 var tect = "static/GeoJSON/PB2002_plates.json";

//r workshop
 var r;
 function getr(mag) {
    return r = mag * 130000
 }

 //color workshop
 var color;
 function getcolor(mag) {
     if (mag > 5) { color = "#f50031";}
     else if (mag > 4) {color = "#f85d5d";}
     else if (mag > 3) {color = "#ff7b00";}
     else if (mag > 2) {color = "#f7d702";}
     else if (mag > 1) {color = "#dbf702";}
     else {color = "#44F702";}
     return color
 }
 
var feat;
var eq;
var earth_quake;
var tectonic_plates;

 // Grab the url data with d3
d3.json(url, function(data) {
  feat = data.features;

  var earthquake = [];
  

  // Loop through data
  for (var i = 0; i < feat.length; i++) {
  
   var location = feat[i].geometry;
  
   // Check for location property
   if (location) {
     eq = "";
     var prop = feat[i].properties;

     eq = L.circle([location.coordinates[1], location.coordinates[0]], {
     color: "black",
     weight: 1,
     fillColor: getcolor(prop.mag),
     fillOpacity: 0.8,
     radius: getr(prop.mag)
     });

     var dateobject = new Date(prop.time);
     var date = dateobject.toLocaleString();

     eq.bindPopup(`<h2> Magnitude : ${prop.mag}</h2><hr> <b>At ${prop.place}</b> <hr><b> On ${date} GMT+8</b>`);

     earthquake.push(eq);       
    } 
  }
  
  earth_quake = L.layerGroup(earthquake);

  var tectonicp;
  
  d3.json(tect, function(data) {
  // console.log("data loaded");

  // Creating a geoJSON layer with the retrieved data
  tectonic_plates = L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "#DCD241",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "null",
        fillOpacity: 0,
        weight: 1.5
      };
    }
    });
    
   
//    tectonic_plates = L.layerGroup(tectonicp);

//    console.log(tectonic_plates);

// //add legend
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//     grades = [0, 1, 2, 3, 4, 5],
//     labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//         //    '<li style="background-color:' + getcolor(grades[i] + 1) + '"></li> ' +
//            '<li style="background-color:' + getcolor(grades[i] + 1) + '"> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</li>' : '+');
// }
// return div;
// };
// legend.addTo(earth_quake);


 // building base layer options
 var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
  });


var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
  });

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
  });

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
  });

// Only one base layer can be shown at a time
var baseMaps = {
  Streets: streets,
  Satellite: satellite,
  Light: light,
  Dark: dark
};

//build overlayMaps
var overlayMaps = {
  Earth_quake: earth_quake,
  Tectonic_plates: tectonic_plates
};

// Creating default base map 
var myMap = L.map("map", {
  center: [13.5, 2.1],
  zoom: 2,
  layers: [streets, earth_quake]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});

});



  