// nicolajsapp.controller('loginCtrl', function($scope) {
NyvangApp.controller('page2Ctrl', function($scope) {

})
      
.controller('statisticsThisMonthCtrl', function($scope) {
   
})
   
.controller('totalsCtrl', [ '$scope', 'dataService', '$window', 'deviceInfo',
    function($scope, dataService, $win, deviceInfo) {
        
        $scope.chartWidth = (deviceInfo.width() - (deviceInfo.width() * 0.1));
        $scope.chartHeight = deviceInfo.width();


        /*
         * **** TEMP FIX FOR A BAD RELEASE OF GOOGLE VISUALIZATION VERSION 44 ****
         * Fix: Instead of loading 'current' version, v.43 is loaded
         * When fixed: change '43' to 'current'  */
        google.charts.load('43', {'packages':['corechart']});
        /*
         * End fix
         */
        google.charts.setOnLoadCallback(drawVisualization);

        function drawVisualization() {
            console.log("drawVisualization")
            // Some raw data (not necessarily accurate)
            var data = google.visualization.arrayToDataTable([
                ['Month',   '2014',   '2015',   '2016'],
                ['Januar',  165,      170,      160],
                ['Februar', 135,      151,      145],
                ['Marts',   157,      161,      159],
                ['April',   139,      141,      143],
                ['May',     165,      150,      157],
                ['June',    135,      129,      133],
                ['July',    132,      122,      127],
                ['August',  139,      135,      139],
                ['Septmber',136,      139,      140],
                ['Oktober', 165,      159,      155],
                ['November',166,      168,      159],
                ['December',169,      171,      170]
            ]);

            var options = {
                title : 'Electricity 2014 - 2016',
                vAxis: {title: 'KW/h'},
                hAxis: {title: 'Month'},
                seriesType: 'bars',
                series: {5: {type: 'line'}}
            };

            var chart = new google.visualization.ComboChart(document.getElementById('chart_electicity'));
            chart.draw(data, options);
        }
   

}])
   
.controller('addEntryCtrl', ['$scope', '$ionicModal', '$ionicLoading', 'dataService', '$window',
    function($scope, $ionicModal, $ionicLoading, dataService, $win) {

    $scope.electrityForm = {};
    $scope.electrityForm.month = "";
    $scope.electrityForm.kwh = "";
    $scope.electrityForm.price = "";
    $scope.electrityForm.modalTitle = "Add new entry";

    var modalOptions = {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true,
        backdropClickToClose: true,
        hardwareBackButtonClose: true
    }

    const FAKE_SAVE_DELAY = 500;


    /* Form
     ----------------------------------*/

    $scope.electrityForm.submit = function(item, event) {
        $ionicLoading.show({template: 'Saving...'});
        //------------------------------------------------- log //
        console.log("form submitted");
        var data = {
              use: $scope.electrityForm.kwh,
              price: $scope.electrityForm.price
        }

        var m = new Date($scope.electrityForm.month).getMonth();

        // storageE.setItem(m, data)
        $win.setTimeout(function(){
            dataService.set(m, data);
        
            if(dataService.get(m)){
                  //------------------------------------------ log //
                  console.log("saved!")
                  $scope.electrityForm.reset();
            }
            $ionicLoading.hide();
        }, FAKE_SAVE_DELAY);
    }

    $scope.electrityForm.reset = function() {
        $scope.electrityForm.month = "";
        $scope.electrityForm.kwh = "";
        $scope.electrityForm.price = "";
    }

    $scope.electrityForm.close = function() {
        if($scope.modal.isShown()) {
            $scope.closeModal();
        }
    }

    /* Modal
     ----------------------------------*/

    $ionicModal.fromTemplateUrl('electricity-modal.html', modalOptions)
    .then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    // end addEntry Controller
}]) 
   
.controller('aboutCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {

});
 