'use strict';

angular.module('tokenauthApp')
 .service('auth', function 	($http, API_URL, authToken, $state, $window){      
      function authSuccess(res){
  		authToken.setToken(res.token);
  		$state.go('main');
      }

      this.login = function(email, password){
      	return $http.post(API_URL + 'login', {
      		email: email, 
      		password: password
      	}).success(authSuccess); 
      };

      this.register = function(email, password){
      	return $http.post(API_URL + 'register', {
      		email: email,
      		password: password
      	}).success(authSuccess);
      };

      var urlBuilder = [];
      urlBuilder.push('response_type=code', 
        'client_id=285471473072-rolf3qaodbpjp3fhhkq56sqhbdddcmsh.apps.googleusercontent.com',
        'redirect_uri=' + window.location.origin,
        'scope=profile email');

      this.googleAuth = function(){

        console.log(window.location.origin);
        var url = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilder.join('&');
        var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ", top=" + ($window.outerHeight - 500) / 2.5;

        $window.open(url, '', options);
      };
 });