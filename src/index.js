/*
  Developed By: Vinay Manala https://www.github.com/VinayManala
  Year of published: 2021-22
*/

var storeLocationDataUrl = 'https://eonet.gsfc.nasa.gov/api/v3/events';

var eventsList = ['Wildfires','Volcanoes','Severe Storms','Sea and Lake Ice'];

//The maximum zoom level to cluster data point data on the map.
var maxClusterZoomLevel = 11;

var map, popup, datasource,layer, centerMarker, searchURL, latitude, longitude,query,queryByName;

var title,description,sourcesId,sourcesURL,lat,lon;

const matchlist = document.getElementById('matchlist');
const search = document.getElementById('search');
// var myInit = { 
//   method: 'GET',
//   mode:'no-cors',
//   // body:JSON.stringify(""),
//   headers: new Headers({
//   "Content-Type": "application/json",
//   //  "Accept":"application/json",
//    "Access-Control-Allow-Origin" : "*", 
//   //  "Access-Control-Allow-Credentials" : true 
//   }
// )}

const searchEvents = async (searchText) =>{    
  const res = await fetch(storeLocationDataUrl);
  const events = await res.json();
  console.log(events);


  let matches = events.events.filter(event => {
    const regex = new RegExp(`^${searchText}`,'gi');
    return event.id.match(regex) || event.title.match(regex);
  });

  if (searchText.length === 0){
    matches = [];
    matchlist.innerHTML = "";
    document.getElementById("infoPanel").innerHTML = "Event Details";
  }

  outputHtml(matches);
};

const outputHtml = matches => {
  if(matches.length > 0){
    const html = matches.map(match =>      
      `
      <div >
        <h5>${match.title} (${match.id})
        <button onclick="findLocation()" id="eventInfo" class=${match.sources[0].url}  name =${match.sources[0].id} value=[${match.geometry[0].coordinates[0]},${match.geometry[0].coordinates[1]}]></button>
        <span id="title" style="display:none">${match.categories[0].title}</span>
        <span id="description" style="display:none">${match.title}</span>
        <span id="eonet-id" style="display:none" >${match.id}</span>
        <span id="sourceId" style="display:none" >${match.sources[0].id}</span>
        <span id="sourceURL" style="display:none" >${match.sources[0].url}</span>
        <span id="lat" style="display:none">${match.geometry[0].coordinates[0]}</span>
        <span id="lon" style="display:none">${match.geometry[0].coordinates[1]}</span>

        </h5>
        </div>
      `).join("");
    matchlist.innerHTML = html;
    // var countrySet = ['US', 'CA', 'GB', 'FR','DE','IT','ES','NL','DK'];
  }

}

  function findLocation(e){
    e = e || window.event;
    matchlist.addEventListener("click", e => {
      var coord = e.target.value;
      coord = JSON.parse(coord);
      latitude = coord[0];
      longitude = coord[1];
      datasource.add([
       new atlas.data.Feature(new atlas.data.Point([latitude,longitude]), {
       }),
     ]);
     // console.log(e);
    eve = e.target
    title = eve.nextElementSibling.innerText;
    description = eve.nextElementSibling.nextElementSibling.innerText;
    eventId = eve.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    sourcesId = eve.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    sourcesURL = eve.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    lat = eve.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    lon = eve.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    queryTitle = description.slice(description.indexOf(",")+1)
    query =  [latitude,longitude] && queryTitle;
    searchURL.searchFuzzy(atlas.service.Aborter.timeout(3000),query,{
        radius: 100,
        limit: 100
    }).then(results => {
        //Parse the response into GeoJSON so that the map can understand.
        var data = results.geojson.getFeatures();

        if (data.features.length > 0) {
            //Set the camera to the bounds of the results.
            // map.setCamera({
            //     bounds: data.features[0].bbox,
            //     padding: 100
            // });

        } else {
            document.getElementById('searchPanel').innerHTML = '<div class="statusMessage">Unable to find the location you searched for.</div>';
        }

        htmlText = `
        <table>
        Event Details
        <tr>
        <td>Title:  </td>
        <td>${title}</td>
        </tr>
        <tr>
        <td>Description:  </td>
        <td>${description}</td>
        </tr>
        <tr>
        <td>Source:</td>
        <td><a href=${sourcesURL}>${sourcesId}</a></td>
        </tr>
        <tr>
        <td>EONET ID:  </td>
        <td>${eventId}</td>
        </tr>
        <tr>
        <td>latitude:  </td>
        <td>${lat}</td>
        </tr>
        <tr>
        <td>longitude:  </td>
        <td>${lon}</td>
        </tr>
        </table>
        `;

        document.getElementById("infoPanel").innerHTML = htmlText;
    });
    });
}  

