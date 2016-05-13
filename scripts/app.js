// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var gaLocations = "scripts/ga3.json";
var $quakesList;
var map;
var gaImage = "ga-image.png";


$(document).on("ready", function() {

    initMap();

    $.getJSON(gaLocations, function(json){
        console.log(json);

        var gaCampuses = json.location;
        createMarkers(gaCampuses, gaImage);

    });

    $quakesList = $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    })
    .done(function(data){
       // console.log(data);
       var earthquakes = data.features;
       var quakeIcon = "earthquake.png";
       createMarkers(earthquakes, quakeIcon);
       compileHandlebarsTemplate(earthquakes, "#info", "#quakes-template");
    })
    .fail(function(response){
    console.log("Error: ", response);
    });

});

    // OPTION 1: Write function mungeData()


    function createMarkers(locationArray, customIcon){
        locationArray.forEach(function(location){
            var tempLat = location.geometry.coordinates[1];
            var tempLng = location.geometry.coordinates[0];
            var tempContentString = "<p>" + location + "</p>";
            
            var tempInfowindow = new google.maps.InfoWindow({
                content: tempContentString
            });


            var tempMarker = new google.maps.Marker({
                position: new google.maps.LatLng(tempLat, tempLng),
                map: map,
                title: "I am a pilgrim",
                icon: customIcon
            });
            tempMarker.addListener('click', function(){
                tempInfowindow.open(map, tempMarker);
            })
            
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

        // var marker = new google.maps.Marker({
        //     position: pos,
        //     map: map,
        //     title: "San Francisco",
        //     icon: "ga-image.png"
        // });
    }




