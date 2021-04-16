// Creating map object
var myMap = L.map("map", {
    center: [40, -3.7],
    zoom: 2
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
 // Store API query variables
 var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

 console.log(url);

 var r;
 function getr(mag) {
    return r = mag * 100000
 }

 var color;
 function getcolor(mag) {
     if (mag > 5) { color = "#bd0026";}
     else if (mag > 4) {color = "#f03620";}
     else if (mag > 3) {color = "#fd8d3c";}
     else if (mag > 2) {color = "#feb24c";}
     else if (mag > 1) {color = "#fed976";}
     else {color = "#d1ff52";}
     return color
 }

 // Grab the data with d3
d3.json(url, function(data) {


console.log(data.features);
console.log(data.features.length);

var features = data.features;
  
// Loop through data
for (var i = 0; i < features.length; i++) {
  
    var location = features[i].geometry;
    console.log(location);
    console.log(i);
  
// Check for location property
    if (location) {

    var prop = features[i].properties;

    var marker = L.circle([location.coordinates[1], location.coordinates[0]], {
            color: null,
            fillColor: getcolor(prop.mag),
            fillOpacity: 0.75,
            radius: getr(prop.mag)
          }).addTo(myMap);


    var dateobject = new Date(prop.time);
    var date = dateobject.toLocaleString();
    // var date = toLocaleDateString(prop.time);

    marker.bindPopup(`<h2> Magnitude : ${prop.mag}</h2><hr> At ${prop.place} <hr> On ${date}`);

  
    }
   }
  
});
  