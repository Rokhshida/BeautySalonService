var app = angular.module('MyApp', []);
app.controller('MyCtrl', function ($scope, $compile, $http) {
  
    GetCntMessage($('#ID_Person').val());

    function GetCntMessage(ID) {
       
        var getData = $http.get("/AdminPart/CMSMessage/GetNewMessagesCnt?IDPersonTo=" + ID);
        getData.then(function (VarMessage) {
            $scope.CntMessage = VarMessage.data;
        }, function () {

        });
    }

    $scope.FuncShowNewMessages = function (ID) {
       
        var getData = $http.get("/AdminPart/CMSMessage/GetNewMessages?IDPersonTo=" + ID);

        getData.then(function (VarMessage) {
            $scope.ListAllNewMessages = VarMessage.data;
        }, function () {

        });
    }

    $scope.FuncShowNewMessages($('#ID_Person').val());




   
   

    /*********************/

    function FuncShowCopyright() {

        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 5);
        getData.then(function (VarMessage) {
            $scope.CopyrightComment = VarMessage.data.Comment;

            $scope.CopyrightTitle = VarMessage.data.Title;

        }, function () {

        });
    }
    FuncShowCopyright();

});