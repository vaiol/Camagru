let uploadedPartials = [];
let uploadedStyle = [];
let content = document.getElementById('content');


function connectStyle(page) {
    if (page === "index" || uploadedStyle.includes(page)) {
        return;
    }
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "style/"+page+"-page.css";
    console.log("UPLOAD: style/"+page+"-page.css");
    uploadedStyle.push(page);
    document.head.appendChild(link);
}

function uploadPartials(page, loadScript) {
    if (!uploadedPartials[page]) {
        connectStyle(page.substring(0, page.indexOf(".")));
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "partials/"+page);
        xhr.responseType = "text";
        xhr.send();
        xhr.onload = function () {
            content.innerHTML = this.response;
            uploadedPartials[page] = this.response;
            console.log('UPLOAD: partials/'+page);
            loadScript();

        };
    } else {
        content.innerHTML = uploadedPartials[page];
        loadScript();
    }
}

function toggleActive(page) {
    if (page !== 'index') {
        document.getElementById('indexPage').classList.remove('active');
    }
    if (page !== 'cam') {
        let camPageButt = document.getElementById('camPage');
        if (camPageButt) {
            camPageButt.classList.remove('active');
        }
    }
    if (page !== 'profile') {
        let profilePageButt = document.getElementById('profilePage');
        if (profilePageButt) {
            profilePageButt.classList.remove('active');
        }
    }
    let currentPage = document.getElementById(page+'Page');
    if (currentPage) {
        currentPage.classList.add('active');
    }

}


let res = window.location.pathname.split("/");
let currURLRoot = "/"+res[1]+"/";

Router.config({ mode: 'history', root: currURLRoot});

let indexOpened = false;


Router
    .add(/index/, function() {
        closePhotoPage(event, 'index');
        if (indexOpened) {
            return;
        }
        videoFinish();
        sidebarClose();
        uploadPartials('index.htm', function() {
            openIndexPage();
            indexOpened = true;
        });
        toggleActive('index');
    })
    .add(/photo\/(.*)/, function() {
        sidebarClose();
        videoFinish();
        let arg = arguments[0];
        if (!indexOpened) {
            uploadPartials('index.htm', function() {
                openIndexPage();
                indexOpened = true;
                openPhotoPage(arg);
            });
            toggleActive('index');
        } else {
            openPhotoPage(arg);
        }
    })
    .add(/cam/, function() {
        closePhotoPage(event, 'cam');
        sidebarClose();
        if (!getCurrentUser()) {
            toastIt("Not Authorized!");
            Router.navigate("login");
            return;
        }
        uploadPartials('cam.htm', function() {
            videoStart();
            indexOpened = false;
        });
        toggleActive('cam');

    })
    .add(/profile/, function() {
        closePhotoPage(event, 'profile');
        sidebarClose();
        if (!getCurrentUser()) {
            toastIt("Not Authorized!");
            Router.navigate("login");
            return;
        }
        videoFinish();
        uploadPartials('profile.htm', function() {
            indexOpened = false;
            openProfilePage();
        });
        toggleActive('profile');
    })
    .add(/login/, function() {
        closePhotoPage(event, 'login');
        sidebarClose();
        if (getCurrentUser()) {
            Router.navigate("index");
            return;
        }
        uploadPartials('login.htm', function() {
            indexOpened = false;
        });
        toggleActive('');
    })
    .add(/signup/, function() {
        closePhotoPage(event, 'signup');
        sidebarClose();
        if (getCurrentUser()) {
            Router.navigate("index");
            return;
        }
        uploadPartials('signup.htm', function() {
            indexOpened = false;
        });
        toggleActive('');
    })
    .listen();







/* SEC */



let navigation = document.querySelector("#navigation");
let sidebar = document.querySelector("#mySidebar");
let author = document.querySelector("#mySidebar > div > div");
let authorImg = document.querySelector("#mySidebar > div > img");

