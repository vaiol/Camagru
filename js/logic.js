let userCache = null;
let avatarCache = null;

function getCurrentUser() {
    if (userCache) {
        return userCache;
    }
    console.log("getCurrentUser()");
    // userCache = "AUTHOR";
    userCache = "admin";
    return userCache;
}

function getUserAvatar(userName) {
    console.log("getUserAvatar("+userName+")");
    return "img/ava/"+userName+".jpg"
}

function getCurrentUserAvatar() {
    if (avatarCache) {
        return avatarCache;
    }
    console.log("getUserAvatar()");
    avatarCache = "img/ava/"+getCurrentUser()+".jpg";
    return avatarCache;
}

function getPhotoById(id) {
    console.log("getPhotoById("+id+")");
    return {
        "id": id,
        "src": "img/i"+id+".jpg",
        "likeCount": 134,
        "chatCount": 32,
        "user": "AUTHOR"
    };
}

function isLiked() {
    console.log("isLiked();");
    return false;
}

function getCommentList(id, first, last) {
    console.log("getCommentList("+id+", "+first+", "+last+")");
    if (first > 20) {
        return [
            {
                "user": getCurrentUser(),
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "img": id
            },
            {
                "user": getCurrentUser(),
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "img": id
            }
        ];
    }
    return [
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": "Diana",
            "text": "AUTHOR - БOT!!!!",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": "Diana",
            "text": "AUTHOR - БOT!!!!",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": "Diana",
            "text": "AUTHOR - БOT!!!!",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": "Diana",
            "text": "AUTHOR - БOT!!!!",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": getCurrentUser(),
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "img": id
        },
        {
            "user": "Diana",
            "text": "AUTHOR - БOT!!!!",
            "img": id
        }
    ];
}


function getPhotoList(first, last) {
    return new Promise(function(resolve, reject) {
        console.log("getPhotoList("+first+", "+last+")");
        let body = 'type=GET&list=ALL&login='+getCurrentUser()+'&first='+first+'&last='+last;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'controller/controller-photo.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(body);
    });
}


function getMyPhotoList(first, last) {
    return new Promise(function(resolve, reject) {
        console.log("getMyPhotoList("+first+", "+last+")");
        let body = 'type=GET&list=MYLIST&login='+getCurrentUser()+'&first='+first+'&last='+last;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'controller/controller-photo.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(body);
    });
}


function getFeaturedPhotoList(max) {
    return new Promise(function(resolve, reject) {
        console.log("getFeaturedPhotoList("+max+")");
        let body = 'type=GET&list=FEATURED&login='+getCurrentUser()+'&max='+max;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'controller/controller-photo.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(body);
    });
}


function deletePhoto(id) {
    console.log('deletePhoto('+id+')');
    return false;
}



function makeLike(id) {
    console.log("makeLike("+id+")");
    return false;
}

function makeDislike(id) {
    console.log("makeDislike("+id+")");
    return  false;
}

function sendComment(commentJSON) {
    console.log("sendComment()");
    //send
}