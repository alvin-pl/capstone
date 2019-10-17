
// Instantiate a map and platform object:
var platform = new H.service.Platform({
    'apikey': '-Huq0JQnMKPQSvuveScd7Y7gNc--owCHM2lu_fr0BSo'
});

// Retrieve the target element for the map:
var targetElement = document.getElementById('mapContainer');

// Get default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 18,
        //center: { lat: 52.52, lng: 13.4 }
    });

// Create the parameters for the geocoding request:
 var geocodingParams = {
     searchText: '1111 South Figueroa Street Los Angeles, California'
}; 

// Define a callback function to process the geocoding response:
var onResult = function (result) {
    var locations = result.Response.View[0].Result,
        position,
        marker;

    // Add a marker for each location found
    for (i = 0; i < locations.length; i++) {
        position = {
            lat: locations[i].Location.DisplayPosition.Latitude,
            lng: locations[i].Location.DisplayPosition.Longitude,
        };
        marker = new H.map.Marker(position);
        map.setCenter(position);
        map.addObject(marker);
    }
};

// Get an instance of the geocoding service:
var geocoder = platform.getGeocodingService();


$('form').submit(function(e) {
    e.preventDefault();
    geocodingParams.searchText = e.target[0].value;
    geocoder.geocode(geocodingParams, onResult, console.log("This is where I am",e));
});

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.geocode(geocodingParams, onResult, function (e) {
    alert(e);
});


