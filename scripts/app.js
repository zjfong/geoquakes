// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
// var template;

$(document).on("ready", function() {

    initMap();

    $quakesList = $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    })
    .done(function(data){
        onSuccess(data);
    })
    .fail(function(response){
    console.log("Error: ", response);
    });

});

    function onSuccess(data){
       var earthquakes = data.features;
       createMarkers(earthquakes);
       compileHandlebarsTemplate(earthquakes, "#info", "#quakes-template");
    }

    function createMarkers(locationArray){
        locationArray.forEach(function(location){
            var tempLat = location.geometry.coordinates[1];
            var tempLng = location.geometry.coordinates[0];
            new google.maps.Marker({
                position: new google.maps.LatLng(tempLat, tempLng),
                map: map,
                title: location.properties.title
            });
            
        })
    }

    function compileHandlebarsTemplate(data, targetHtml, targetScript){
        var source = $(targetScript).html();
        template = Handlebars.compile(source);

        var dataTemplate = template({quakes: data});

        $(targetHtml).append(dataTemplate);
    }

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
        });
    }




