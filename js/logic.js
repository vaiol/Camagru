var user = null;

function getCurrentUser() {
    if (user) {
        return user;
    }
    user = "AUTHOR";
    return user;
}

function getUserAvatar(userName) {
    return "img/ava/"+userName+".jpg"
}

function getCurrentUserAvatar() {
    console.log("ava: img/ava/"+getCurrentUser()+".jpg");
    return "img/ava/"+getCurrentUser()+".jpg"
}

function getPhotoById(id) {
    return {
        "id": id,
        "src": "img/i"+id+".jpg",
        "likeCount": 134,
        "chatCount": 32
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
    console.log("getPhotoList("+first+", "+last+")");
    if (first > 100) {
        return [
            {
                "id": 1,
                "src": "img/i"+1+".jpg",
                "likeCount": 134,
                "chatCount": 32
            },
            {
                "id": 2,
                "src": "img/i"+2+".jpg",
                "likeCount": 134,
                "chatCount": 32
            }
        ];
    }
    return [{"id":1,"src":"img/i1.jpg","likeCount":134,"chatCount":32},{"id":2,"src":"img/i2.jpg","likeCount":134,"chatCount":32},{"id":3,"src":"img/i3.jpg","likeCount":134,"chatCount":32},{"id":4,"src":"img/i4.jpg","likeCount":134,"chatCount":32},{"id":5,"src":"img/i5.jpg","likeCount":134,"chatCount":32},{"id":6,"src":"img/i6.jpg","likeCount":134,"chatCount":32},{"id":7,"src":"img/i7.jpg","likeCount":134,"chatCount":32},{"id":8,"src":"img/i8.jpg","likeCount":134,"chatCount":32},{"id":9,"src":"img/i9.jpg","likeCount":134,"chatCount":32},{"id":10,"src":"img/i10.jpg","likeCount":134,"chatCount":32},{"id":11,"src":"img/i11.jpg","likeCount":134,"chatCount":32},{"id":12,"src":"img/i12.jpg","likeCount":134,"chatCount":32},{"id":13,"src":"img/i13.jpg","likeCount":134,"chatCount":32},{"id":14,"src":"img/i14.jpg","likeCount":134,"chatCount":32},{"id":15,"src":"img/i15.jpg","likeCount":134,"chatCount":32},{"id":1,"src":"img/i1.jpg","likeCount":134,"chatCount":32},{"id":2,"src":"img/i2.jpg","likeCount":134,"chatCount":32},{"id":3,"src":"img/i3.jpg","likeCount":134,"chatCount":32},{"id":4,"src":"img/i4.jpg","likeCount":134,"chatCount":32},{"id":5,"src":"img/i5.jpg","likeCount":134,"chatCount":32},{"id":6,"src":"img/i6.jpg","likeCount":134,"chatCount":32},{"id":7,"src":"img/i7.jpg","likeCount":134,"chatCount":32},{"id":8,"src":"img/i8.jpg","likeCount":134,"chatCount":32},{"id":9,"src":"img/i9.jpg","likeCount":134,"chatCount":32},{"id":10,"src":"img/i10.jpg","likeCount":134,"chatCount":32},{"id":11,"src":"img/i11.jpg","likeCount":134,"chatCount":32},{"id":12,"src":"img/i12.jpg","likeCount":134,"chatCount":32},{"id":13,"src":"img/i13.jpg","likeCount":134,"chatCount":32},{"id":14,"src":"img/i14.jpg","likeCount":134,"chatCount":32},{"id":15,"src":"img/i15.jpg","likeCount":134,"chatCount":32}]
}




function makeLike(id) {
    console.log("like: " + id);
    return false;
}

function makeDislike(id) {
    console.log("dislike: " + id);
    return  false;
}

function sendComment(commentJSON) {
    //send
}