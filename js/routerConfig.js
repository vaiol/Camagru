Router.config({ mode: 'hash', root: '/camagru/'});

// adding routes

function uploadPartials(page) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "partials/"+page);
    xhr.responseType = "text";
    xhr.send();
    return xhr;
}

function togleActive(page) {
    if (page !== 'index') {
        document.getElementById('indexPage').classList.remove('active');
    }
    if (page !== 'cam') {
        document.getElementById('camPage').classList.remove('active');
    }
    if (page !== 'profile') {
        document.getElementById('profilePage').classList.remove('active');
    }
    document.getElementById(page+'Page').classList.add('active');
}

var content = document.getElementById('content');
var script = document.createElement('script');
script.src = 'js/cam.js';

Router
    .add(/index/, function() {
        var xmlResponse = uploadPartials('index.htm');
        xmlResponse.onload = function() {
            content.innerHTML = ""+this.response;
        };
        togleActive('index');
        content.removeChild(script);
    })
    .add(/photo\/(.*)/, function() {
        // Router.check('index');
        openPhotoPage(arguments[0]);
        console.log('photo', arguments[0]);
    })
    .add(/cam/, function() {
        var xmlResponse = uploadPartials('cam.htm');
        xmlResponse.onload = function() {
            content.innerHTML = ""+this.response;
        };
        togleActive('cam');
        content.appendChild(script);
    })
    .listen();

Router.check('index');
Router.check(Router.getFragment());
