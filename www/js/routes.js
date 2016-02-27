NyvangApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('page2', {
      url: '/login',
      templateUrl: 'templates/page2.html'
    })
      
    .state('menu', {
      url: '/main-nav',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
        
    .state('menu.statisticsThisMonth', {
      url: '/current-month',
      views: {
        'side-menu21': {
          templateUrl: 'templates/statisticsThisMonth.html'
        }
      }
    })
        
    .state('menu.totals', {
      url: '/Totals',
      views: {
        'side-menu21': {
          templateUrl: 'templates/totals.html'
        }
      }
    })
        
    .state('menu.addEntry', {
      url: '/add',
      views: {
        'side-menu21': {
          templateUrl: 'templates/addEntry.html'
        }
      }
    })
        
    .state('menu.about', {
      url: '/about',
      views: {
        'side-menu21': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('menu.main', {
      url: '/main',
      views: {
        'side-menu21': {
          templateUrl: 'templates/main.html'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/main-nav/current-month');
  
});