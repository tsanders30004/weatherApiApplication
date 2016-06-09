/* make AJAX call to get the weather data for several cities */
$.ajax({
     url: 'http://api.openweathermap.org/data/2.5/group?id=' + cityIds.join() + '&units=imperial&APPID=eac2948bfca65b78a8c5564ecf91d00e',
     method:   'GET',
     success:  function(weatherData){
          console.log('Data returned from Ajax: ', weatherData);

          /* this code shows markers for all cities on the array */
          var listOfMarkers = weatherData.list.map(function(oneCity){

               /* format of icon URL */
               /* http://openweathermap.org/img/w/{{result.weaher[0].icon}}.png */

               return new google.maps.Marker({
                    position: {lat: oneCity.coord.lat, lng: oneCity.coord.lon},
                    map: myMap,
                    animation: google.maps.Animation.DROP,
                    icon: {
                         url: 'http://openweathermap.org/img/w/' + oneCity.weather[0].icon + '.png',
                         size: new google.maps.Size(50, 50),
                         origin: new google.maps.Point(0, 0),
                         anchor: new google.maps.Point(25, 25)
                    },
                    title: oneCity.name})
               });

               console.log('the weather icon code is at weatherData.list[i].weather[0].icon.  you have to append png')
               console.log('a sample url for a weather icon is:  http://openweathermap.org/img/w/01d.png')

               /* and now, populate the sidebar with city name/temperate data */
               var listOfCitiesWithTemp = weatherData.list.map(function(oneCity){
                    return '<tr><td>' + oneCity.name + '</td><td>' + oneCity.main.temp + '</td></tr>';
               });

               console.log(listOfCitiesWithTemp);

               document.getElementById('sidebar').innerHTML = '<table>' + listOfCitiesWithTemp.join('') + '</table>';

               debugger;
          }
     });