function updateActiveElement() {
    function _logout() {
        logout();
        updateActiveElement();
        Router.navigate('index');
        toastIt("Logout successful!");
    }

    function _login() {
        Router.navigate('login');
    }

    /*NAVIGATION*/
    function genNavButtCam() {
        // <a onclick='Router.navigate("cam")' id="camPage"><i class="material-icons">photo_camera</i>Cam</a>
        let a = document.createElement("a");
        a.id = "camPage";
        a.addEventListener("click", () => Router.navigate("cam"));
        a.appendChild(generateIcon("photo_camera"));
        a.innerHTML += "Cam";
        return a;
    }

    function genNavButtProfile() {
        // <a onclick='Router.navigate("profile")' id="profilePage"><i class="material-icons">dashboard</i>My Feed</a>
        let a = document.createElement("a");
        a.id = "profilePage";
        a.addEventListener("click", () => Router.navigate("profile"));
        a.appendChild(generateIcon("dashboard"));
        a.innerHTML += "My Feed";
        return a;
    }

    function genLogoutButt() {
        let div = document.createElement("div");
        div.innerHTML = "Log Out";
        div.addEventListener("click", () => {
            _logout();
        });
        return div;
    }

    function genLoginButt() {
        let div = document.createElement("div");
        div.innerHTML = "Log In";
        div.addEventListener("click", () => {
            _login();
        });
        return div;
    }

    /*SIDEBAR*/
    function genSideButtCam() {
        // <a onclick='Router.navigate("cam");sidebarClose()'><i class="material-icons">photo_camera</i>Cam</a>
        let a = document.createElement("a");
        a.addEventListener("click", () => {
            Router.navigate("cam");
            sidebarClose();
        });
        a.appendChild(generateIcon("photo_camera"));
        a.innerHTML += "Cam";
        return a;
    }

    function genSideButtProfile() {
        // <a onclick='Router.navigate("profile");sidebarClose()'><i class="material-icons">dashboard</i>My Feed</a>
        let a = document.createElement("a");
        a.addEventListener("click", () => {
            Router.navigate("profile");
            sidebarClose();
        });
        a.appendChild(generateIcon("dashboard"));
        a.innerHTML += "My Feed";
        return a;
    }
    function genSideButtLogout() {
        // <a onclick='sidebarClose()'><i class="material-icons">highlight_off</i>Logout</a>
        let a = document.createElement("a");
        a.addEventListener("click", () => {
            _logout();
            sidebarClose();
        });
        a.appendChild(generateIcon("highlight_off"));
        a.innerHTML += "Log Out";
        return a;
    }
    function genSideButtLogin() {
        // <a onclick='sidebarClose()'<i class="material-icons">account_circle</i>Login</a>
        let a = document.createElement("a");
        a.addEventListener("click", () => {
            _login();
            sidebarClose();
        });
        a.appendChild(generateIcon("account_circle"));
        a.innerHTML += "Log In";
        return a;
    }




    function removeChildByQuery(parentNode, childID) {
        let childNode = parentNode.querySelector(childID);
        if (childNode) {
            parentNode.removeChild(childNode);
        }
    }

    function removeAllNextSibling(parentNode, node) {
        let next = node.nextElementSibling;
        while (next) {
            parentNode.removeChild(next);
            next = node.nextElementSibling;
        }
    }


    if (getCurrentUser()) {
        /*nav*/
        removeChildByQuery(navigation, "#camPage");
        removeChildByQuery(navigation, "#profilePage");
        removeChildByQuery(navigation, "div");
        navigation.appendChild(genNavButtCam());
        navigation.appendChild(genNavButtProfile());
        navigation.appendChild(genLogoutButt());
        /*sidebar*/
        removeAllNextSibling(sidebar, sidebar.querySelector("a"));
        sidebar.appendChild(genSideButtCam());
        sidebar.appendChild(genSideButtProfile());
        sidebar.appendChild(genSideButtLogout());
        author.innerHTML = getCurrentUser();

    } else {
        /*nav*/
        removeChildByQuery(navigation, "#camPage");
        removeChildByQuery(navigation, "#profilePage");
        removeChildByQuery(navigation, "div");
        navigation.appendChild(genLoginButt());
        /*sidebar*/
        removeAllNextSibling(sidebar, sidebar.querySelector("a"));
        sidebar.appendChild(genSideButtLogin());
        author.innerHTML = "";
    }
    getCurrentUserAvatar().then((ava) => {
        authorImg.src = ava
    });
    console.log('Router: ' + Router.getFragment());
    Router.check(Router.getFragment());
    if (Router.getFragment() === '') {
        Router.check('index');
    }
    console.log(window.location.hash);
    if (window.location.hash === "#activated") {
        toastIt("Your account has been activated, now you can log in", 8);
    }
}

// updateActiveElement();
getCurrentUser();










