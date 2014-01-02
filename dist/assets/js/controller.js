'use strict';

/* Controllers */

angular.module('SharedServices', [])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            //alert('start spinner');
            $('#mydiv').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                //alert('stop spinner');
                $('#mydiv').hide();
                $('.hidden-content').removeClass('hidden-content');
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                //alert('stop spinner');
                $('#mydiv').hide();
                $('.hidden-content').removeClass('hidden-content');
                return $q.reject(response);
            });
        };
    });

var contentappControllers = angular.module('contentappControllers', ['SharedServices']);

contentApp.directive('carousel', function() {
	var res = {
     restrict : 'A',
     link     : function (scope, element, attrs) {
           scope.$watch(attrs.carousel, function(movies) {  
           	if(scope.movies.length > 0)
           	{
           		movies = scope.movies;
           		var genre = element.attr('data-genre');
           		var html = '';
	            for (var i = 0; i < movies.length; i++) {
	            	if ($.inArray(genre, movies[i].genres) != -1) {
	            	var movieTitleLink = movies[i].title.replace('/', ' ')
	                 html += '<div class="item">' +
						          '<div class="thumbnail carousel-movies">' +
						            '<a href="index.html#/movies/' + movies[i].title.replace('/', '%252F') + '"><img alt="100%x180" src="assets/img/posters/' + movieTitleLink + '.jpg"></a>' +
						          '</div>' +
						          '<span><a href="index.html#/movies/' + movies[i].title.replace('/', '%252F') + '">' + movies[i].title + '</a></span>' +
						        '</div>';
						    };
	            }
            
            	element[0].innerHTML = html;

            	setTimeout(function() {
	            $(element).owlCarousel({
						items : 8,
						itemsDesktop : [1199,6],
						itemsDesktopSmall : [980,4],
						itemsTablet: [768,3],
						itemsMobile: [479, 2]
					});

            	$("#owl-example").owlCarousel({
					    items : 3,
					    itemsDesktop : [1199,3],
					    itemsDesktopSmall : [980,3],
					    itemsTablet: [768,2]
					});
	           }, 0);
			}
        	
        });
       }
   };
  return res;
});

contentApp.controller('MovieListCtrl', ['$scope', '$http', '$templateCache', 
	function($scope, $http, $templateCache) {
	  	$scope.url = 'http://movieapi-neo4j.herokuapp.com/api/v0/movies?api_key=special-key&neo4j=false';
	  	$scope.movies = [];

	  	var fetchMovies = function()
	  	{
	  		$http({method: 'GET', url: $scope.url, cache: $templateCache}).
			    success(function(data, status, headers, config) {
			    	$scope.movies = data;
			    }).
			    error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    });
	  	}

	  	fetchMovies();
	}]);


contentApp.directive('carouselactors', function() {
	var res = {
     restrict : 'A',
     link     : function (scope, element, attrs) {
           scope.$watch(attrs.carouselactors, function(movie) {  
           	if(scope.movie != undefined ? scope.movie.actors != undefined ? scope.movie.actors.length > 0 : false : false)
           	{
           		movie = scope.movie;
           		var html = '';
	            for (var i = 0; i < movie.actors.length; i++) {
	            	var actorTitleLink = movie.actors[i].replace('/', ' ')
	                 html += '<div class="item">' +
						          '<div class="thumbnail">' +
						            '<a href="index.html#/actors/' + movie.actors[i] + '"><img src="/assets/js/holder.js/100x148"/></a>' +
						          '</div>' +
						          '<span><a href="index.html#/actors/' + movie.actors[i] + '">' + movie.actors[i] + '</a></span>' +
						        '</div>';

	            }
            //src="assets/img/actors/' + actorTitleLink + '.jpg"
            	element[0].innerHTML = html;

            	setTimeout(function() {
	            $(element).owlCarousel({
					items : 6,
					itemsDesktop : [1199,6],
					itemsDesktopSmall : [980,4],
					itemsTablet: [768,3],
					itemsMobile: [479, 2]
				});
				Holder.run();
	           }, 0);
			}
        	
        });
       }
   };
  return res;
});


contentApp.controller('MovieItemCtrl', ['$scope', '$routeParams', '$http', '$templateCache',
  function($scope, $routeParams, $http, $templateCache) {
  		console.log('http://movieapi-neo4j.herokuapp.com/api/v0/movies/title/' + encodeURIComponent(decodeURI(decodeURI($routeParams.movieId))) + '?api_key=special-key&neo4j=false');
  		$scope.url = 'http://movieapi-neo4j.herokuapp.com/api/v0/movies/title/' + encodeURIComponent(decodeURI(decodeURI($routeParams.movieId))) + '?api_key=special-key&neo4j=false';
	  	var fetchMovie = function()
	  	{
	  		$http({method: 'GET', url: $scope.url, cache: $templateCache}).
			    success(function(data, status, headers, config) {
			    	$scope.movie = data;
			    	$scope.movie.poster = $scope.movie.title.replace("/", " ");
			    }).
			    error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    });
	  	}

	  	fetchMovie();
  }]);
			