var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
    $scope.PageNum = 1;
    $scope.PageSize = 4;
   
    alert('test1');

    /*********************/
  
    function FuncShowCopyright() {
        alert('copyright');
        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 5);
        getData.then(function (VarMessage) {
            $scope.CopyrightComment = VarMessage.data.Title;

            $scope.CopyrightTitle = VarMessage.data.Comment;

        }, function () {

        });
    }


    function FuncShowSalon() {
        alert('FuncShowSalon');
        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 7);
        getData.then(function (VarMessage) {
            $scope.SalonTitle = VarMessage.data.Title;
            $scope.SalonSubTitle = VarMessage.data.SubTitle;
            $scope.SalonComment = VarMessage.data.Comment;
        }, function () {

        });
    }


    $scope.FuncShowAllSalon = function (PageNum, PageSize, Status) {

        alert('FuncShowAllSalon');

        if (Status == "Next") PageNum += 1;
        if (Status == "Prev") PageNum -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetSalonWithPage",
            params: {
                CurrentPage: PageNum,
                PageSize: PageSize,

            }
        });


        response.then(function (VarResult) {
            $scope.ListAllSalon = VarResult.data;

            if (Status == "Next") $scope.PageNum += 1;
            if (Status == "Prev") $scope.PageNum -= 1;

        }, function () {
            alert('error')
        });
    }

    

    function FuncShowBanner() {
        alert('FuncShowBanner')
        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 1);
        getData.then(function (VarMessage) {
            $scope.ListAllSiteSettingBanner = VarMessage.data;
        }, function () {

        });
    }


    FuncShowBanner();
    FuncShowCopyright();
    FuncShowSalon();
    $scope.FuncShowAllSalon($scope.PageNum, $scope.PageSize, '');


});