// Creating map object
var myMap = L.map("map", {
    center: [14, -17],
    zoom: 2
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    // id: "mapbox/satellite-v9",
    accessToken: API_KEY
  }).addTo(myMap);
  
 // Store API query variables
 var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//console.log(url);

 var r;
 function getr(mag) {
    return r = mag * 130000
 }

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

// Grab the data with d3
d3.json(url, function(data) {
// console.log(data.features);
// console.log(data.features.length);

var features = data.features;
  
// Loop through data
for (var i = 0; i < features.length; i++) {
  
    var location = features[i].geometry;
    // console.log(location);
    // console.log(i);
  
// Check for location property
 if (location) {

 var prop = features[i].properties;

 var earth_quake = L.circle([location.coordinates[1], location.coordinates[0]], {
    color: "black",
    weight: 1,
    fillColor: getcolor(prop.mag),
    fillOpacity: 0.8,
    radius: getr(prop.mag)
    }).addTo(myMap);
    var dateobject = new Date(prop.time);
    var date = dateobject.toLocaleString();
    earth_quake.bindPopup(`<h2> Magnitude : ${prop.mag}</h2><hr> <b>At ${prop.place}</b> <hr><b> On ${date} GMT+8</b>`);

    }
   }
});

//add legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 2, 3, 4, 5],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
           '<li style="background-color:' + getcolor(grades[i] + 1) + '"> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</li>' : '+');
          }
    return div;
};

legend.addTo(myMap);
  