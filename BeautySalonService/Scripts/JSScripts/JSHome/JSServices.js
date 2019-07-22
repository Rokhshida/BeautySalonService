var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
    $scope.bannerclass = "inner-banner";
    $scope.breadcrumb = "خدمات ما"
    $scope.PageNumService = 1;
    $scope.PageSizeService = 4;
    $scope.PageNumSalonsOfService = 1;
    $scope.PageSizeSalonsOfService = 4;
    $scope.Title = "خدمات ما";

    $scope.activeDrp = "active";

    /*********************/
    FuncGetCommon(6);

    function FuncGetCommon(paramUseType) {

       
        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + paramUseType);
        getData.then(function (VarMessage) {
            $scope.Title = VarMessage.data.Title;
            $scope.SubTitle = VarMessage.data.SubTitle;
            $scope.Comment = VarMessage.data.Comment;
            $scope.PicturePath = VarMessage.data.PicturePath;
        }, function () {

        });
    }
    /*********************/


    $scope.FuncGetSalonsOfService = function (PageNumSalonsOfService, PageSizeSalonsOfService, StatusSalonsOfService, ID_Service) {



        if (StatusSalonsOfService == "Next") PageNumSalonsOfService += 1;
        if (StatusSalonsOfService == "Prev") PageNumSalonsOfService -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSService/GetSalonsOfService",
            params: {
                CurrentPage: PageNumSalonsOfService,
                PageSize: PageSizeSalonsOfService,
                ID_Service: ID_Service
            }
        });


        response.then(function (VarResult) {

            $scope.ListAllSalonsOfService = VarResult.data;
            // alert("Send a request to the server: " + JSON.stringify($scope.ListAllSalonsOfService));




            if (StatusSalonsOfService == "Next") $scope.PageNumSalonsOfService += 1;
            if (StatusSalonsOfService == "Prev") $scope.PageNumSalonsOfService -= 1;

        }, function () {
            alert('error')
        });
    }
    $scope.FuncShowDetailOfService = function (ID_Service, ServiceName, ID_Article, ServicePicturePath) {

        $scope.ID_Service = ID_Service;
        $scope.ServiceName = ServiceName;
        $scope.ServicePicturePath = ServicePicturePath;
        $scope.FuncGetSalonsOfService($scope.PageNumSalonsOfService, $scope.PageSizeSalonsOfService, '', ID_Service);

        var getData = $http.get("/AdminPart/CMSArticle/GetA_Article?ID=" + ID_Article);
        getData.then(function (VarMessage) {


            $scope.SiteContentArticleOfService = VarMessage.data.SiteContent;
            $scope.TitleArticle = VarMessage.data.Title;



        }

        , function () {

        });
    }


    $scope.FuncShowAllService = function (PageNumService, PageSizeService, StatusService) {



        if (StatusService == "Next") PageNumService += 1;
        if (StatusService == "Prev") PageNumService -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSService/GetServiceWithPage",
            params: {
                CurrentPage: PageNumService,
                PageSize: PageSizeService

            }
        });


        response.then(function (VarResult) {

            $scope.ListAllService = VarResult.data;
            //  alert("Send a request to the server: " + JSON.stringify($scope.ListAllService));
            alert($scope.ListAllService[0].ID);
            alert($scope.ListAllService[0].Name);
            alert($scope.ListAllService[0].ID_Article);
            alert($scope.ListAllService[0].PicturePath);

            $scope.FuncShowDetailOfService($scope.ListAllService[0].ID, $scope.ListAllService[0].Name, $scope.ListAllService[0].ID_Article, $scope.ListAllService[0].PicturePath);



            if (StatusService == "Next") $scope.PageNumService += 1;
            if (StatusService == "Prev") $scope.PageNumService -= 1;

        }, function () {
            alert('error')
        });
    }



   
    /*********************/
   
    /*********************/

    $scope.FuncShowAllService($scope.PageNumService, $scope.PageSizeService, '');
    //$scope.FuncShowDetailOfService($scope.ListAllService[0].ID, $scope.ListAllService[0].Name, $scope.ListAllService[0].ID_Article, $scope.ListAllService[0].PicturePath);
   
        

   

    /***********************************/
    /*قسمت مربوط به layout*/

    $scope.PageNum = 1;
    $scope.PageSize = 4;


    function FuncShowCopyright() {

        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 5);
        getData.then(function (VarMessage) {
            $scope.CopyrightComment = VarMessage.data.Comment;

            $scope.CopyrightTitle = VarMessage.data.Title;

        }, function () {

        });
    }


    function FuncShowSalon() {

        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 7);
        getData.then(function (VarMessage) {
            $scope.SalonTitle = VarMessage.data.Title;
            $scope.SalonSubTitle = VarMessage.data.SubTitle;
            $scope.SalonComment = VarMessage.data.Comment;
        }, function () {

        });
    }


    $scope.FuncShowAllSalon = function (PageNum, PageSize, Status) {



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

    function FuncShowNewArticle()  {
       

        DayCount = 5;
      

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSArticle/GetNewArticleWithPage",
            params: {
                PageNum: 1,
                PageSize: 4,
                Day: DayCount
            }
        });


        response.then(function (VarResult) {
            $scope.ListAllNewArticle = VarResult.data;
            //alert(JSON.stringify($scope.ListAllNewArticle.length));
           

        }, function () {
            alert('error_FuncShowNewArticle')
        });
    }

    function FuncShowBanner() {

        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + 1);
        getData.then(function (VarMessage) {
            $scope.ListAllSiteSettingBanner = VarMessage.data;
        }, function () {

        });
    }


    FuncShowBanner();
    FuncShowCopyright();
    FuncShowSalon();
    FuncShowNewArticle();
    $scope.FuncShowAllSalon($scope.PageNum, $scope.PageSize, '');
    $scope.FuncShowSalonPage = function (Item) {

        sessionStorage.ResultFrom = JSON.stringify(Item);
        window.open("/Salon/Index", '_blank');
    }
    /*********************/




});