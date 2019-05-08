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
    $scope.formData;
    $scope.PageNum = 1;
    $scope.PageSize = 9;
    $scope.Title = "سرویس های مرتبط با سالن";

    $scope.ID_Salon = JSON.parse(sessionStorage.ResultFrom);


    //DropZone:
    ID_Salon = 0;
    ID_Service = 0;

    $scope.showBtns = false;
    $scope.lastFile = null;
    $scope.dz_PersImageOptions = {
        url: '/AdminPart/CMSSalon/GetSalonServiceImageFile',
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
                // formData.append("ID", ID);
               
                alert("Send a request to the server: " + JSON.stringify($scope.formData));
              
                formData.append("ID_Salon", ID_Salon);
                formData.append("ID_Service", ID_Service);
               
                alert('end sending');
               
            });
            this.on("complete", function (file) {
                alert('complete');
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


   

    FuncShowservices();

    function FuncShowservices() {

        var getData = $http.get("/AdminPart/CMSService/GetServiceWithPage?CurrentPage=1&PageSize=100");
        getData.then(function (VarMessage) {
            $scope.ListAllService = VarMessage.data;
        }, function () {

        });
    }

  

    function clearData() {

        $scope.formData = {

        };
       
        CKEDITOR.instances.editor1.setData('');
        $scope.formData.ID_Salon = $scope.ID_Salon;
    }



    $scope.ShowLoadingAngular = function (PageNum, PageSize, Status) {

        if (Status == "Next") PageNum += 1;
        if (Status == "Prev") PageNum -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetServiceOfSalon",
            params: {
                CurrentPage: PageNum,
                PageSize: PageSize,
                ID_Salon: $scope.ID_Salon

            }
        });

        response.then(function (VarResult) {
            $scope.ListAllSSalonServices = VarResult.data;

            if (Status == "Next") $scope.PageNum += 1;
            if (Status == "Prev") $scope.PageNum -= 1;

        }, function () {
            alert('error')
        });
    }

    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');



    $scope.submitForm = function () {
        alert("Send a request to the server: " + JSON.stringify($scope.formData));


        FuncSave(); 

        clearData();
        $('#FormModal').modal('hide');

    }

    function FuncSave() {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
          
            

            $scope.formData.Comment = CKEDITOR.instances.editor1.getData();
        
            var VarNewRec = $scope.formData;
            alert("Send a request to the server: " + JSON.stringify(VarNewRec));

            

            alert(1);
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSSalon/SaveSalon_Service",
                data: {
                    ObjSalonService: VarNewRec
                },

                datatype: 'json',
                success: function (data) {
                    alert('test1');
                    ID_Salon = VarNewRec.ID_Salon;
                    ID_Service = VarNewRec.ID_Service;
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length > 0) {
                        alert('test2');

                        $scope.dz_PersImageMethods.processQueue();
                    }
                    alert('با موفقیت ذخیره شد');
                    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');
                },
                complete: function () {
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length == 0) {
                        alert('complet');
                        clearData();
                    }
                }
            }

            );


        }

    }



    
    $scope.FuncAdd = function () {



        clearData();
        
        alert('FuncAdd');

        $('#FormModal').modal('toggle');


    }


    $scope.FuncDelete = function (ID_Service) {

        if (confirm("آیا از حذف اطمینان دارید؟")) {


            var getData = $http.get("/AdminPart/CMSSalon/DeleteSalonService?ID_Salon=" + $scope.ID_Salon + "&ID_Service=" + ID_Service);

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


