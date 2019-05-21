var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
   
    $scope.bannerclass = "inner-banner";
    $scope.breadcrumb = "درباره ما"
    $scope.PageNumArticle = 1;
    $scope.PageSizeArticle = 2;
    $scope.Title = "درباره ما";
   
    $scope.activeAbout = "active";


    FuncGetCommon(3);

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

  

    $scope.FuncShowAllArticle = function (PageNumArticle, PageSizeArticle, StatusArticle) {

        

        if (StatusArticle == "Next") PageNumArticle += 1;
        if (StatusArticle == "Prev") PageNumArticle -= 1;


        var response = $http({
            method: "post",
            url: "/AdminPart/CMSArticle/GetArticleWithPage",
            params: {
                PageNum: PageNumArticle,
                PageSize: PageSizeArticle,

            }
        });


        response.then(function (VarResult) {
            $scope.ListAllArticle = VarResult.data;

            if (StatusArticle == "Next") $scope.PageNumArticle += 1;
            if (StatusArticle == "Prev") $scope.PageNumArticle -= 1;

        }, function () {
            alert('error')
        });
    }

    $scope.FuncShowAllArticle($scope.PageNumArticle, $scope.PageSizeArticle, '');

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
    $scope.FuncShowAllSalon($scope.PageNum, $scope.PageSize, '');



    $scope.FuncShowSalonPage = function (Item) {

        sessionStorage.ResultFrom = JSON.stringify(Item);
        window.open("/Salon/Index", '_blank');
    }
    /*********************/

});