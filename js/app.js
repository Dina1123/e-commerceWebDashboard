angular.module("myApp",["ngAnimate","ngSanitize","ui.router","ui.bootstrap","mds"])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("app", {
                url: "/app",
                views: {
                    main: {
                        templateUrl: "templates/main.html",
                        controller: "appCtrl"
                    }
                }
            })
            .state("app.home", {
                url: "/home",
                views: {
                    sub: {
                        template: "<h1>Welcome</h1>"
                    }

                    }
                })

                .state("app.register", {
                    url: "/register",
                    views: {
                        sub: {
                            templateUrl: "templates/register.html",
                            controller: "registerCtrl"

                        }
                    }
                })

            .state("app.login", {
                url: "/login",
                views: {
                    sub: {
                        templateUrl: "templates/login.html",
                        controller: "loginCtrl"

                    }
                }
            })
            .state("app.elect", {
                url: "/elect",
                views: {
                    sub: {
                        templateUrl: "templates/elect.html",
                        controller: "electCtrl"

                    }
                }
            })
        $urlRouterProvider.otherwise("/app/home")






    })