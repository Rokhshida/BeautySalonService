
//<div id="dropzone2" class="dropzone" 
//options="dz_PersImageOptions" 
//methods="dz_PersImageMethods" 
//callbacks="dzCallbacks" ng-dropzone>

    //dropzone==>dropzone3
//dz_PersImageOptions ==>dz_PersImageOptions3
//dz_PersImageMethods==>dz_PersImageMethods3
//dzCallbacks==>dzCallbacks3

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
    $scope.formDataService;
    $scope.PageNumService = 1;
    $scope.PageSizeService = 9;
    $scope.TitleService = "سرویس های مرتبط با سالن";

    //
    $scope.ID_Salon = JSON.parse(sessionStorage.ResultFrom);


    //DropZone:
    ID_Salon = 0;
    ID_Service = 0;

    $scope.showBtns = false;
    $scope.lastFile = null;
    $scope.dz_PersImageOptions3 = {
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
            this.on("sending", function (file, xhr, formDataService) {
                // formData.append("ID", ID);
               
               // alert("Send a request to the server: " + JSON.stringify($scope.formDataService));
              
                formDataService.append("ID_Salon", ID_Salon);
                formDataService.append("ID_Service", ID_Service);
               
                //alert('end sending');
               
            });
            this.on("complete", function (file) {
                //alert('complete');
                $scope.dz_PersImageMethods3.removeAllFiles();
                //Refresh Page
            });
        }
    };

    $scope.dz_PersImageMethods3 = {};
    $scope.dzCallbacks3 = {
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

  

    function clearDataService() {

        $scope.formDataService = {

        };
       
        CKEDITOR.instances.editor1Service.setData('');
        $scope.formDataService.ID_Salon = $scope.ID_Salon;
    }



    $scope.ShowLoadingAngularService = function (PageNumService, PageSizeService, Status) {

        if (Status == "Next") PageNumService += 1;
        if (Status == "Prev") PageNumService -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetServiceOfSalon",
            params: {
                CurrentPage: PageNumService,
                PageSize: PageSizeService,
                ID_Salon: $scope.ID_Salon

            }
        });

        response.then(function (VarResult) {
            $scope.ListAllSSalonServices = VarResult.data;

            if (Status == "Next") $scope.PageNumService += 1;
            if (Status == "Prev") $scope.PageNumService -= 1;

        }, function () {
            alert('error')
        });
    }

    $scope.ShowLoadingAngularService($scope.PageNumService, $scope.PageSizeService, '');



    $scope.submitFormService = function () {
        //alert("Send a request to the server: " + JSON.stringify($scope.formDataService));


        FuncSaveService();

        clearDataService();
        $('#FormModalService').modal('hide');

    }

    function FuncSaveService() {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
          
            

            $scope.formDataService.Comment = CKEDITOR.instances.editor1Service.getData();
        
            var VarNewRec = $scope.formDataService;
            //alert("Send a request to the server: " + JSON.stringify(VarNewRec));

            

           
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSSalon/SaveSalon_Service",
                data: {
                    ObjSalonService: VarNewRec
                },

                datatype: 'json',
                success: function (data) {
                   
                    ID_Salon = VarNewRec.ID_Salon;
                    ID_Service = VarNewRec.ID_Service;
                    var files = $('#dropzone3').get(0).dropzone.getAcceptedFiles();
                    if (files.length > 0) {
                       

                        $scope.dz_PersImageMethods3.processQueue();
                    }
                    alert('با موفقیت ذخیره شد');
                    $scope.ShowLoadingAngularService($scope.PageNumService, $scope.PageSizeService, '');
                },
                complete: function () {
                    var files = $('#dropzone3').get(0).dropzone.getAcceptedFiles();
                    if (files.length == 0) {
                        clearDataService();
                    }
                }
            }

            );


        }

    }



    
    $scope.FuncAddService = function () {



        clearDataService();
        
     
        $('#FormModalService').modal('toggle');


    }
    $scope.FuncAddServiceAll = function () {



        //clearDataService();

       

        $('#FormModalServiceAll').modal('toggle');


    }

    $scope.FuncDeleteService = function (ID_Service) {

        if (confirm("آیا از حذف اطمینان دارید؟")) {

            aler('hhh');
            var getData = $http.get("/AdminPart/CMSSalon/DeleteSalonService?ID_Salon=" + $scope.ID_Salon + "&ID_Service=" + ID_Service);
            aler('hhh77');
            getData.then(function (VarMessage) {
                alert("مورد حذف گردید.");
                $scope.ShowLoadingAngularService($scope.PageNumService, $scope.PageSizeService, '');
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


