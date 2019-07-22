var app = angular.module('MyApp', []);
app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {
   
    $scope.activeHome = "active";
    $scope.bannerclass = "";
    $scope.breadcrumb = "اصلی";
    $scope.Title = "خانه";

    /*********************/
    
    FuncGetCommon(2);

    function FuncGetCommon(paramUseType) {

        
        var getData = $http.get("/AdminPart/CMSSiteSetting/GetSiteSetting?ID_UseType=" + paramUseType);
        getData.then(function (VarMessage) {
            $scope.Title = VarMessage.data.Title;
            $scope.SubTitle = VarMessage.data.SubTitle;
            $scope.Comment = VarMessage.data.Comment;
            $scope.PicturePath =  VarMessage.data.PicturePath;
           
        }, function () {

        });
    }

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
            //alert(JSON.stringify($scope.ListAllSiteSettingBanner));
        }, function () {

        });
    }


    function FuncShowNewArticle() {

       
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

    FuncShowNewArticle();
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