Dropzone.autoDiscover = false;
var app = angular.module('MyApp', ['thatisuday.dropzone']);

app.config(function (dropzoneOpsProvider) {
    dropzoneOpsProvider.setOptions({
        url: '/upload_1.php',
        acceptedFiles: 'All Files/*.*',
        addRemoveLinks: true,
        dictDefaultMessage: 'Click to add or drop file',
        dictRemoveFile: 'حذف فایل',
        dictResponseError: 'Could not upload this file'
    });
});

app.filter('unsafe', function ($sce) {

    return function (val) {

        return $sce.trustAsHtml(val);

    };

});
app.controller('MyCtrl', function ($scope, $compile, $http) {


    ID = 0;

    //DropZone:
    $scope.showBtns = false;
    $scope.lastFile = null;
    $scope.dz_PersImageOptions = {
        url: '/AdminPart/CMSSalon/GetSalonImageFile',
        dictDefaultMessage: 'تصویر را اینجا قرار دهید',
        acceptedFiles: '',
        parallelUploads: 1,
        autoProcessQueue: false,
        uploadMultiple: true,
        maxFiles: 1,
        maxFilesize: 1000.00,
        //filesize: 500.0,
        //dictFileTooBig:500.0,
        //maxThumbnailFilesize: '500',
        //createImageThumbnails: true,    
        //timeout: 3600000, /*milliseconds*/
        //Send Parameter to c#

        init: function () {
            this.on("sending", function (file, xhr, formData) {
                formData.append("ID", ID);
            });
            this.on("complete", function (file) {
                $scope.dz_PersImageMethods.removeAllFiles();
                //Refresh Page
            });
        }
    };

    $scope.dz_PersImageMethods = {};
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.showBtns = true;
            $scope.lastFile = file;
        },
        'error': function (file, xhr) {

            alert("file:" + file);
            alert("xhr:" + xhr);
        }

    };


    $scope.formData;
    $scope.bannerclass = "inner-banner";
    $scope.breadcrumb = "فرم مدیر سالن"
   
   $scope.Title = "رخشیدا";

    $scope.activeDrp = "active";

    /*********************/
    FuncGetCommon(8);

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

   

    function GetSex() {

        var getData =
             {

             }
        getData.then(function (VarMessage) {


            $scope.ListAllSex = VarMessage.data;
        }, function () {

        });

    }
   
    function clearData() {

        $scope.formData = {

        };
       
        CKEDITOR.instances.editor1.setData('');


    }

    $scope.submitForm = function () {

        // alert("Send a request to the server: " + JSON.stringify($scope.formData));
        if ($scope.password == $scope.confirmpassword) {
            FuncSaveSalonManager();
            FuncSaveSalon();

            clearData();

        }
        else { alert("تایید رمز عبور با رمز عبور یکی نیست"); }
       
       

    }

    function FuncSaveSalon() {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
           
            $scope.formData.Description = CKEDITOR.instances.editor1.getData();

            var VarNewRec = {

                Name: $scope.formData.Name,
                Address: $scope.formData.Address,
                Sex: $scope.formData.ID_Sex,
               
                Description: $scope.formData.Description

            };

            alert("Send a request to the server: " + JSON.stringify(VarNewRec));
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSSalon/SaveSalon",
                data: {
                    ObjSalon: VarNewRec
                },

                datatype: 'json',
                success: function (data) {

                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length > 0) {

                        ID = data;

                        $scope.dz_PersImageMethods.processQueue();
                    }
                    alert('با موفقیت ذخیره شد');
                    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');
                },
                complete: function () {
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length == 0) {
                        clearData();
                    }
                }
            });


        }

    }


   FuncSaveSalonManager = function () {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {

            var VarNewRec = {

                Name: $scope.formData.FirstName,
                Family: $scope.formData.Family,
                username: $scope.formData.username,
                ID_Role:2,
                password: $scope.formData.password,
                CellPhoneNo: $scope.formData.CellPhoneNo,
                Email: $scope.formData.Email

            };
            alert("Send a request to the server: " + JSON.stringify(VarNewRec));


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