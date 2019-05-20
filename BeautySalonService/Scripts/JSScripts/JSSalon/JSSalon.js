var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
   
    $scope.bannerclass = "inner-banner";
   
    $scope.Salondata = JSON.parse(sessionStorage.ResultFrom);
    $scope.breadcrumb = "خدمات سالن " + $scope.Salondata.Name;
    $scope.PageNumServicesOfSalon = 1;
    $scope.PageSizeServicesOfSalon = 4;
    $scope.Title = "رخشیدا";


    $scope.activeDrp = "";

    /*********************/
    FuncGetCommon();

    function FuncGetCommon() {

        $scope.SalonTitle = $scope.Salondata.Name;
        $scope.ID_Salon = $scope.Salondata.ID;
        $scope.Comment = $scope.Salondata.Description;
        $scope.PicturePath = $scope.Salondata.PicturePath;
        $scope.Phone = $scope.Salondata.Phone;
        $scope.Address = $scope.Salondata.Address;
        $scope.Manager = $scope.Salondata.Manager;
        $scope.CityName = $scope.Salondata.CityName;
    }
    /*********************/

   

    /*********************/

  
    $scope.FuncGetServicesOfSalon = function (PageNumServicesOfSalon, PageSizeServicesOfSalon, StatusServicesOfSalon,ID_Salon) {



        if (StatusServicesOfSalon == "Next") PageNumServicesOfSalon += 1;
        if (StatusServicesOfSalon == "Prev") PageServicesOfSalon -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetServiceOfSalon",
            params: {
                CurrentPage: PageNumServicesOfSalon,
                PageSize: PageSizeServicesOfSalon,
                ID_Salon: ID_Salon
            }
        });


        response.then(function (VarResult) {

            $scope.ListAllServicesOfSalon = VarResult.data;
            // alert("Send a request to the server: " + JSON.stringify($scope.ListAllSalonsOfService));




            if (StatusServicesOfSalon == "Next") $scope.PageNumServicesOfSalon += 1;
            if (StatusServicesOfSalon == "Prev") $scope.PageNumServicesOfSalon -= 1;

        }, function () {
            alert('error')
        });
    }

    
    $scope.FuncGetServicesOfSalon($scope.PageNumServicesOfSalon, $scope.PageSizeServicesOfSalon, '', $scope.ID_Salon);
    /***********************************/
    /*قسمت مربوط به layout*/

   


    function FuncShowCopyright() {

        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 5);
        getData.then(function (VarMessage) {
            $scope.CopyrightComment = VarMessage.data.Comment;

            $scope.CopyrightTitle = VarMessage.data.Title;

        }, function () {

        });
    }


  
    FuncShowCopyright();
   

    /*********************/




});