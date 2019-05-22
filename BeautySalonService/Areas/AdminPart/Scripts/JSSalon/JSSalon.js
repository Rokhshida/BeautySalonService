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
    $scope.PageNum = 1;
    $scope.PageSize = 9;
    $scope.Title = "سالن ها";

    FuncShowProvince();
    


    function FuncShowProvince() {

        var getData = $http.get("/AdminPart/CMSCity/GetCity?ID_Province=0");
        getData.then(function (VarMessage) {
            $scope.ListAllProvince = VarMessage.data;
        }, function () {

        });
    }
    
    $scope.GetCity = function () {

        var getData = $http.get("/AdminPart/CMSCity/GetCity?ID_Province=" + $('#DrpProvince').val());
        getData.then(function (VarMessage) {
            $scope.ListAllCity = VarMessage.data;
        }, function () {

        });
    }


   GetProvinceOfCity = function (ID) {

        var getData = $http.get("/AdminPart/CMSCity/GetProvinceOfCity?ID=" + ID);
        getData.then(function (VarMessage) {
            
           
            $('#DrpProvince').val(VarMessage.data.ID_Province.toString());
            $scope.GetCity();
           
        }, function () {

        });
    }

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
        $('#DrpProvince').val('');
        CKEDITOR.instances.editor1.setData('');
      

    }



    $scope.ShowLoadingAngular = function (PageNum, PageSize, Status) {

        if (Status == "Next") PageNum += 1;
        if (Status == "Prev") PageNum -= 1;

        var response = $http({
            method: "post",
            url: "/AdminPart/CMSSalon/GetSalonWithPage",
            params: {
                CurrentPage: PageNum,
                PageSize: PageSize

            }
        });

        response.then(function (VarResult) {
            $scope.ListAllSalon= VarResult.data;

            if (Status == "Next") $scope.PageNum += 1;
            if (Status == "Prev") $scope.PageNum -= 1;

        }, function () {
            alert('error_ShowLoading')
        });
    }

    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');



    /*****
    /*مربوط به فرم انتساب مدیر*/
    $scope.PageNum_Person = 1;
    $scope.PageSize_Person = 9;

   
    $scope.ShowPersonLoadingAngular = function (PageNum_Person, PageSize_Person, Status) {

        if (Status == "Next") PageNum_Person += 1;
        if (Status == "Prev") PageNum_Person -= 1;
       /* $("#txtPersonsearch").val('asdas');*/
       
        /* + $scope.TxtPersonsearch*/
        var response = $http({
            method: "post",
            url: "/AdminPart/CMSPerson/GetPersonWithPage?TxtPersonSearch=" + angular.element('#txtPersonsearch').val(),
            params: {
                CurrentPage: PageNum_Person,
                PageSize: PageSize_Person

            }
        });
        
        response.then(function (VarResult) {
           
            $scope.ListAllPerson = VarResult.data;
           
            if (Status == "Next") $scope.PageNum_Person += 1;
            if (Status == "Prev") $scope.PageNum_Person -= 1;
            
        }, function () {
            alert('error_ShowPersonLoadingAngular')
        });
    }
    $scope.FuncSelectPerson = function (ID) {


        if (confirm("آیا می خواهید ذخیره کنید؟")) {
            $scope.formData.ID_Manager = ID;
            var VarNewRec = $scope.formData;

            $.ajax({

                type: "post",
                url: "/AdminPart/CMSSalon/UpdateSalon",
                data: {
                    ObjSalon: VarNewRec
                },

                datatype: 'json',
                success: function (data) {


                    alert('با موفقیت ذخیره شد');


                }, complete: function () {
                    $('#FormModal_AssignManager').modal('hide');
                    $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');
                }
            });


        }




    }



    $scope.FuncAssignManager = function (Item) {

        $scope.formData = Item;


        $('#FormModal_AssignManager').modal('toggle');



    }

    /*********************/
  

    $scope.submitForm = function () {

        // alert("Send a request to the server: " + JSON.stringify($scope.formData));


        if ($scope.formData.ID == undefined) { FuncSave(); } else { FuncUpdateInDB(); }

        clearData();
        $('#FormModal').modal('hidden');

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


            $scope.formData.Description = CKEDITOR.instances.editor1.getData();

            var VarNewRec = $scope.formData;
            // alert("Send a request to the server: " + JSON.stringify(VarNewRec));
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


            $scope.formData.Description = CKEDITOR.instances.editor1.getData();
            var VarNewRec=$scope.formData;
           
            
            $.ajax({

                type: "post",
                url: "/AdminPart/CMSSalon/UpdateSalon",
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
        
        
       GetProvinceOfCity(Item.ID_City);
        $scope.formData.ID_City = Item.ID_City.toString();
    
        CKEDITOR.instances.editor1.setData(Item.Description);
       

        $('#FormModal').modal('toggle');

    }

  

    $scope.FuncAssignService = function (ID) {

       
        //sessionStorage.ResultFrom = JSON.stringify(ID);
        $scope.ID_Salon = ID;
       
        // window.open("/AdminPart/CMSSalon/IndexSalonService", '_blank');
        $scope.ShowLoadingAngularService($scope.PageNumService, $scope.PageSizeService, '');
        $('#FormModalServiceAll').modal('toggle');

    }


    $scope.FuncAdd = function () {


       
        clearData();

        

        $('#FormModal').modal('toggle');


    }


    $scope.FuncDelete = function (ID) {

        if (confirm("آیا از حذف اطمینان دارید؟")) {


            var getData = $http.get("/AdminPart/CMSSalon/DeleteSalon?ID=" + ID);

            getData.then(function (VarMessage) {
                alert("مورد حذف گردید.");
                $scope.ShowLoadingAngular($scope.PageNum, $scope.PageSize, '');
            }, function () {

            });
        }


    }

    $scope.FuncDelPic = function (ID) {

        if (confirm("آیا از حذف تصویر اطمینان دارید؟")) {


            var getData = $http.get("/AdminPart/CMSSalon/DeleteSalonPic?ID=" + ID);

            getData.then(function (VarMessage) {
                alert("تصویر حذف گردید.");
               
            }, function () {

            });
        }


    }
    

    /************/
    /****assign services*****/


    $scope.formDataService;
    $scope.PageNumService = 1;
    $scope.PageSizeService = 9;
    $scope.TitleService = "سرویس های مرتبط با سالن";

    //
    //$scope.ID_Salon = JSON.parse(sessionStorage.ResultFrom);


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
              

                // alert("Send a request to the server: " + JSON.stringify($scope.formDataService));

                formDataService.append("ID_Salon", ID_Salon);
                formDataService.append("ID_Service", ID_Service);

               

            });
            this.on("complete", function (file) {
               
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
            alert('error_ShowPersonLoadingAngular')
        });
    }

   



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
   

    $scope.FuncDeleteService = function (ID_Service) {
       

        if (confirm("آیا از حذف اطمینان دارید؟")) {

            var getData = $http.get("/AdminPart/CMSSalon/DeleteSalonService?ID_Salon=" + $scope.ID_Salon + "&ID_Service=" + ID_Service);
            getData.then(function (VarMessage) {
                alert("مورد حذف گردید.");
                $scope.ShowLoadingAngularService($scope.PageNumService, $scope.PageSizeService, '');
            }, function () {

            });
        }


    }



    /*************/


   


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