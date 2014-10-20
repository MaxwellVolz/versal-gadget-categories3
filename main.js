//global vars

var startTime = 0;
var timeLeft = 0;

var player = new VersalPlayerAPI();

player.setPropertySheetAttributes({
    timeOption: { type: 'Select',
        options: ['Record', 'Countdown']
    },
    timeAllowed:  { type: 'Range', min: 10, max: 300, step: 5 }

});

player.on('attributesChanged', function (attrs) {

    console.log('attributesChanged', attrs);
    if (attrs) {

        //textArrayObj[2].value = attrs.word2x
        //textarea.value = textArray[0];
        if(attrs.timeOption == "Countdown"){
            timeLeft = attrs.timeAllowed;

        };
    }

});

player.on('editableChanged', function (editableObj) {
    if (editableObj.editable) {
        //Author State
        } else {
        //Learner State

        }
});


// send this command to receive initial events
player.startListening();

// continuously watch for changes in height
player.watchBodyHeight();

// save a textarea

// change textarea when attributes change


//focus on text for card
$('body').on('click', '.face', function () {
    //alert("hey");
    $(this).children("input").focus();
});

//premade card
var cardPremade = "<div class='draggable card'><div class='face'><div class='catDotContainer'></div><div class='cardCategories'></div><i class='killCard icon-remove icon-1x'></i><input placeholder='new card'></div></div>";
var ojDotPremade = "<i id='ojDot' class='killDot fa icon-circle'><i class='dotX icon-remove icon-1x'></i></i>";
var tealDotPremade = "<i id='tealDot' class='killDot fa icon-circle'><i class='dotX icon-remove icon-1x'></i></i>";
var blueDotPremade = "<i id='blueDot' class='killDot fa icon-circle'><i class='dotX icon-remove icon-1x'></i></i>";
var redDotPremade = "<i id='redDot' class='killDot fa icon-circle'><i class='dotX icon-remove icon-1x'></i></i>";
    
//destroy card
$('body').on('click', '.killCard', function () {
    //alert("hey");
    $(this).parent().parent().remove();

});

//make and focus new card
$('body').on('click', '.newCard', function () {

    //$('.cardReel').append(cardPremade);
    $(cardPremade).insertBefore('.newCard');

   $(this).children("input").focus();

    var cardAmount = $(".card").size();


    //reinitialize dragging on dynamic cards
    makeItDrag();
});

//click controller for category dots
$('body').on('click','i.dotX',function(){

    //get currently clicked dots id for class name
    var thisID = $(this).parent().attr("id");

    //remove the color class from the card object
    $(this).parent().parent().parent().parent().removeClass(thisID);

    //remove the colored dot
    $(this).parent().remove();
})


//make that shit draggable
function makeItDrag(){
    $(".draggable").draggable({
        revert: function(is_valid_drop){
            console.log("is_valid_drop = " + is_valid_drop);
            if(!is_valid_drop){

                //make a log
                console.log("revert invalid");

                //send to back of cardReel stack
                $(this).appendTo(".cardReel");

                return true;
            } else {

            }

        }
    });
}


//update card text when deselected
var entryArray = [];

$(window).bind("load", function () {

    //$(".card").css({ '-moz-transform': 'rotateX(' + 180 + 'deg)'});
    //$('div.card #f1_card').addClass('rotate180d');

    makeItDrag();


    $(function () {
        //Make drag class draggable

        //Category 1 stickiness
        $("#category1").droppable({
            accept: ".draggable",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });

        //Category 2 stickiness
        $("#droppable2").droppable({
            accept: ".cat1",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("pulseGreen2");
                $(".aboutToDrop").remove();

                pulseDropZone2();
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });
        //Category 3 stickiness
        $("#droppable3").droppable({
            accept: ".cat2",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("pulseGreen3");
                $(".aboutToDrop").remove();

                pulseDropZone3();
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });
    });

});


function makeCards() {




    //end of make cards
    $("div.drag:nth-child(odd)").appendTo("div#wordBank");
    $("div.drag:nth-child(3n+1)").appendTo("div#wordBank");
    $("div.drag:nth-child(odd)").appendTo("div#wordBank");
    //$(this).parent().attr('value');

}


function startTimer(){

    var diff =  new Date();
    startTime = Math.floor(diff/1000);

    /*
    var timer = setInterval(function() {
        timeLeft -= 1;
        $("div#timer").html("Time Left: " + timeLeft);

    }, 1000);
    */
}


function startClock(){

    var secondsVar = timeLeft % 60;
    var minutesVar =  Math.floor(timeLeft/60);

    $('#ms_timer').countdowntimer({
        minutes : minutesVar,
        seconds : secondsVar,
        size : "lg",
        backgroundColor: "#f8f7f1",
        fontColor : "#7c7975",
        timeUp : timeisUp
    });
}

