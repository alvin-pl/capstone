
//-----------------------------Google maps api------------------------------------------//

const apikey = 'AIzaSyDI_pp8KgR-Dd6NA08tUStdd0xksdfS6vU';
const searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?parameters';

//created a function to return nearby museums
/* function getNearbyMuseum() {
    var value = $('.textfield').val();

    if (value !== "") {
        var museumResult = initialize(museumRequest);
        $('#nearbyResults').html(museumResult);
    }
} 

var map;
var service;
var infowindow;

function initialize(request) { // <--added an argument 
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    var request = {
        location: pyrmont,
        radius: '500',
        type: ['museum']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    return `${request.type}` //added return function
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        var place = results[i];
            createMarker(results[i]);
        }
    }
}

getNearbyMuseum(); */



function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Sydney, Australia
    pos = { lat: -33.856, lng: 151.215 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;
    /* TODO: Step 3B3, Call the Places Nearby Search */
    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
}

/* TODO: Step 3B1, Call the Places Nearby Search */
// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'sushi'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}
/* TODO: Step 3C, Generate markers for search results */
// Set markers at the location of each place result
function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });



//-----------------------------implement "HERE" api------------------------------------------//


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
     searchText: '100 legends way boston, ma'
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

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.geocode(geocodingParams, onResult, function (e) {
    alert(e);
});
    });


//-----------------------------display geocoding results on the map (search address)------------------------------------------//

$('form').submit(function(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    geocodingParams.searchText = e.target[0].value;
    geocoder.geocode(geocodingParams, onResult, console.log("This is where I am",e));
});



//-----------------------------map reacts to mouse touch (pinch zoom)------------------------------------------//

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
map.addEventListener('tap', function (evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
});

// Instantiate the default behavior, providing the mapEvents object: 
var behavior = new H.mapevents.Behavior(mapEvents);



//--------------------------------Reverse geocoding map locations---------------------------------------//

// Create the parameters for the reverse geocoding request:
var reverseGeocodingParameters = {
    prox: '52.5309,13.3847,150',
    mode: 'retrieveAddresses',
    maxresults: 1
};

// Define a callback function to process the response:
function onSuccess(result) {
    var location = result.Response.View[0].Result[0];

    // Create an InfoBubble at the returned location with
    // the address as its contents:
   ui.addBubble(new H.ui.InfoBubble({
        lat: location.Location.DisplayPosition.Latitude,
        lng: location.Location.DisplayPosition.Longitude
    }, { content: location.Location.Address.Label }));
};

// Get an instance of the geocoding service:
var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.reverseGeocode(reverseGeocodingParameters, onSuccess, function (e) { 
    alert(e);
});



//---------map shows the scale bar, zoom control, and the map selector bottom------------//

// Create the default UI:
  var ui = H.ui.UI.createDefault(map, defaultLayers);