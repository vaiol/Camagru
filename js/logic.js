let userCache = null;
let avatarCache = null;
let photoListCache = null;
let rootCache = null;

let deletedPhotoCount = 0;

/*COOKIE FUNCTIONS*/

function setCookie(name, value, time) {
    let d = new Date();
    if (!time) {
        time = 2;
    }
    d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

/*AUTH FUNCTIONS*/

function restorePass(user) {
    if (!user) {
        user = getCurrentUser();
    }
    return new Promise((resolve, reject) => {
        ajax_post('GET', 'user', {"user":user}, (response) => {
            resolve(parseInt(response));
        });
    });
}

function changePass(user, code, pass) {
    return new Promise((resolve, reject) => {
        ajax_post('POST', 'user', {"user":user, "code":code, "pass1":pass, "pass2":pass}, (response) => {
            resolve(response);
        });
    });
}

function signup(login, email, pass1, pass2) {
    return new Promise((resolve, reject) => {
        ajax_post('PUT', 'user', {"login":login, "email":email, "pass1":pass1, "pass2":pass2}, (response) => {
            resolve(parseInt(response));
        });
    });
}

function login(user, pass) {
    return new Promise((resolve, reject) => {
        ajax_post('PUT', 'session', {"user":user, "pass":pass}, (response) => {
            let res = JSON.parse(response);
            if (res.status === "200") {
                setCookie("sessionID", res.sessionID);
                setCookie('name', res.user);
                userCache = res.user;
                resolve(res.user);
            } else if (res.status === "300") {
                reject(300);
            } else {
                reject(403);
            }
        });
    });
}

function logout() {
    userCache = undefined;
    deleteCookie("name");
    deleteCookie("sessionID");
}

function confirmMail(code) {
    return new Promise((resolve, reject) => {
        ajax_post('CONFIRM', 'user', {"code":code}, (response) => {
            resolve(response);
        });
    });
}


/*NOTIFICATIONS FUNCTIONS */

function getNotif() {
    return new Promise((resolve, reject) => {
        ajax_post('GET', 'notification', null, (response) => {
            resolve(response);
        });
    });
}

function disableNotifications() {
    return new Promise((resolve, reject) => {
        ajax_post('DELETE', 'notification', null, (response) => {
            resolve(response);
        });
    });
}

function enableNotifications() {
    return new Promise((resolve, reject) => {
        ajax_post('PUT', 'notification', null, (response) => {
            resolve(response);
        });
    });
}






/*ADDITIONAL FUNCTIONS */

let requstedLogin = false;
function getCurrentUser() {
    if (userCache) {
        return userCache;
    }
    if (requstedLogin) {
        userCache = getCookie("name");
        return userCache;
    }
    ajax_post('GET', 'session', null, (response) => {
        requstedLogin = true;
        if (response === '') {
            userCache = undefined;
        } else {
            userCache = response;
        }
        updateActiveElement();
    });
    return userCache;
}

function getRoot() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'controller/getRoot.php', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
        };
        xhr.send();
    });
}

function getUserAvatar(userName) {
    return new Promise((resolve, reject) => {
        if (avatarCache && avatarCache[userName]) {
            resolve(avatarCache[userName]);
            return;
        }
        ajax_post('GET', 'ava', {"user":userName}, (response) => {
            cacheAvatar(userName, response);
            resolve(response);
        });

    });
}

function getCurrentUserAvatar() {
    return getUserAvatar(getCurrentUser());
}

function ajax_post(type, address, otherBody, onloadFunc) {
    let body = 'type='+type;
    if (otherBody) {
        for (let prop in otherBody) {
            body += '&' + prop + '=' + otherBody[prop];
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'controller/controller-'+address+'.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (onloadFunc) {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                onloadFunc(xhr.responseText);
            }
        };
    }
    xhr.send(body);
}

/*PHOTO FUNCTIONS*/

function uploadPhotoRes(fd) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'controller/controller-photo.php', true);
    xhr.send(fd);
}

function getPhotoById(id) {
    return new Promise(function(resolve, reject) {
        ajax_post('GET', 'photo', {"list":"SINGLE", "id":id}, (response) => {
            let photo = JSON.parse(response);
            cachePhoto(photo);
            resolve(photo);
        });
    });
}

function toggleProgress(progress, all) {
    progress.classList.toggle('determinate');
    progress.classList.toggle('indeterminate');
    if (all) {
        progress.classList.toggle('width0');
    } else {
        progress.classList.toggle('width100');
    }
}

