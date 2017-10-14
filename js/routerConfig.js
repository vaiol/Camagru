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

Router.config({ mode: 'hash', root: '/camagru/'});

Router
    .add(/index/, function() {

        sidebarClose();
        var xmlResponse = uploadPartials('index.htm');
        xmlResponse.onload = function() {
            content.innerHTML = this.response;
        };
        togleActive('index');
        videoFinish();
    })
    .add(/photo\/(.*)/, function() {
        videoFinish();
        Router.check('index');
        openPhotoPage(arguments[0]);

    })
    .add(/cam/, function() {
        sidebarClose();
        var xmlResponse = uploadPartials('cam.htm');
        xmlResponse.onload = function() {
            content.innerHTML = this.response;
            videoStart();
        };
        togleActive('cam');
        closePhotoPage();
    })
    .add(/profile/, function() {
        sidebarClose();
        videoFinish();
        var xmlResponse = uploadPartials('profile.htm');
        xmlResponse.onload = function() {
            content.innerHTML = this.response;
        };
        togleActive('profile');
        closePhotoPage();

    })
    .listen();


Router.check(Router.getFragment());
if (Router.getFragment() === '') {
    Router.check('index');
}
