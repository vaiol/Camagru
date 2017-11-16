function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}

class ImageUploader {
    constructor(size = 6, address="controller/imageUploader.php") {
        this.onSizeError = undefined;
        this.onTypeError = undefined;
        this.onFileError = undefined;
        this.onImageError = undefined;
        this.onLoadError = undefined;

        this.onerror = function (msg) {
            throw ("ImageUploader: " + msg);
        };
        this.onload = function (e) {
            console.log("ImageUploader: success");
            console.log(e);
        };

        let _error = (error, msg) => {
            if (error)
                error();
            else
                this.onerror(msg);
        };

        let _load = (img) => {
            // let body = 'src=' + src;
            let src = img.src;
            let block = src.split(";");
            let contentType = block[0].split(":")[1];
            let realData = block[1].split(",")[1];
            let blob = b64toBlob(realData, contentType);
            let formDataToUpload = new FormData();

            formDataToUpload.append("image", blob);


            let xhr = new XMLHttpRequest();
            xhr.open('POST', address, true);
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.onload(xhr.responseText);
                    } else {
                        _error(this.onLoadError, "LoadError");
                    }
                }
            };
            xhr.send(formDataToUpload);
        };


        // --- CREATE INPUT ---
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.accept = 'image/x-png,image/gif,image/jpeg';
        this.input.value = "";

        // --- WHEN FILE CHOSEN ---
        this.input.addEventListener("change", function() {
            let file = this.files[0];
            if (file.size > (size * 1024 * 1024)) {
                _error(this.onSizeError, "sizeError");
            }
            if (!file.type.match('image.*')) {
                _error(this.onTypeError, "TypeError");
            }

            let reader = new FileReader();
            reader.onloadend = function () {
                let newMask = new Image();
                newMask.onload = function () {
                    _load(newMask);
                };
                newMask.onerror = function () {
                    _error(this.onImageError, "ImageError");
                };
                newMask.src = this.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            } else {
                _error(this.onFileError, "FileError");
            }
            this.value = "";
        });
    }

    load() {
        this.input.click();
    }
}