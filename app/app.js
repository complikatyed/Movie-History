var app = angular.module("MovieHistory", ["ngRoute"])
  .constant("firebaseURL","https://groovymoviehistory.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
})

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL"
        }).
        when("/main", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL"
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        // when("/", {
        //     templateUrl: "partials/",
        //     controller: ""
        // }).
        otherwise("/");
});

app.run(($location) =>{
  let movieRef = new Firebase("https://groovymoviehistory.firebaseio.com/");

  movieRef.onAuth(authData =>{
    if(!authData){
      $location.path("/login");
    }
  })
})

