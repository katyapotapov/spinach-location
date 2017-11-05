// "use strict";

var map;
var infowindow;
var tag='store';
var dist=500;

$(function() {

$('#bt').click(function() {
  tag=$('#type').val();
  dist=$('#distance').val() * 1000;
  initMap();
});

});

function initMap() {

  var pyrmont= {
  //Peterborough
    lat: 44.356824,
    lng: -78.290945
    //Waterloo
    // lat: 43.478318,
    // lng: -80.536702
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: dist,
    type: tag
  }, callback);

  // });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log("Created marker");
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// );
