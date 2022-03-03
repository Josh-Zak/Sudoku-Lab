let scores = [];
let score1 = {"Date":"2021/01/17", "Duration":"3:41"};
let score2 = {"Date":"2021/01/21", "Duration":"4:01"};
let score3 = {"Date":"2021/02/01", "Duration":"2:52"};
let score4 = {"Date":"2021/02/17", "Duration":"3:08"};
let score5 = {"Date":"2021/03/02", "Duration":"2:51"};

scores.push(score1, score2, score3, score4, score5);

$(document).ready(function(){

    //Dynamically add the high scores
    $('#highScores tr').each(function(index){
        if(index == 0){
            return true;
        }

        let items = $(this).children();
        $(items[0]).text(scores[index-1]['Date']);
        $(items[1]).text(scores[index-1]["Duration"]);
    });
});