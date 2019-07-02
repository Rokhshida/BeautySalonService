var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
   
    $scope.bannerclass = "inner-banner";
   
    $scope.Salondata = JSON.parse(sessionStorage.ResultFrom);
   // alert(JSON.stringify($scope.Salondata));
    $scope.breadcrumb = "صفحه اختصاصی " + $scope.Salondata.Name;
    $scope.PageNumServicesOfSalon = 1;
    $scope.PageSizeServicesOfSalon = 4;
    $scope.Title = "رخشیدا";
    $scope.PageNumArticles = 1;
    $scope.PageSizeArticles = 3;

   

    $scope.activeDrp = "";

    /*********************/
    FuncGetCommon();

    function FuncGetCommon() {

        $scope.SalonTitle = $scope.Salondata.Name;
        $scope.ID_Salon = $scope.Salondata.ID;
        $scope.Comment = $scope.Salondata.Description;
        $scope.PicturePath = $scope.Salondata.PicturePath;
        //$scope.Phone = $scope.Salondata.Phone;
        $scope.Address = $scope.Salondata.Address;
        $scope.Manager = $scope.Salondata.Manager;
        $scope.CityName = $scope.Salondata.CityName;
    }
    /*********************/

   

    //get phone of Salon
    FuncGetPhonesOfSalon($scope.ID_Salon);
    function FuncGetPhonesOfSalon(ID_Salon) {
        
        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetPhoneOfSalon",
            params: {
               
                ID_Salon: ID_Salon
            }
        });
        response.then(function (VarResult) {

            $scope.ListAllSalonPhone = VarResult.data;
            // alert("Send a request to the server: " + JSON.stringify($scope.ListAllSalonsOfService));
        }, function () {
            alert('error_FuncGetPhonesOfSalon')
        });
    }
  
    $scope.FuncGetServicesOfSalon = function (PageNumServicesOfSalon, PageSizeServicesOfSalon, StatusServicesOfSalon,ID_Salon) {



        if (StatusServicesOfSalon == "Next") PageNumServicesOfSalon += 1;
        if (StatusServicesOfSalon == "Prev") PageNumServicesOfSalon -= 1;

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




            if (StatusServicesOfSalon == "Next") PageNumServicesOfSalon += 1;
            if (StatusServicesOfSalon == "Prev") PageNumServicesOfSalon -= 1;

        }, function () {
            alert('error_FuncGetServicesOfSalon')
        });
    }

    
    $scope.FuncGetServicesOfSalon($scope.PageNumServicesOfSalon, $scope.PageSizeServicesOfSalon, '', $scope.ID_Salon);



    /*get articles*/

    $scope.FuncGetArticlesOfManager = function (PageNumArticles, PageSizeArticles, StatusArticles, ID_Person) {

        if (ID_Person!=null){
       // alert(JSON.stringify(PageNumArticles));
       // alert(JSON.stringify(PageSizeArticles));
        //alert(JSON.stringify(ID_Person));
        if (StatusArticles == "Next") PageNumArticles += 1;
        if (StatusArticles == "Prev") PageNumArticles -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSArticle/GetArticleOfPersonWithPage",
            params: {
                PageNum: PageNumArticles,
                PageSize: PageSizeArticles,
                ID_Person: ID_Person
            }
        });


        response.then(function (VarResult) {

            $scope.ListAllArticleOfSalonManager = VarResult.data;
            // alert("Send a request to the server: " + JSON.stringify($scope.ListAllSalonsOfService));




            if (StatusArticles == "Next") PageNumArticles += 1;
            if (StatusArticles == "Prev") PageNumArticles -= 1;

        }, function () {
            alert('error_FuncGetArticlesOfManager')
        });
        }
    }


    $scope.FuncGetArticlesOfManager($scope.PageNumArticles, $scope.PageSizeArticles, '', $scope.Salondata.ID_Manager);




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