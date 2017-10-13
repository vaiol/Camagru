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
<script src="js/diana.js"></script>
<script src="js/photo-page.js"></script>


<div id="content">

</div>
<div id="toast"></div>
<script src="js/routerConfig.js"></script>

<script src="js/input-range-ui.js"></script>

<script src="js/toast.js"></script>
<script src="js/index.js"></script>

<?php require "footer.html" ?>