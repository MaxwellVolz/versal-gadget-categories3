//global vars
var textArray = [];
var textArrayObjs = [];
var learnerState = true;
var wordCount = 0;
var startTime = 0;
var endTime = 0;
var totalTime = 0;
var timeStart = false;
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
$('body').on('click', '.card', function () {
    //alert("hey");
    $(this).children("input").focus();
});

//destory card
$('body').on('click', '.killCard', function () {
    //alert("hey");
    $(this).parent().remove();
});
$('body').on('blur', '.card', function () {

    //check for value in new card input
    var tempVal = $(this).children("input").val();

    if(tempVal == ""){

        //set new card style
        $(this).css({
            'border-style':'dotted',
            'background-color':'#f2f1ed'
        })
        $(this).children("input").css({
            'background-color':'#f2f1ed'
        });
    }
    else{
        $(this).css({
            'border-style':'solid',
            'background-color':'#ffffff'
        })
        $(this).children("input").css({
            'background-color':'#ffffff'
        });
    }





    //$(this).parent().remove();
});



//update card text when deselected
var entryArray = [];

$(window).bind("load", function () {

    $(function () {
        //Make drag class draggable

        //Category 1 stickiness
        $("#droppable1").droppable({
            accept: ".cat",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("pulseGreen");
                $(".aboutToDrop").remove();
                pulseDropZone();
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


    $(".drag").draggable({
        revert: function (event, ui) {

            ++misses;
            wordCheck();
            pulseMiss();
            $(this).appendTo("div#wordBank")
                .animate({
                    top: '0px',
                    left: '0px'
                }, 300, "linear", function () {
                });

        },
        cancel: "text",
        snap: "#droppable",
        snapMode: "inner",
        containment: "body",
        start: function () {

            $(this).addClass("aboutToDrop");
            if(!timeStart){
                startTimer();
                startClock();
                timeStart = true;
            }
        },
        stop: function () {

            $(this).removeClass("aboutToDrop");
        }
    });

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

function timeisUp() {
    //Code to be executed when timer expires.
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
