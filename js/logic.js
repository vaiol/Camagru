let userCache = null;
let avatarCache = null;
let photoListCache = null;

let deletedPhotoCount = 0;


function setCookie(name, value, time) {
    let d = new Date();
    if (!time) {
        time = 2;
    }
    d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCurrentUser() {
    if (userCache) {
        return userCache;
    }
    console.log("getCurrentUser()");

    userCache = "AUTHOR";
    // userCache = "admin";
    // userCache = "Diana";
    setCookie('name', userCache);
    return userCache;
}

function getUserAvatar(userName) {
    return new Promise((resolve, reject) => {
        if (avatarCache && avatarCache[userName]) {
            resolve(avatarCache[userName]);
            return;
        }
        console.log("getUserAvatar("+userName+")");
        ajax_post('GET', 'user', {"user":userName}, (response) => {
            cacheAvatar(userName, response);
            resolve(response);
        });

    });
}

function getCurrentUserAvatar() {
    return getUserAvatar(getCurrentUser());
}

function ajax_post(type, address, otherBody, onloadFunc) {
    let body = 'login='+getCurrentUser()+'&type='+type;
    for (let prop in otherBody) {
        body += '&'+prop+'='+otherBody[prop];
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

function getPhotoById(id) {
    return new Promise(function(resolve, reject) {
        console.log("getPhotoById("+id+")");
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

        console.log("getPhotoList("+first+", "+last+")");
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

        console.log("getMyPhotoList("+first+", "+last+")");
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

        console.log("getFeaturedPhotoList("+max+")");
        ajax_post('GET', 'photo', {"list":"FEATURED", "max":max}, (response) => {
            let list = JSON.parse(response);
            cacheList(list);
            toggleProgress(progressBar);
            resolve(list);
        });
    });
}


function deletePhoto(id) {
    console.log("deletePhoto("+id+")");
    ajax_post('DELETE', 'photo', {"id":id}, (response) => {
        deletedPhotoCount++;
    });
}

/*COMMENT FUNCTIONS*/

function sendComment(commentJSON) {
    console.log("sendComment()");
    ajax_post('PUT', 'comment', commentJSON);
}


function getCommentList(id, first, last) {
    return new Promise(function(resolve, reject) {
        console.log("getCommentList("+id+", "+first+", "+last+")");
        ajax_post('GET', 'comment', {"img":id, "first":first, "last":last}, (response) => {
            resolve(JSON.parse(response));
        });
    });
}

/*LIKES FUNCTIONS*/

function makeLike(id) {
    console.log("makeLike("+id+")");
    ajax_post('PUT', 'like', {"id":id});

}

function makeDislike(id) {
    console.log("makeDislike("+id+")");
    ajax_post('DELETE', 'like', {"id":id});
}

function isLiked(id) {
    return new Promise(function(resolve, reject) {
        console.log("isLiked("+id+")");
        ajax_post('GET', 'like', {"id":id}, (response) => {
            resolve(response);
        });
    });
}

/*AVA*/

function sendAva(imgSrc) {
    ajax_post('PUT', 'user', {"file":imgSrc}, function (e) {
        console.log(e);
    });
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
