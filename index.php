<?php require "header.html"; ?>
<section id="overlay-main" class="overlayClose hidden">
    <div id='overlay-content' onclick="stopBubble(event)">
        <div class="img">
            <img id="image-full" alt="image-content">
        </div>
        <div id="author-block">
            <div>
                <div>
                    <i id="like-button" class="material-icons">favorite_border</i>
                    <div id="like-counter"></div>

                </div>
                <div id="chat-button">
                    <i class="material-icons">forum</i>
                    <div id="chat-counter"></div>
                </div>
            </div>
            <div id="author-button">
                <img alt="ava">
                <div></div>
            </div>
        </div>
        <div id="comment-block" class="none comm-hidden">
            <div class="line"></div>
            <div id="add-comment">
                <form action="javascript:addComment();">
                   <textarea></textarea>
                    <input type="submit" value="ADD COMMENT">
                </form>
            </div>
            <div class="small-line">
                <div class="line"></div>
            </div>
            <div id="comment-list">
            </div>
        </div>
        <div id="endofdiv" class="none"></div>
    </div>
</section>


<div id="content">
    <div class="main-text">
        <div class="container">
            FEATURED PHOTOS
            <div class="line"></div>
        </div>
    </div>
    <div class="container wide-container">
        <div class="photo" onclick="openPhotoPage(1)">
            <img src="img/i1.jpg" alt="image-content">
            <div class="likes">41<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(2)">
            <img src="img/i2.jpg" alt="image-content">
            <div class="likes">43<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(3)">
            <img src="img/i3.jpg" alt="image-content">
            <div class="likes">23<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(4)">
            <img src="img/i4.jpg" alt="image-content">
            <div class="likes">67<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(5)">
            <img src="img/i5.jpg" alt="image-content">
            <div class="likes">31<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(6)">
            <img src="img/i6.jpg" alt="image-content">
            <div class="likes">58<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(7)">
            <img src="img/i7.jpg" alt="image-content">
            <div class="likes">83<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(8)">
            <img src="img/i8.jpg" alt="image-content">
            <div class="likes">64<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(9)">
            <img src="img/i9.jpg" alt="image-content">
            <div class="likes">96<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(10)">
            <img src="img/i10.jpg" alt="image-content">
            <div class="likes">27<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(11)">
            <img src="img/i11.jpg" alt="image-content">
            <div class="likes">66<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(12)">
            <img src="img/i12.jpg" alt="image-content">
            <div class="likes">78<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(13)">
            <img src="img/i13.jpg" alt="image-content">
            <div class="likes">35<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(14)">
            <img src="img/i14.jpg" alt="image-content">
            <div class="likes">74<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo" onclick="openPhotoPage(15)">
            <img src="img/i15.jpg" alt="image-content">
            <div class="likes">13<i class="material-icons">favorite</i></div>
        </div>
    </div>
    <div class="main-text">
        <div class="container">
            LAST ADDED PHOTOS
            <div class="line"></div>
        </div>
    </div>
    <div class="container wide-container">
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
    </div>
    <div id="butt-next">
        <div class="container">
            <div class="butt-next-button">
                SHOW MORE
            </div>
        </div>
    </div>
</div>
<script src="js/index.js"></script>
<script src="js/diana.js"></script>
<script src="js/photo-page.js"></script>
<?php require "footer.html" ?>