function getPhotoList(first, last) {
    return new Promise(function(resolve, reject) {
        let pLa = document.querySelector('#progress-la');
        let pAll = document.querySelector('#progress-all');
        if (pLa && pAll) {
            toggleProgress(pLa.firstElementChild);
            toggleProgress(pAll.firstElementChild);
        }
        ajax_post('GET', 'photo', {"list":"ALL", "first":first, "last":last}, (response) => {
            let list = JSON.parse(response);
            cacheList(list);
            if (pLa && pAll) {
                toggleProgress(pLa.firstElementChild);
                toggleProgress(pAll.firstElementChild);
            }
            resolve(list);
        });
    });
}

function getMyPhotoList(first, last) {
    return new Promise(function(resolve, reject) {
        if (first === 0) {
            deletedPhotoCount = 0;
        } else {
            first -= deletedPhotoCount;
            last -= deletedPhotoCount;
        }

        let pMy = document.querySelector('#progress-my');
        let pAll = document.querySelector('#progress-all');
        if (pMy && pAll) {
            toggleProgress(pMy.firstElementChild);
            toggleProgress(pAll.firstElementChild);
        }
        ajax_post('GET', 'photo', {"list":"MYLIST", "first":first, "last":last}, (response) => {
            if (pMy && pAll) {
                toggleProgress(pMy.firstElementChild);
                toggleProgress(pAll.firstElementChild);
            }
            resolve(JSON.parse(response));
        });
    });
}


function getFeaturedPhotoList(max) {
    return new Promise(function(resolve, reject) {
        let progressBar = document.querySelector('#progress-f').firstElementChild;
        toggleProgress(progressBar);
        ajax_post('GET', 'photo', {"list":"FEATURED", "max":max}, (response) => {
            let list = JSON.parse(response);
            cacheList(list);
            toggleProgress(progressBar);
            resolve(list);
        });
    });
}


function deletePhoto(id) {
    ajax_post('DELETE', 'photo', {"id":id}, (response) => {
        deletedPhotoCount++;
    });
}

/*COMMENT FUNCTIONS*/

function sendComment(commentJSON) {
    ajax_post('PUT', 'comment', commentJSON);
}


function getCommentList(id, first, last) {
    return new Promise(function(resolve, reject) {
        ajax_post('GET', 'comment', {"img":id, "first":first, "last":last}, (response) => {
            resolve(JSON.parse(response));
        });
    });
}

/*LIKES FUNCTIONS*/

function makeLike(id) {
    ajax_post('PUT', 'like', {"id":id});

}

function makeDislike(id) {
    ajax_post('DELETE', 'like', {"id":id});
}

function isLiked(id) {
    return new Promise(function(resolve, reject) {
        ajax_post('GET', 'like', {"id":id}, (response) => {
            resolve(response);
        });
    });
}

/*AVA*/

function sendAva(imgSrc) {
    ajax_post('PUT', 'ava', {"file":imgSrc});
}


/*CACHE*/

function cacheAvatar(userLogin, src) {
    if (!avatarCache) {
        avatarCache = {};
    }
    if (!avatarCache[userLogin]) {
        avatarCache[userLogin] = src;
    }
}

function cacheList(list) {
    if (!photoListCache) {
        photoListCache = list;
        return;
    }
    for (let i = 0, len = list.length; i < len; i++) {
        let flag = true;
        for (let j = 0, len = photoListCache.length; j < len; j++) {
            if (photoListCache[j].id === list[i].id) {
                photoListCache[j] = list[i];
                flag = false;
                break;
            }
        }
        if (flag) {
            photoListCache.push(list[i]);
        }
    }
}

function getPhotoCacheByID(id) {
    if (!photoListCache) {
        return null;
    }
    for (let i = 0, len = photoListCache.length; i < len; i++) {
        if (photoListCache[i].id === id) {
            return photoListCache[i];
        }
    }
    return null;
}

function cachePhoto(photo) {
    if (!photoListCache) {
        photoListCache = [];
        photoListCache.push(photo);
        return;
    }
    for (let j = 0, len = photoListCache.length; j < len; j++) {
        if (photoListCache[j].id === photo.id) {
            photoListCache[j] = photo;
            return;
        }
    }
    photoListCache.push(photo);
}



/*GENERATE*/

function generateBackButton(evt) {
    let i = document.createElement("i");
    i.innerHTML = "arrow_back";
    i.className = "material-icons";
    let button = document.createElement("button");
    button.id = "back-btn";
    button.className = "nav-btn";
    button.appendChild(i);
    button.onclick = evt;
    return button;
}
