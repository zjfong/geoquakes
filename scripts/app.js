// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

    $quakesList = $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    });

    $quakesList.done(function(data){

       var earthquakes = data.features;

        // var source = $("#quakes-template").html();
        // template = Handlebars.compile(source);

        // var quakesTemplate = template({quakes: earthquakes});
        for (var i = 0; i < earthquakes.length; i++){
        var quakesTemplate = "<p>" + earthquakes[i].properties.title + "</p>" +
        "<h3>LATITUDE: " + earthquakes[i].geometry.coordinates[0] + "</h3>";
        $("#info").append(quakesTemplate);
        }
    });

    $quakesList.fail(function(response){
        console.log("Error: ", response);
    });
});


