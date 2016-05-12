// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

    initMap();

    $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    })
    .done(function(data){
        console.log("Title: ", data.features[0].properties.title);
        console.log("Coordinates: Lat: ", data.features[0].geometry.coordinates[1],
            "Coordinates: Lng: ", data.features[0].geometry.coordinates[0]);

        // handlebars shit
        var earthquakes = data.features;
        var source = $("#quakes-template").html();
        template = Handlebars.compile(source);
        var quakesTemplate = template({quakes: earthquakes});
        $quakesList = $("#info").append(quakesTemplate);

        earthquakes.forEach(function(quake){
            new google.maps.Marker({
                position: new google.maps.LatLng(quake.geometry.coordinates[1], quake.geometry.coordinates[0]),
                map: map,
                title: quake.properties.title
            })
            
        })


    })
    .fail(function(response){
        console.log("Error: ", response);
    });

});

function initMap(){
    var pos = {lat: 37.77, lng: -122.45};

    map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 2
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "San Francisco"
    })
}




