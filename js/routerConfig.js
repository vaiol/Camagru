// configuration
Router.config({ mode: 'history'});

// returning the user to the initial state
// Router.navigate();

// adding routes
Router
    .add('/photoPage/', function() {
        console.log('photoPage', arguments);
        openPhotoPage(1);
    });

// forwarding

setTimeout(function() {
    Router.navigate('/photoPage');
    // console.log("routerConfig");
}, 2000);
