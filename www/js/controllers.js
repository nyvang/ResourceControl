// nicolajsapp.controller('loginCtrl', function($scope) {
NyvangApp.controller('page2Ctrl', function($scope, $state) {
    var user = Ionic.User.current();
    if (!user.isAuthenticated()) {
        $state.go('login');
    }
})
      
.controller('statisticsThisMonthCtrl', [ '$scope', 'dataService', '$window', 'deviceInfo',
    function($scope, dataService, $win, deviceInfo, $state) {      

        (function ($state) {
            var user = Ionic.User.current();
            if (!user.isAuthenticated()) {
                c("logged out")
                $state.go('login');
            }
        })();

        $scope.chartWidth = (deviceInfo.width() - (deviceInfo.width() * 0.1));
        $scope.chartHeight = deviceInfo.width();

        $scope.electricButton = strings.buttons.en.electricity.toString();

        (function () { 
                /*
                 * **** TEMP FIX FOR A BAD RELEASE OF GOOGLE VISUALIZATION VERSION 44 ****
                 * Fix: Instead of loading 'current' version, v.43 is loaded
                 * When fixed: change '43' to 'current'  */
                google.charts.load('43', {'packages':['corechart', 'linechart']});
                /*
                 * End fix
                 */
                google.charts.setOnLoadCallback(drawVisualization);

                function drawVisualization() {

                    var headersArray = ['Month, Year','Kw/h','Price'];
                    var dataArray = [];
                    dataArray.push(headersArray);

                    for (var key in localStorage) {
                        if(key.endsWith("2016")) {
                            dataArray.push(JSON.parse(localStorage.getItem(key)));
                        }
                    }
                    dataArray.shift(); 

                    var data = google.visualization.arrayToDataTable(dataArray);
                    c(dataArray[1][0] + " - " + dataArray[dataArray.length-1][0]);

                    var o = {
                        title : dataArray[1][0] + " - " + dataArray[dataArray.length-1][0],
                        vAxis: {title: dataArray[0][1]},
                        hAxis: {title: dataArray[0][0]},
                        seriesType: 'line',
                        series: {3: {type: 'line'}}
                    };

                    var chart = new google.visualization.ComboChart(document.getElementById('chart_electicity'));
                    chart.draw(data, o);
                }
        })()
}])
   
.controller('totalsCtrl', [ '$scope', 'dataService', '$window', 'deviceInfo',
    function($scope, dataService, $win, deviceInfo, $state) {
        

        (function ($state) {
            var user = Ionic.User.current();
            if (!user.isAuthenticated()) {
                c("logged out")
                $state.go('login');
            }
        })();

        $scope.chartWidth = (deviceInfo.width() - (deviceInfo.width() * 0.1));
        $scope.chartHeight = deviceInfo.width();

        $scope.electricButton = strings.buttons.en.electricity.toString();

        (function () {
            /*
             * **** TEMP FIX FOR A BAD RELEASE OF GOOGLE VISUALIZATION VERSION 44 ****
             * Fix: Instead of loading 'current' version, v.43 is loaded
             * When fixed: change '43' to 'current'  */
            google.charts.load('43', {'packages':['bar']});
            /*
             * End fix
             */
            google.charts.setOnLoadCallback(drawVisualization);


            //if (!google.charts) {
            //    google.charts.load('43', { 'packages': ['bar'] });
            //    google.charts.setOnLoadCallback(drawVisualization);
            //} else {
            //    drawVisualization();
            //}

            function drawVisualization() {
                c("called");
                var headersArray = ['Month, Year','Kw/h','Price'];
                var dataArray = [];
                dataArray.push(headersArray);

                for (var key in localStorage) {
                    if(key.endsWith("2015")) {
                        dataArray.push(JSON.parse(localStorage.getItem(key)));
                    }
                }
                dataArray.shift(); 

                var data = google.visualization.arrayToDataTable(dataArray);
                c(dataArray[1][0] + " - " + dataArray[dataArray.length - 1][0]);

                var dataArray2 = [];
                dataArray2.push(headersArray);

                for (var key in localStorage) {
                    if (key.endsWith("2016")) {
                        dataArray2.push(JSON.parse(localStorage.getItem(key)));
                    }
                }
                dataArray2.shift();

                var data2 = google.visualization.arrayToDataTable(dataArray2);
                c(dataArray2[1][0] + " - " + dataArray2[dataArray2.length - 1][0]);

                var options = {
                    width: $scope.chartWidth,
                    animation: {
                        duration: 6000,
                        easing: 'in'
                    },
                    chart: {
                        title: 'Total stats',
                        subtitle: dataArray[1][0] + " - " + dataArray[dataArray.length - 1][0],
                    },
                    series: {
                        0: { axis: 'use' }, // Bind series 0 to an axis named 'distance'.
                        1: { axis: 'price' } // Bind series 1 to an axis named 'brightness'.
                    },
                    axisTitlesPosition: 'in',
                    axes: {
                        y: {
                            use: { label: dataArray[0][1] }, // Left y-axis.
                            price: { side: 'right', label: dataArray[0][2] } // Right y-axis.
                        }
                    }
                    
                };

                var chart = new google.charts.Bar(document.getElementById('chart_electicity'));
                chart.draw(data2, options);
            }
        })()
}])
   
.controller('addEntryCtrl', ['$scope', '$ionicModal', '$ionicLoading', 'dataService', '$window', 'dateService',
    function ($scope, $ionicModal, $ionicLoading, dataService, $win, dateService, $state) {

    var user = Ionic.User.current();
    if (!user.isAuthenticated()) {
        $state.go('login');
    }

    $scope.electrityForm = {};
    $scope.electrityForm.month = new Date();
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

    /*
        FORM SUBMIT BUTTON
    */
    $scope.electrityForm.submit = function(item, event) {
        $ionicLoading.show({template: 'Saving...'});

        // Prepare data to be visualized in the charts    
        var kwhFormatted = $scope.electrityForm.kwh.replace(',', '.');
        var priceFormatted = $scope.electrityForm.price.replace(',', '.').replace('"', '');

        var mSortable = new Date($scope.electrityForm.month).getMonth();
        var mString = dateService.toMonthString(mSortable);
        mString += ", " + new Date($scope.electrityForm.month).getFullYear()
        mSortable += ", " + new Date($scope.electrityForm.month).getFullYear()

        var data = [
              mString,  
              new Number(kwhFormatted),
              new Number(priceFormatted)
        ]
        // Data prepared

        // Save the data. Currently to LocalStorage
        $win.setTimeout(function(){
            dataService.set(mSortable, data);
            
            if(dataService.get(mSortable)){

                  console.log("saved!")
                  $scope.electrityForm.reset();
            }
            $ionicLoading.hide();
        }, FAKE_SAVE_DELAY);
    }

    /*
        FORM RESET BUTTON
    */
    $scope.electrityForm.reset = function() {
        $scope.electrityForm.month = new Date();
        $scope.electrityForm.kwh = "";
        $scope.electrityForm.price = "";
    }

    /*
        MODAL CLOSE BUTTON
    */
    $scope.electrityForm.close = function() {
        if($scope.modal.isShown()) {
            $scope.closeModal();
        }
    }

    /*
        MODAL EVENTS
    */
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
   
.controller('aboutCtrl', function ($scope, $state) {
    var user = Ionic.User.current();
    if (!user.isAuthenticated()) {
        $state.go('login');
    }
})

.controller('mainCtrl', function ($scope, $state) {

    $scope.testform = {};
    $scope.testform.doLogout = function () {
        c("logout detected");
        Ionic.Auth.logout();
    }

});
 