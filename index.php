<?php require "header.html"; ?>
<!--<section id="large-overlay1" class="hidden overlayClose" onclick="alert('2');">-->
<!--    <div id="large-overlay-div"  onclick="alert('1');">-->
<!--<!--        <div class="img">-->-->
<!--<!--            <img src="img/i2.jpg" alt="image-content">-->-->
<!--<!--            <div class="likes">43<i class="material-icons">favorite</i></div>-->-->
<!--<!--        </div>-->-->
<!--<!--        <div class="main-text">-->-->
<!--<!--            IMG-->-->
<!--<!--            <div class="line"></div>-->-->
<!--<!--        </div>-->-->
<!--        dfgdfg-->
<!--        <div class="butt" onclick="stopBubble(event)">-->
<!--            dfg-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->

<section id="overlay-l" aria-hidden="true">
    <div>
        <h2>Hello, I'm the overlayer</h2>

        <p>The internal div has the following style applied just to mimic a lot of content</p>

        <pre><code>
    .overlay div {
       margin: 15vh auto;
       width: 80%;
       max-width: 650px;
       padding: 30px;
       min-height: 200vh;
       background: rgba(255,255,255, .95);
    }
    </code></pre>


        <p>The <code>.overlay</code> has a background applied</p>

        <pre><code>
    .overlay div {
       background:  rgba(40,40,40, .75);
    }
  </code></pre>



        <button type="button" class="close-overlay">CLOSE LAYER</button>
    </div>
</section>


<button type="button" class="open-overlay">OPEN LAYER</button>

<div id="content">
    <div class="main-text">
        <div class="container">
            FEATURED PHOTOS
            <div class="line"></div>
        </div>
    </div>
    <div class="container wide-container">
        <div class="photo" onclick="overBoxOpn()">
            <img src="img/i1.jpg" alt="image-content">
            <div class="likes">41<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i2.jpg" alt="image-content">
            <div class="likes">43<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i3.jpg" alt="image-content">
            <div class="likes">23<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i4.jpg" alt="image-content">
            <div class="likes">67<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i5.jpg" alt="image-content">
            <div class="likes">31<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i6.jpg" alt="image-content">
            <div class="likes">58<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i7.jpg" alt="image-content">
            <div class="likes">83<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i8.jpg" alt="image-content">
            <div class="likes">64<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i9.jpg" alt="image-content">
            <div class="likes">96<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i10.jpg" alt="image-content">
            <div class="likes">27<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i11.jpg" alt="image-content">
            <div class="likes">66<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i12.jpg" alt="image-content">
            <div class="likes">78<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i13.jpg" alt="image-content">
            <div class="likes">35<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
            <img src="img/i14.jpg" alt="image-content">
            <div class="likes">74<i class="material-icons">favorite</i></div>
        </div>
        <div class="photo">
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
<?php require "footer.html" ?>
