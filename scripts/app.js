// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var gaLocations = "scripts/ga4.json";
var $quakesList;
var $campusList;
var map;
var gaImage = "ga-image.png";

$(document).on("ready", function() {
    initMap();
    $campusList = $.ajax({
        method: "GET",
        url: gaLocations
    })
    .done(function(response){
        console.log("success!");
        var gaLocations = response.campuses;
        createMarkers(gaLocations, gaImage);
    })
    .fail(function(response){
        console.log("Error: ", response);
    });

    $quakesList = $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    })
    .done(function(data){
       // console.log(data);
       var earthquakes = data.features;
       // console.log(earthquakes);
       var quakeIcon = "earthquake.png";
       createMarkers(earthquakes, quakeIcon);
       compileHandlebarsTemplate(earthquakes, "#info", "#quakes-template");
    })
    .fail(function(response){
    console.log("Error: ", response);
    });

});


    function createMarkers(locationArray, customIcon){
        locationArray.forEach(function(location){
            var tempLat = location.geometry.coordinates[1];
            var tempLng = location.geometry.coordinates[0];
            var tempContentString = "<p>" + location.properties.title + "</p>";
            
            var tempInfowindow = new google.maps.InfoWindow({
                content: tempContentString
            });


            var tempMarker = new google.maps.Marker({
                position: new google.maps.LatLng(tempLat, tempLng),
                map: map,
                title: location.properties.title,
                icon: customIcon
            });
            tempMarker.addListener('click', function(){
                tempInfowindow.open(map, tempMarker);
            });
        });
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

        // var marker = new google.maps.Marker({
        //     position: pos,
        //     map: map,
        //     title: "San Francisco",
        //     icon: "ga-image.png"
        // });
    }




