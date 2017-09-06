function sidebarOpen() {
    var overlay = document.getElementById("myOverlay");
    var sidebar = document.getElementById("mySidebar");
    overlay.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    overlay.style.display = "block";
    sidebar.style.display = "block";
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    sidebar.classList.toggle('sidebarOpen');
    sidebar.classList.toggle('sidebarClose');
}

function sidebarClose() {
    var overlay = document.getElementById("myOverlay");
    var sidebar = document.getElementById("mySidebar");
    overlay.classList.toggle('overlayOpen');
    overlay.classList.toggle('overlayClose');
    sidebar.classList.toggle('sidebarOpen');
    sidebar.classList.toggle('sidebarClose');
    setTimeout(function() {
        overlay.style.display = "none";
        sidebar.style.display = "none";
    }, 200);
}

