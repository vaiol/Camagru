var currDiana = 0;

var msgDiana = [
    {
        "user": "Diana",
        "text": "Завали хавало! Щенок...",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Ты че борзый сильно????",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Поздно, я тебя завалю...",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Ну лааааадно простиииии",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Сука где мой кофееее???? Я просила кофеееееее",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Всеееее я оффф",
        "img": 0
    },
    {
        "user": "Diana",
        "text": "Проверить решил??? Я реально всеее. Ня покаа...",
        "img": 0
    }
];


function callDiana(commentList) {
    if (currDiana < 7) {
        setTimeout(function() {
            commentList.insertBefore(generateCommentBlock(msgDiana[currDiana]), commentList.firstChild);
            currDiana++;
        }, 4000);
    }
}




