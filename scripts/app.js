// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;



  // //title
  // json.features[0].properties.title
  // //magnitude
  // json.features[0].properties.mag
  // //latitude
  // json.features[0].geometry.coordinates[0]
  // //longitude
  // json.features[0].geometry.coordinates[1]
  // //time
  // json.features[0].properties.time

$(document).on("ready", function() {
  $.ajax({
    method: 'GET',
    url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson",
    data: $('form').serialize(),
    dataType: 'json',
    success: onSuccess,
    //error:
  })

  function onSuccess(json){
    console.log(json);

    var source = $('#template').html();
    var template = Handlebars.compile(source);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 37.78, lng: -122.44}
      });

    for(var i=0; i<json.features.length; i++){
        var earthquakeHtml = template({

          magnitude: json.features[i].properties.mag,
          location: json.features[i].properties.place,

          //timeSince:
    })

    $('#earthquake_template').append(earthquakeHtml);

    var myLatLng = {
      lat: json.features[i].geometry.coordinates[1],
      lng: json.features[i].geometry.coordinates[0]
    };
    console.log(myLatLng);


    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!' + i
    });


}
  // var marker = new google.maps.Marker({
  //     position: {lat: 37.78, lng: -122.44},
  //     map: map,
  //     title: 'Hello World!' + i


  //   });


    // for(i=0; i<json.features.length; i++){
    //   for(j=0;)
    //   json.features[0].geometry.coordinates[0]
    //   json.features[0].geometry.coordinates[0]
    // }





    // console.log(Date.now());
    // console.log(json.features[0].properties.time);
    // console.log((Date.now())-(json.features[0].properties.time));
    // console.log(((Date.now())-(json.features[0].properties.time))/1000 /60 /60 /24);
  }




   // $('#earthquake_template').append(earthquakeHtml);

});
