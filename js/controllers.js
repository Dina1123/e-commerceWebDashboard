angular.module("myApp")
    .controller("appCtrl",function ($scope,$rootScope,$state,$http2,$timeout,$interval) {
        $rootScope.url="http://localhost/MY PROJECT/myApp1/api/"
        $rootScope.imgUrl="http://localhost/MY PROJECT/myApp1/"

    })
.controller("registerCtrl",function ($scope,$rootScope,$state,$http2,$timeout,$interval){
    $scope.register= function (){
        $http2.post($rootScope.url+"register.php",{
            // id: $scope.id,
            name :$scope.name,
            tel :$scope.tel,
            addr :$scope.addr,
            username:$scope.username,
            password :$scope.password,


        }).then(function (resp){
            if (resp.data.status){
                toastr.success("Registered Successfully !","Success",{timeOut:2000})
                $rootScope.id = resp.data.id
                $rootScope.name=$scope.name
                $scope.$apply()
                $state.go("app.elect")
             
                
            }

            else {
                toastr.error("Something went wrong!","Error",{timeOut:2000})
            }

            }
        )


    }




})
.controller("loginCtrl" , function ($scope,$rootScope,$state,$http2,$timeout,$interval){
    $scope.login = function (){
        $http2.post( $rootScope.url+"login.php",{
            username:$scope.username,
            password : $scope.password


        }).then(function (resp){
            if(resp.data.status){
                toastr.success("welcome"+" "+resp.data.name , "Success",{timeOut:10000} )
                $rootScope.id=resp.data.id
                $rootScope.name=resp.data.name
                $state.go("app.elect")
                


            }
            else {
                toastr.error("wrong username or password" , "Error",{timeOut:2000})
                $scope.username=" "
                $scope.password=" "
                $scope.apply()

            }



        })
    }

})
    .controller("electCtrl" , function ($scope,$rootScope,$uibModal,$state,$http,$http2,$timeout,$interval){
        if(!$rootScope.id){
            toastr.warning("Login First","Warning",{timeOut:2000})
            $state.go("app.login")}

            $scope.getOrders=function(){
              $http2.post($rootScope.url+"getorders.php"

               

              ).then(function(resp){

                $scope.orders = resp.data
                 $scope.orders.forEach(function(order){

                    order.devices=angular.fromJson(order.devices)
                })
                $scope.$apply()
              })


            }


        $scope.deviceData={ }
        $scope.addevice=function () {
            $scope.deviceData.id=$rootScope.id
            $http2.post($rootScope.url+"addevice.php",$scope.deviceData).then(function (resp) {
                if(resp.data.status){
                    alert("device Added successfully")
                    $scope.deviceData={ }
                    $scope.y=""
                    $scope.getdevices()
                    $scope.$apply()
                }
                else
                    alert("Something went wrong")
            })
        }
        $scope.update=function () {

            var x=confirm("Sure to update device ?")
            if(x){
                $http2.post($rootScope.url+"updateDevice.php",$scope.selectedDevice)
                    .then(function (resp) {
                        if(resp.data.status){
                            toastr.success("Updated Successfully","Success",{timeOut:2000})
                            $scope.getdevices()
                            $scope.deviceModal.close()
                        }
                        else
                            toastr.error("Failed to update","Error",{timeOut:2000})

                    })
            }
        }
        $scope.preModifyDevice=function (device) {
            device.price=parseFloat(device.price)
            console.log(device)

            $scope.selectedDevice=Object.assign({},device)
            $scope.deviceModal=$uibModal.open({
                templateUrl:"templates/modifyDeviceModal.html",
                scope:$scope
            })
        }
        $scope.deleteDevice=function (id,index) {
            var x=confirm("Are you sure ?")
            if(x)
                $http2.post($rootScope.url+"deleteDevice.php",{
                    id:id
                }).then(function (resp) {
                    if(resp.data.status){
                        alert("Device deleted successfully")
                        $scope.devices.splice(index,1)
                        $scope.$apply()
                    }
                    else
                        alert("Something went wrong")
                })
        }

        $scope.getdevices=function () {
            $http2.post($rootScope.url+"getdevices.php",{elect_id:$rootScope.id})
                .then(function (resp) {
                    $scope.devices =resp.data
                    $scope.$apply()
                })
        }

        $scope.getdevices()

    })