// search.addEventListener("input", ()=> searchEvents(search.value))


function GetMap(){
    //Add Map Control JavaScript code here.
    //Instantiate a map object
   map = new atlas.Map("myMap", {
       //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
       language: 'en-US',
       zoom: 1.2,
        view: 'Auto',
        style:'road_shaded_relief',
       authOptions: {
           authType: 'subscriptionKey',
           subscriptionKey: 'BSNRVQfIj6OfMI00dIk06sjnr0y2W617EBS7Ge6hmv4'
           }
         });
         //
         // //Use SubscriptionKeyCredential with a subscription key
         // const subscriptionKeyCredential = new atlas.servuce.SubscriptionKeyCredential(atlas.getSubscriptionKey());
         //
         // //Use subscriptionKeyCredential to create a pipeline
         // const pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential, {
         //     retryOptions: { maxTries: 4 } // Retry options
         // });

         // Use SubscriptionKeyCredential with a subscription key

         var subscriptionKeyCredential = new atlas.service.SubscriptionKeyCredential(atlas. getSubscriptionKey());

         // Use subscriptionKeyCredential to create a pipeline
         var pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);

         // Construct the SearchURL object
         searchURL = new atlas.service.SearchURL(pipeline);



         //If the user selects the My Location button, use the Geolocation API (Preview) to get the user's location. Center and zoom the map on that location.
         document.getElementById('myLocationBtn').onclick = setMapToUserLocation;

         //Wait until the map resources are ready.
       map.events.add('ready', function() {

         //Add a zoom control to the map.
          map.controls.add(new atlas.control.ZoomControl(), {
             position: 'top-right'
          });

          map.setStyle({
            language: "en-US"
          })

          //Add an HTML marker to the map to indicate the center to use for searching.
          centerMarker = new atlas.HtmlMarker({
             htmlContent: '<div class="mapCenterIcon"></div>',
             position: map.getCamera().center
          });

          map.markers.add(centerMarker);

          //
          search.addEventListener("input", ()=> searchEvents(search.value));
           //Create a data source and add it to the map.
           datasource = new atlas.source.DataSource(null, {
             cluster: true,
             clusterMaxZoom: maxClusterZoomLevel - 1
           });

           map.sources.add(datasource);

                 symbolLayer = new atlas.layer.SymbolLayer(datasource, null, { iconOptions: {
                   allowOverlap: true,
                   image: 'pin-red',
                 },
                 });
                  map.layers.add(symbolLayer);
                  //Create a popup but leave it closed so we can update it and display it later.
                  map.events.add('click', symbolLayer, showPopup);
                  popup = new atlas.Popup();

               // textOptions: {
               //   textField:  ,
               //          size: 12,
               //          font: ['StandardFont-Bold'],
               //          offset: [0, 0.4],
               //          color: 'white'
               //
               // }

           // console.log(latitude,longitude);

          //Create a layer that defines how to render the points on the map.
                // ??

           //Add a layer for rendering point data.
           // var resultLayer = new atlas.layer.SymbolLayer([latitude,longitude], null, {
           //     iconOptions: {
           //         image: 'pin-round-darkblue',
           //         anchor: 'center',
           //         allowOverlap: true
           //     },
           //     textOptions: {
           //         anchor: "top"
           //     }
           // });
           //
           // map.layers.add(resultLayer);

           //Create a bubble layer to render clustered data points.
             // var clusterBubbleLayer = new atlas.layer.BubbleLayer(datasource, null, {
             //     radius: 12,
             //     color: '#007faa',
             //     strokeColor: 'white',
             //     strokeWidth: 2,
             //     filter: ['has', 'point_count'] //Only render data points that have a point_count property; clusters have this property.
             // });

             //Create a symbol layer to render the count of locations in a cluster.
             // var clusterLabelLayer = new atlas.layer.SymbolLayer(datasource, null, {
             //     iconOptions: {
             //         image: 'none' //Hide the icon image.
             //     },
             //
             //     textOptions: {
             //         textField: ['get', 'point_count_abbreviated'],
             //         size: 12,
             //         font: ['StandardFont-Bold'],
             //         offset: [0, 0.4],
             //         color: 'white'
             //     }
             // });
             //
             // map.layers.add([clusterBubbleLayer, clusterLabelLayer]);

             //Load a custom image icon into the map resources.
             // map.imageSprite.add('myCustomIcon', iconImageUrl).then(function() {
             //
             //    //Create a layer to render a coffee cup symbol above each bubble for an individual location.
             //    iconLayer = new atlas.layer.SymbolLayer(datasource, null, {
             //        iconOptions: {
             //            //Pass in the ID of the custom icon that was loaded into the map resources.
             //            image: 'myCustomIcon',
             //
             //            //Optionally, scale the size of the icon.
             //            font: ['SegoeUi-Bold'],
             //
             //            //Anchor the center of the icon image to the coordinate.
             //            anchor: 'center',
             //
             //            //Allow the icons to overlap.
             //            allowOverlap: true
             //        },
             //
             //        filter: ['!', ['has', 'point_count']] //Filter out clustered points from this layer.
             //    });
             //
             //    map.layers.add(iconLayer);
             //
             //    //When the mouse is over the cluster and icon layers, change the cursor to a pointer.
             //    map.events.add('mouseover', [clusterBubbleLayer, iconLayer], function() {
             //        map.getCanvasContainer().style.cursor = 'pointer';
             //    });
             //
             //    //When the mouse leaves the item on the cluster and icon layers, change the cursor back to the default (grab).
             //    map.events.add('mouseout', [clusterBubbleLayer, iconLayer], function() {
             //        map.getCanvasContainer().style.cursor = 'grab';
             //    });
             //
             //    //Add a click event to the cluster layer. When the user selects a cluster, zoom into it by two levels.
             //    map.events.add('click', clusterBubbleLayer, function(e) {
             //        map.setCamera({
             //            center: e.position,
             //            zoom: map.getCamera().zoom + 2
             //        });
             //    });
             //
             //    //Add a click event to the icon layer and show the shape that was selected.
             //    map.events.add('click', iconLayer, function(e) {
             //        showPopup(e.shapes[0]);
             //    });
             //
             //    //Add an event to monitor when the map is finished rendering the map after it has moved.

             // Add a click event to the layer.
                // map.events.add('render', function() {
                    // Update the data in the list.
                    // loadStoreData();

                // });
             // });
           });
     }

