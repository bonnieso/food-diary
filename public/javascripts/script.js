var bmi = angular.module("bmiApp", []);

var foodData = [];

bmi.controller("bmiCtrl", function($scope, $http) {
  $scope.foodArray = [];
  $scope.date = new Date();
  
  //initialize page with database info
  function getUsers(){
    $http.get("/users")
      .success(function(data) {
        $scope.userDisplay = data.user;
        $scope.user = "";
        $scope.stats = {
          name: data.user.name,
          bmi: computeBMI(data.user),
          oldWeight: data.user.weight,
          weightChange: computeWeight($scope.foodArray),
          currentWeight: +data.user.weight + computeWeight($scope.foodArray)
        };
     //      console.log($scope.foodArray[1]);
    }).catch(function(err) {
        console.log(err);
    });
  }
  
  getUsers();
  //
  function getFoods(){
    $http.get("/foods")
      .success(function(data) {

      for(var key in data.foods){
        data.foods[key].refKey = key;
        $scope.foodArray.push(data.foods[key]);
        
      }
//      console.log($scope.foodArray);
      $scope.food = "";

    }).catch(function(err) {
      console.log(err);
    });
  }
  
  getFoods();
  //
  
  function computeWeight(foods){
    console.log(foods);
    var totalCalories = foods.reduce(function(acc, foods){
      return acc + (foods.calories * foods.servings);
    }, 0);
    return totalCalories/3500;
  }
  
  function computeBMI(user){
    var inches = user.unit === "in" ? +user.height : +user.height * 0.393701;
    return (+user.weight * 703)/Math.pow(inches, 2);
  }
  
  //adding food
  $scope.addFood = function(food) {
    food.date = $scope.date;
    $http.post("/foods", food)
      .success(function(data) {
        $scope.foodArray.push(data);
//      $scope.food = "";
//      console.log("post data", data)
    }).catch(function(err) {
      console.log(err);
    });
    
//    getFoods();
//    $scope.foodArray.push(data)
  };
  
  $scope.deleteFood = function($index){
//    console.log($scope.foodArray[$index].refKey);

    $http.delete("/foods/"+$scope.foodArray[$index].refKey)
      .success(function(data){ 
        
      }).catch(function(err){
      console.log(err);
    });
      
    $scope.foodArray.splice($index, 1);
  };
  
  $scope.editFood = function(index){
    $scope.editing = !$scope.editing;
    console.log($scope.foodArray[index])
  };
  
  // add user stuff (I'm done here)
  $scope.addUser = function(user) {
    
    $http.post("/users", user)
      .success(function(data) {
        //w00t! success!
    }).catch(function(err) {
      console.log(err);
    });
    
getUsers();
    
  };

});
