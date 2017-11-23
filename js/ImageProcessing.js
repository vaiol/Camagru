class ImageProcessing {
    constructor(img) {
        this.img = img;
        this.canvas = document.createElement("canvas");
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx = this.canvas.getContext("2d");

        this.type = 'png';
        this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.canvas.width, this.canvas.height);

        this.onload = () => img.onload();
        this.onerror = () => img.onerror();
    }
    getImage() {
        let newImg = new Image();
        if (this.type === 'png') {
            newImg.src = this.canvas.toDataURL();
        } else {
            newImg.src = this.canvas.toDataURL('image/jpeg');
        }
        return newImg;
    }
    squarify() {
        let canvas = document.createElement("canvas");
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        let ctx = canvas.getContext("2d");

        let widthSrc = this.canvas.width;
        let heightSrc = this.canvas.height;

        let shiftHeight = 0;
        let shiftWidth = 0;
        if (widthSrc > heightSrc) {
            shiftWidth = (widthSrc - heightSrc) / 2;
            canvas.width = heightSrc;
        } else if (widthSrc < heightSrc) {
            shiftHeight = (heightSrc - widthSrc) / 2;
            canvas.height = widthSrc;
        } else {
            return this;
        }
        ctx.drawImage(this.canvas, -shiftWidth, -shiftHeight);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx.drawImage(canvas, 0, 0);
        return this;
    };
    toJPG() {
        let canvas = document.createElement("canvas");
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;
        for(let i = 0; i < data.length; i += 4){
            if(data[i + 3] < 255){
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        ctx.drawImage(this.canvas, 0, 0);
        this.ctx.drawImage(canvas, 0, 0);
        canvas = null;
        ctx = null;
        this.type = 'jpeg';
        return this;
    };
    cut(maxWidth, maxHeight) {
        let resizeNeeded, width, height, ratio = 1;
        width = this.canvas.width;
        if (maxWidth && maxWidth < width) {
            resizeNeeded = true;
            ratio = width / maxWidth;
            width = maxWidth;
        }
        height = this.canvas.height / ratio;
        if (maxHeight && maxHeight < height) {
            resizeNeeded = true;
            ratio = height / maxHeight;
            width = width / ratio;
            height = maxHeight;
        }
        if (resizeNeeded) {
            this.resample(width, height);
        }
        return this;
    }
    resample(width, height) {
        width = Math.round(width);
        height = Math.round(height);
        let width_source = this.canvas.width;
        let height_source = this.canvas.height;
        let ratio_w = width_source / width;
        let ratio_h = height_source / height;
        let ratio_w_half = Math.ceil(ratio_w / 2);
        let ratio_h_half = Math.ceil(ratio_h / 2);

        let imgDataSrc = this.ctx.getImageData(0, 0, width_source, height_source);
        let imgDataDst = this.ctx.createImageData(width, height);
        let dataSrc = imgDataSrc.data;
        let dataDst = imgDataDst.data;

        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                let x2 = (i + j * width) * 4;
                let weight = 0;
                let weights = 0;
                let weights_alpha = 0;
                let gx_r = 0;
                let gx_g = 0;
                let gx_b = 0;
                let gx_a = 0;
                let center_y = j * ratio_h;

                let xx_start = Math.floor(i * ratio_w);
                let xx_stop = Math.ceil((i + 1) * ratio_w);
                let yy_start = Math.floor(j * ratio_h);
                let yy_stop = Math.ceil((j + 1) * ratio_h);
                xx_stop = Math.min(xx_stop, width_source);
                yy_stop = Math.min(yy_stop, height_source);

                for (let yy = yy_start; yy < yy_stop; yy++) {
                    let dy = Math.abs(center_y - yy) / ratio_h_half;
                    let center_x = i * ratio_w;
                    let w0 = dy * dy; //pre-calc part of w
                    for (let xx = xx_start; xx < xx_stop; xx++) {
                        let dx = Math.abs(center_x - xx) / ratio_w_half;
                        let w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            //pixel too far
                            continue;
                        }
                        //hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        let pos_x = 4 * (xx + yy * width_source);
                        //alpha
                        gx_a += weight * dataSrc[pos_x + 3];
                        weights_alpha += weight;
                        //colors
                        if (dataSrc[pos_x + 3] < 255)
                            weight = weight * dataSrc[pos_x + 3] / 250;
                        gx_r += weight * dataSrc[pos_x];
                        gx_g += weight * dataSrc[pos_x + 1];
                        gx_b += weight * dataSrc[pos_x + 2];
                        weights += weight;
                    }
                }
                dataDst[x2] = gx_r / weights;
                dataDst[x2 + 1] = gx_g / weights;
                dataDst[x2 + 2] = gx_b / weights;
                dataDst[x2 + 3] = gx_a / weights_alpha;
            }
        }
        //clear and resize canvas
        this.ctx.clearRect(0, 0, width_source, height_source);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.putImageData(imgDataDst, 0, 0);
        return this;
    };

    static resize(img, maxWidth, maxHeight, onsuccess) {
        let resizeNeeded, width, height, ratio = 1;
        width = img.width;
        if (maxWidth && maxWidth < width) {
            resizeNeeded = true;
            ratio = width / maxWidth;
            width = maxWidth;
        }
        height = img.height / ratio;
        if (maxHeight && maxHeight < height) {
            resizeNeeded = true;
            ratio = height / maxHeight;
            width = width / ratio;
            height = maxHeight;
        }
        if (resizeNeeded) {
            let newImg = new ImageProcessing(img).resample(width, height).getImage();
            newImg.onload = onsuccess(newImg);
        } else {
            onsuccess(img);
        }
    };
}