function setMapToUserLocation() {
         //Request the user's location.
         document.getElementById("infoPanel").innerHTML = 'Event Details';
         navigator.geolocation.getCurrentPosition(function(position) {
             //Convert the Geolocation API (Preview) position to a longitude and latitude position value that the map can interpret and center the map over it.
             map.setCamera({
                 center: [position.coords.longitude, position.coords.latitude],
                 zoom: maxClusterZoomLevel + 1
             });
         }, function(error) {
             //If an error occurs when the API tries to access the user's position information, display an error message.
             switch (error.code) {
                 case error.PERMISSION_DENIED:
                     alert('User denied the request for geolocation.');
                     break;
                 case error.POSITION_UNAVAILABLE:
                     alert('Position information is unavailable.');
                     break;
                 case error.TIMEOUT:
                     alert('The request to get user position timed out.');
                     break;
                 case error.UNKNOWN_ERROR:
                     alert('An unknown error occurred.');
                     break;
             }
         });
     }

     function showPopup(e) {
                 if (e.shapes && e.shapes.length > 0) {
                     var properties = e.shapes[0].getProperties();

                     popup.setOptions({
                         //Update the content of the popup.
                         content: atlas.PopupTemplate.applyTemplate(properties, properties.popupTemplate),

                         //Update the position of the popup with the pins coordinate.
                         position: e.shapes[0].getCoordinates()
                     });

                     //Open the popup.
                     popup.open(map);
                 }
             }

function loadStoreData(latitude,longitude) {
  var center = [latitude, longitude];
  var offset;

  if (map.getCanvas().width < 700){
    offset = [0,-80];
  }

  map.setCamera({
    center: center,
    padding:140,
    // offset: offset
  })
}

window.onload = GetMap;
