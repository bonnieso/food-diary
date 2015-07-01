var bmi = angular.module("bmiApp", []);

  bmi.factory('foodFactory', function(){
    var fn = {};
    fn.foodStorage = [];
  
    fn.storeFood = function(newFood){
      fn.foods.unshift(newFood);
    }

    fn.deleteFood = function(foodIndex){
      fn.foods.splice(foodIndex, 1);
    }


    fn.updateFood = function(foodIndex, currentFood){

      fn.foods.splice(foodIndex, 1, {item: currentFood});
    }
  
    return fn;
})
  
var foodData = [];

bmi.controller("bmiCtrl", function($scope, $http) {
  $scope.foodArray = [];
  $scope.date = new Date();
  
//  $scope.addFood = function(food) {
//    food.date = $scope.date;
//    $scope.foodArray.push(food);
//    $scope.food = "";
//    console.log($scope.foodArray);
//  };
  
  $scope.deleteFood = function($index){
    $scope.foodArray.splice($index, 1);
  };
  
  $scope.editFood = function(index){
    $scope.editing = !$scope.editing;
    console.log($scope.foodArray[index])
  };
  
  
  //
  $scope.addFood = function(foodObj){
    $http.post("/foods", foodObj)
      .success(function(data){
    });
//    $http.get
  };
  
  
  $scope.getFoods = function(){
    $http.get("/foods").success(function(response){
      var fArray = response.split(",");
      fArray.pop();
      console.log(fArray);
//      $scope.foodArray = response;
    });

  };
//  $scope.addFood = function(food) {
//    $scope.formError = "";
//    $http.post("/foods", { foodItem: $scope.food}).success(function(data) {
//      foodData.push($scope.food);
//      $scope.food = "";
//    }).catch(function(err) {
//      $scope.formError = err.data.error;
//    });
//  };
  
  $scope.userArray = [];
  $scope.addUser = function(user) {
    $scope.userArray.push(user);
    $scope.user = "";    
  };
  
  $scope.deleteUser = function($index){
    $scope.userArray.splice($index, 1);
  };

});
