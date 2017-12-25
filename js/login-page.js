function openRestore() {
    document.querySelector("#restoreForm").classList.remove("none");
    document.querySelector("#restButt").classList.add("none");
}


function loginProcc() {
    let loginForm = document.querySelector('#loginForm');
    let formData = new FormData(loginForm);
    let user = formData.get("user");
    let pass = formData.get("pass");

    login(user, pass).then(function (name) {
        toastIt("Welcome back, " + name);
        Router.navigate('index');
        updateActiveElement();
    }, function (status) {
        if (status === 300) {
            toastIt("Your account is not activated!", 5);
        } else if (status === 403) {
            toastIt("Login or password is incorrect!", 5);
        }
    });
    /*CLEAR INPUT*/
    let elements = loginForm.querySelectorAll("input");
    for (let i = 0, len = elements.length; i < len; i++) {
        if (elements[i].type == "text" || elements[i].type == "password") {
            elements[i].value = "";
        }
    }
}



let logF = false;
let emaF = false;
let passF = false;


function addErrToElem(elem, textErr) {
    elem.classList.add('badInput');
    elem.previousElementSibling.lastElementChild.innerHTML = textErr;
}

function removeErrToElem(elem) {
    elem.classList.remove('badInput');
    elem.previousElementSibling.lastElementChild.innerHTML = "";
}

function loginCheck(elem) {
    let val = elem.value;
    val = val.replace(/[^a-z0-9]/gi,'');
    elem.value = val;

    if (val.length < 4) {
        addErrToElem(elem, "minimum 4 symbols");
        logF = false;
    } else if (val.length > 20) {
        addErrToElem(elem, "maximum 20 symbols");
        logF = false;
    } else {
        removeErrToElem(elem);
        logF = true;
    }
    if (val === '') {
        removeErrToElem(elem);
    }
}


function emailCheck(elem) {
    let val = elem.value;
    elem.value = val.trim();

    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(val)) {
        addErrToElem(elem, "not valid email");
        emaF = false;
    } else {
        removeErrToElem(elem);
        emaF = true;
    }
    if (val === '') {
        removeErrToElem(elem);
    }
}

function passCheck(elem) {
    let val = elem.value;
    if (val.length < 7) {
        addErrToElem(elem, "minimum 7 symbols");
    } else if (val.length > 100) {
        addErrToElem(elem, "maximum 100 symbols");
    } else {
        removeErrToElem(elem);
    }
    if (val === '') {
        removeErrToElem(elem);
    }
    pass2Check(elem.nextElementSibling.nextElementSibling);
}

function pass2Check(elem) {
    let val = elem.value;
    let prevInput = elem.previousElementSibling.previousElementSibling;
    if (val !== prevInput.value) {
        addErrToElem(elem, "pass don't match");
        passF = false;
    } else if (val.length < 7) {
        addErrToElem(elem, "minimum 7 symbols");
        passF = false;
    } else if (val.length > 100) {
        addErrToElem(elem, "maximum 100 symbols");
        passF = false;
    } else {
        passF = true;
        removeErrToElem(elem);
    }
    if (prevInput.value === '' || val === '') {
        removeErrToElem(elem);
    }
}


function formRegCheck(elem) {
    let allIsGood = logF && emaF && passF;
    if (allIsGood) {
        elem.lastElementChild.classList.remove('inactiveButt');
        elem.lastElementChild.disabled = false;
    } else {
        elem.lastElementChild.classList.add('inactiveButt');
        elem.lastElementChild.disabled = true;
    }
}

function regProcc() {
    let regForm = document.querySelector('#regForm');
    let formData = new FormData(regForm);
    let login = formData.get("login");
    let email = formData.get("email");
    let pass1 = formData.get("pass1");
    let pass2 = formData.get("pass2");
    let elements = regForm.querySelectorAll("input");

    if (login.length < 4) {
        toastIt("Login must be at least 4 symbols!", 5);
        return;
    }
    if (login.length > 20) {
        toastIt("Maximum login length is 20 symbols!", 5);
        return;
    }
    if (pass1 !== pass2) {
        toastIt("Passwords in both fields must be equal!", 5);
        /*CLEAR PASSS*/
        for (let i = 0, len = elements.length; i < len; i++) {
            if (elements[i].type == "password") {
                elements[i].value = "";
            }
        }
        return;
    }
    if (pass1.length < 7) {
        toastIt("Password must be at least 7 symbols!", 5);
        return;
    }
    if (pass1.length > 100) {
        toastIt("Maximum password length is 100 symbols!", 5);
        return;
    }

    if (email.length < 4) {
        toastIt("Email must be at least 4 symbols!", 5);
        return;
    }
    if (email.length > 100) {
        toastIt("Maximum email length is 100 symbols!", 5);
        return;
    }

    signup(login, email, pass1, pass2).then(function (status) {
        if (status === 200) {
            Router.navigate("index");
            toastIt("Please confirm your email! And log in!", 8);
        } else if (status === 302) {
            toastIt("User with the same login exist!", 5);
        } else if (status === 301) {
            toastIt("User with the same email exist!", 5);
        } else {
            toastIt("Unexpected error!", 5);
        }
    });
}

function restoreProcc(form) {
    let formData = new FormData(document.querySelector('#restoreForm'));
    let user = formData.get("user");
    restorePass(user).then(function (status) {
        if (status === 200) {
            toastIt("Check your email to restore pass!", 8);
        } else if (status === 300) {
            toastIt("User not found", 5);
        } else {
            toastIt("Unexpected error: " + status, 5)
        }
    });
}

function getURLdata(name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    let regexS = "[\\?&]"+name+"=([^&#]*)";
    let regex = new RegExp( regexS );
    let results = regex.exec( url );
    return results === null ? null : results[1];
}

function restoreProccPh2() {
    let formData = new FormData(document.querySelector('#restorePh2Form'));
    let code = getURLdata("c");
    let user = getURLdata("u");
    let pass1 = formData.get("pass1");
    let pass2 = formData.get("pass2");
    if (pass1 !== pass2) {
        toastIt("pass's don't match!");
    } else if (!code) {
        toastIt("activation code not found, your link broken");
    }
    else if (!user) {
        toastIt("user email not found, your link broken");
    } else {
        changePass(user, code, pass1).then(function (status) {
            if (status == 200) {
                toastIt("Your pass changed successful!!", 8);
                Router.navigate("login");
                logout();
                updateActiveElement();
            } else {
                toastIt("Error: " + status, 5)
            }
        });
    }
}

function confirmMailController() {
    let code = getURLdata("c");
    confirmMail(code).then(function (status) {
        if (status == 200) {
            let div = document.querySelector(".main-text > .container");
            div.innerHTML = "Your email confirmed successful, now you can log in!";
            // let timer = document.createElement("div");
            // timer.id = "timerCount";
            // div.appendChild(timer);
            let distance = 5;
            let x = setInterval(function() {
                toastIt("Redirect on index in: " + distance);
                distance--;
                if (distance < 0) {
                    clearInterval(x);
                    toastIt("Now yo can log in!");
                    Router.navigate("index");
                }
            }, 1000);
        } else {
            toastIt("Error: " + status, 5)
        }
    });
}

