var app = angular.module('MyApp', []);
app.controller('MyCtrl', function ($scope, $compile, $http) {

   
    $scope.formData;
   
    $scope.formData;
    $scope.bannerclass = "inner-banner";
    $scope.breadcrumb = "فرم عضویت"

    $scope.Title = "رخشیدا";

    $scope.activeDrp = "active";

    /*********************/
    FuncGetCommon(9);

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

    //$scope.formData = {
    //    userName: '',
    //    email: '',
    //    zipcode: ''
    //};
    $scope.submitForm = function () {
      
       // $scope.formData.ID_Role = $('#ID_Role').val();
       // alert("Send a request to the server: " + JSON.stringify($scope.formData));
        if ($scope.password == $scope.confirmpassword) { $scope.FuncSave(); }
        else { alert("تایید رمز عبور با رمز عبور یکی نیست"); }

    };



    $scope.FuncSave = function () {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
           
            $scope.formData.ID_Role = 3;
            $scope.formData.ApprovedState = 0;
            var VarNewRec = $scope.formData;


            $.ajax({

                type: "post",
                url: "/AdminPart/CMSPerson/SavePerson",
                data: {
                    ObjPerson: VarNewRec
                },

                datatype: 'json',
                success: function (data) {
                    alert('با موفقیت ذخیره شد');
                   
                }
            });


        }

    }
   
    $scope.ApproveMembership = function () {

        alert($('#IDPerson').val());

        $.ajax({

            type: "post",
            url: "/AdminPart/CMSPerson/ApprovePerson",
            data: {
                ID: $('#IDPerson').val()
            },

            datatype: 'json',
            success: function (data) {
                alert('با موفقیت ذخیره شد');

            }
        });

   
    };

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