//global vars

var startTime = 0;
var timeLeft = 0;

var player = new VersalPlayerAPI();

player.setPropertySheetAttributes({
    
    resetAllowed: { type: 'Checkboxes', 
		options : ['Reset Allowed'] 
	},
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

   //$(this).children("input").focus();
    $(this).prev( '.card').find("input").focus();

    //var cardAmount = $(".card").size();


    //reinitialize dragging on dynamic cards
    makeItDrag();
});

//on card unfocus change back to transparent card
$('body').on('blur', '.card,.newCard', function () {
    var tempAss = $(this).find("input").val();
    if(tempAss == "") {
        $(this).css({
            'background-color':'#f2f1ed',
            'border': '1px dotted #c7c3be'
        })
        $(this).find("input").css({
            'background-color':'#f2f1ed'
        })
    }


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
            accept: ".card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {

                if(!$(ui.draggable).hasClass("ojDot")){
                    $(ui.draggable).addClass("ojDot");
                    $(ui.draggable).find(".catDotContainer").append(ojDotPremade);

                }

                $(ui.draggable).appendTo(".cardReel").css({
                    "position":"relative",
                    "float":"left",
                    "top":"0px",
                    "left":"0px",
                    "height":"94px",
                    "width":"94px",
                    "margin-left":"12px",
                    "z-index":"1",
                    "background-color":"#ffffff",
                    "border": "1px solid #c7c3be"
                });
                $(ui.draggable).find("input").css({
                    "background-color":"#ffffff"
                })
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });

        //Category 2 stickiness
        $("#category2").droppable({
            accept: ".card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {

                if(!$(ui.draggable).hasClass("tealDot")){
                    $(ui.draggable).addClass("tealDot");
                    $(ui.draggable).find(".catDotContainer").append(tealDotPremade);

                }

                $(ui.draggable).appendTo(".cardReel").css({
                    "position":"relative",
                    "float":"left",
                    "top":"0px",
                    "left":"0px",
                    "height":"94px",
                    "width":"94px",
                    "margin-left":"12px",
                    "z-index":"1",
                    "background-color":"#ffffff",
                    "border": "1px solid #c7c3be"
                });
                $(ui.draggable).find("input").css({
                    "background-color":"#ffffff"
                })
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });
        
        //Category 3 stickiness
        $("#category3").droppable({
            accept: ".card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {

                if(!$(ui.draggable).hasClass("blueDot")){
                    $(ui.draggable).addClass("blueDot");
                    $(ui.draggable).find(".catDotContainer").append(blueDotPremade);

                }

                $(ui.draggable).appendTo(".cardReel").css({
                    "position":"relative",
                    "float":"left",
                    "top":"0px",
                    "left":"0px",
                    "height":"94px",
                    "width":"94px",
                    "margin-left":"12px",
                    "z-index":"1",
                    "background-color":"#ffffff",
                    "border": "1px solid #c7c3be"
                });
                $(ui.draggable).find("input").css({
                    "background-color":"#ffffff"
                });
                setTimeout(function () {
                    // Do something after 5 seconds

                }, 300);
            }
        });
        
        //Category 4 stickiness
        $("#category4").droppable({
            accept: ".card",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {

                if(!$(ui.draggable).hasClass("redDot")){
                    $(ui.draggable).addClass("redDot");
                    $(ui.draggable).find(".catDotContainer").append(redDotPremade);

                }

                $(ui.draggable).appendTo(".cardReel").css({
                    "position":"relative",
                    "float":"left",
                    "top":"0px",
                    "left":"0px",
                    "height":"94px",
                    "width":"94px",
                    "margin-left":"12px",
                    "z-index":"1",
                    "background-color":"#ffffff",
                    "border": "1px solid #c7c3be"
                });
                $(ui.draggable).find("input").css({
                    "background-color":"#ffffff"
                });
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

