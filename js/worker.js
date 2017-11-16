

this.onmessage = function (event) {
    let img = window.createElement('img');
    let tmpCanvas = window.createElement('canvas');
    tmpCanvas.width = img.width;
    tmpCanvas.height = img.height;
    console.log(event.data);
};