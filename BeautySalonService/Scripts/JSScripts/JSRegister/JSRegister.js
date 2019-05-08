var app = angular.module('MyApp', []);
app.controller('MyCtrl', function ($scope, $compile, $http) {

   
    $scope.formData;
   

    $scope.activeMembership = "active";

    //$scope.formData = {
    //    userName: '',
    //    email: '',
    //    zipcode: ''
    //};
    $scope.submitForm = function () {
      
        $scope.formData.ID_Role = $('#ID_Role').val();
       // alert("Send a request to the server: " + JSON.stringify($scope.formData));
        if ($scope.password == $scope.confirmpassword) { $scope.FuncSave(); }
        else { alert("تایید رمز عبور با رمز عبور یکی نیست"); }

    };



    $scope.FuncSave = function () {

        if (confirm("آیا می خواهید ذخیره کنید؟")) {
           
            var VarNewRec = $scope.formData


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

});