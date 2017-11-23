class ImageUploader {
    constructor(size = 6, maxWidth = undefined, maxHeight = undefined) {
        this.onSizeError = undefined;
        this.onTypeError = undefined;
        this.onFileError = undefined;
        this.onImageError = undefined;
        this.onloadend = (e) => {};
        this.onload = (e) => {};
        this.onerror = (msg) => {
            throw ("ImageUploader: " + msg);
        };


        // --- WHEN FINISH ---
        let _error = (error, msg) => {
            this.onloadend();
            if (error)
                error();
            else
                this.onerror(msg);
        };

        let _onload = (e) => {
            this.onloadend();
            this.onload(e);
        };

        let _upload = (file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                let newMask = new Image();
                newMask.onload = () => {
                    if (maxWidth || maxHeight) {
                        ImageProcessing.resize(newMask, maxWidth, maxHeight, _onload)
                    } else {
                        _onload(newMask);
                    }
                };
                newMask.onerror =  () => {
                    _error(this.onImageError, "ImageError");
                };
                newMask.src = reader.result;
            };
            reader.readAsDataURL(file);
        };

        // --- CREATE INPUT ---
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.accept = 'image/x-png,image/gif,image/jpeg';
        this.input.value = '';

        // --- WHEN FILE CHOSEN ---
        this.input.addEventListener("change", () => {
            let file = this.input.files[0];
            if (file) {
                if (file.size > (size * 1024 * 1024)) {
                    _error(this.onSizeError, "SizeError");
                } else if (!file.type.match('image.*')) {
                    _error(this.onTypeError, "TypeError");
                } else {
                    _upload(file);
                }
            } else {
                _error(this.onFileError, "FileError");
            }
            this.input.value = '';
        });
    }

    load() {
        this.input.click();
    }
}