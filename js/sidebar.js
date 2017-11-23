let opened = false;

function sidebarOpen() {
    if (opened) {
        return;
    }
    let overlay = document.getElementById("myOverlay");
    let sidebar = document.getElementById("mySidebar");
    overlay.addEventListener("click", closePhotoPage);

    overlay.classList.remove('hidden');
    overlay.classList.add('overlayOpen');
    overlay.classList.remove('overlayClose');


    sidebar.classList.remove('hidden');
    overlay.style.display = "block";
    sidebar.style.display = "block";
    overlay.classList.add('overlayOpen');
    overlay.classList.remove('overlayClose');
    sidebar.classList.add('sidebarOpen');
    sidebar.classList.remove('sidebarClose');

    if (document.body.offsetWidth < window.innerWidth) {
        document.body.classList.add('noscroll15');
    }
    document.body.classList.add('noscroll');
    opened = true;
}

function sidebarClose() {
    if (!opened) {
        return;
    }
    let overlay = document.getElementById("myOverlay");
    let sidebar = document.getElementById("mySidebar");
    overlay.classList.remove('overlayOpen');
    overlay.classList.add('overlayClose');
    sidebar.classList.remove('sidebarOpen');
    sidebar.classList.add('sidebarClose');
    setTimeout(function() {
        overlay.style.display = "none";
        sidebar.style.display = "none";
        document.body.classList.remove('noscroll15');
        document.body.classList.remove('noscroll');
    }, 200);
    opened = false;

}

