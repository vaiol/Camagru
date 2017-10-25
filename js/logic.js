let userCache = null;
let avatarCache = null;

function getCurrentUser() {
    if (userCache) {
        return userCache;
    }
    console.log("getCurrentUser()");
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
            console.log(xhr.readyState);
            console.log(xhr.status);
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
            console.log(xhr.readyState);
            console.log(xhr.status);
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(body);
    });
}


function getFeaturedPhotoList(max) {
    console.log("getFeaturedPhotoList("+max+")");
    return [{"id":1,"src":"img/i1.jpg","likeCount":134,"chatCount":32},{"id":2,"src":"img/i2.jpg","likeCount":134,"chatCount":32},{"id":3,"src":"img/i3.jpg","likeCount":134,"chatCount":32},{"id":4,"src":"img/i4.jpg","likeCount":134,"chatCount":32},{"id":5,"src":"img/i5.jpg","likeCount":134,"chatCount":32},{"id":6,"src":"img/i6.jpg","likeCount":134,"chatCount":32},{"id":7,"src":"img/i7.jpg","likeCount":134,"chatCount":32},{"id":8,"src":"img/i8.jpg","likeCount":134,"chatCount":32},{"id":9,"src":"img/i9.jpg","likeCount":134,"chatCount":32},{"id":10,"src":"img/i10.jpg","likeCount":134,"chatCount":32},{"id":11,"src":"img/i11.jpg","likeCount":134,"chatCount":32},{"id":12,"src":"img/i12.jpg","likeCount":134,"chatCount":32},{"id":13,"src":"img/i13.jpg","likeCount":134,"chatCount":32},{"id":14,"src":"img/i13.jpg","likeCount":134,"chatCount":32},{"id":15,"src":"img/i15.jpg","likeCount":134,"chatCount":32}]
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