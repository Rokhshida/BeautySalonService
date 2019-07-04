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



    ID_Author = -1;

    if ($('#ID_Role').val() != '1') ID_Author = $('#ID_Person').val().toString();

    ID = 0;

    //DropZone:
    $scope.showBtns = false;
    $scope.lastFile = null;
    $scope.dz_PersImageOptions = {
        url: '/AdminPart/CMSArticle/GetArticleImageFiles',
        dictDefaultMessage: 'تصاویر را اینجا قرار دهید',
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
    $scope.PageNum = 1;
    $scope.PageSize = 9;
    $scope.Title = "مقالات";
   



    function clearData() {

        $scope.formData = {

        };

        CKEDITOR.instances.editor1.setData('');
    }



    $scope.ShowLoadingAngular = function (PageNum, PageSize, Status) {

        if (Status == "Next") PageNum += 1;
        if (Status == "Prev") PageNum -= 1;
      


        if (ID_Author == '-1') {
            var response = $http({
                method: "post",
                url: "/AdminPart/CMSArticle/GetArticleWithPage",
                params: {
                    PageNum: PageNum,
                    PageSize: PageSize,

                }
            });

        } else {


            var response = $http({
                method: "post",
                url: "/AdminPart/CMSArticle/GetArticleOfPersonWithPage",
                params: {
                    PageNum: PageNum,
                    PageSize: PageSize,
                    ID_Person: ID_Author
                }
            });

        }
      
        response.then(function (VarResult) {
            $scope.ListAllArticle = VarResult.data;

            if (Status == "Next") $scope.PageNum += 1;
            if (Status == "Prev") $scope.PageNum -= 1;

        }, function () {
           
            alert('error')
        });
    }

    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');



    $scope.submitForm = function () {

       // alert("Send a request to the server: " + JSON.stringify($scope.formData));
      //  alert(CKEDITOR.instances.editor1.getData());

        if ($scope.formData.ID == undefined) {  FuncSave(); } else {  FuncUpdateInDB(); }

        clearData();
        $('#FormModal').modal('hide');

    }

    function FuncSave() {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
            //var VarNewRec = {

            //    HeaderTitle: $scope.HeaderTitle,
            //    About: $scope.About,
            //    Contact: $scope.Contact,
            //    SiteEmail: $scope.SiteEmail,
            //    Introduction: $scope.Introduction

            //};
           
            $scope.formData.SiteContent = CKEDITOR.instances.editor1.getData();
            var VarNewRec = $scope.formData;
           // alert("Send a request to the server: " + JSON.stringify(VarNewRec));
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSArticle/SaveArticle",
                data: {
                    ObjArticle: VarNewRec
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



    FuncUpdateInDB = function () {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
            //var VarNewRec = {
            //    ID: $scope.ID,
            //    HeaderTitle : $scope.HeaderTitle,
            //About : $scope.About,
            //Contact: $scope.Contact,
            //SiteEmail: $scope.SiteEmail,
            //Introduction: $scope.Introduction,
            //IsActive : $scope.IsActive,
            //};
           
           
            $scope.formData.SiteContent = CKEDITOR.instances.editor1.getData();
            var VarNewRec = $scope.formData;
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSArticle/UpdateArticle",
                data: {
                    ObjArticle: VarNewRec
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
                }, complete: function () {
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length == 0) {
                        clearData();
                    }
                }
            });


        }

    }

    $scope.FuncUpdate = function (Item) {

        $scope.formData = Item;

       CKEDITOR.instances.editor1.setData(Item.SiteContent);

        $('#FormModal').modal('toggle');

    }







    $scope.FuncAdd = function () {



        clearData();



        $('#FormModal').modal('toggle');


    }


    $scope.FuncDelete = function (ID) {

        if (confirm("آیا از حذف اطمینان دارید؟")) {


            var getData = $http.get("/AdminPart/CMSArticle/DeleteArticle?ID=" + ID);

            getData.then(function (VarMessage) {
                alert("مورد حذف گردید.");
                $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');
            }, function () {

            });
        }


    }

    /*********************/
    /*این موارد مربوط به layout*/

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