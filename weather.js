var cityIds = [
     4180439,
     5128638,
     4560349,
     4726206,
     4671654,
     5809844,
     5368361,
     5391811,
     5308655,
     4684888,
     4887398,
     5391959,
     5392171,
     4164138,
     4273837,
     5746545,
     4699066,
     5419384,
     4990729
];

var myMap;
function initMap() {
     myMap = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.099727, lng: -94.578567},
          zoom: 5
     });
}

var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope, $http){
     $scope.myVar = 'this is my weather application';
     /* do an ajax call to get the weather data */
     $http.get('http://api.openweathermap.org/data/2.5/group?id=' + cityIds.join() + '&units=imperial&APPID=eac2948bfca65b78a8c5564ecf91d00e')
     .success(function(weatherData){
          var listOfMarkers = weatherData.list.map(function(oneCity){
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
                    title: oneCity.name});
               });

               $scope.weatherInfo = weatherData.list; /* not sure why I cannot pass $scope.weatherData as the input of success above but that doesn't work */

               var listOfInfoWindows = weatherData.list.map(function(oneCity){
                    return new google.maps.InfoWindow({
                         content:  '<h4>' + oneCity.name + '</h4>' + '<p>' + oneCity.main.temp + 'degrees F</p>' + '<p>' + oneCity.main.temp_max + 'degrees F</p>' + '<p>' + oneCity.main.temp_min + 'degrees F</p>' + '<p>' + oneCity.main.pressure + 'degrees F</p>' + '<p>' + oneCity.main.humidity + 'degrees F</p>' + '<p>' + oneCity.wind.speed + 'degrees F</p>'
                    });
               }); 
          });  /* success */
     });  /* myApp */
