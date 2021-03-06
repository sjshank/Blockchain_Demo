/*
**  userController for handling user login/registration business logic 
*/

"use strict";

angular.module('bverifyApp')
    .controller('userController', ['userModel', 'userServiceAPI', 'appConstants', '$state',
        function (userModel, userServiceAPI, appConstants, $state) {
            var vm = this;
            if(!userModel.isLoggedIn){
                userModel.resetUser();
            }
            vm.user = userModel.getUser();
            vm.newUserObject = {};

            //register new user role. Only admin can add new user
            vm.doRegistration = function () {
                userServiceAPI
                    .register(vm.newUserObject)
                    .then(function (response) {
                        userModel.setUser(response.user);
                        vm.user = response.user;
                        $state.go('dashboard'); 
                    }, function (err) {
                        console.log(appConstants.FUNCTIONAL_ERR, err);
                    })
                    .catch(function (e) {
                        console.log(appConstants.FUNCTIONAL_ERR, e);
                    })
            }

            //login current user. Any registered user can login
            vm.doLogin = function () {
                userServiceAPI
                    .login(vm.user)
                    .then(function (response) {
                        userModel.setUser(response.user);
                        vm.user = response.user;
                        $state.go('dashboard'); //TO-DO this has to be redirect to dashboard screen
                    }, function (err) {
                        console.log(appConstants.FUNCTIONAL_ERR, err);
                    })
                    .catch(function (e) {
                        console.log(appConstants.FUNCTIONAL_ERR, e);
                    })
            }
}])
    .controller('logoutController', ['userModel', 'appConstants', '$state', '$rootScope',
        function (userModel, appConstants, $state, $rootScope) {
            try{
                var vm = this;
                userModel.resetUser();
                $rootScope.isLoggedIn = false;
                $state.go('home');
            }catch(e){
                console.log(appConstants.FUNCTIONAL_ERR, e);
            }
}]);