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
        //textarea.value = attrs.textareaValue;
        loadBank(attrs);
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
        //refreshBtn();
        learnerState = false;

        //cat header color set
        $("li#catHead").css({
            "-webkit-box-shadow":"inset 0px 0px 0px 10px #c7c3be",
            "-moz-box-shadow":"inset 0px 0px 0px 10px #c7c3be",
            "box-shadow":"inset 0px 0px 0px 10px #c7c3be",
            "background-color":"white",
            "color":"#7c7975"
        })

        saveBank();
        $("div.catBox2").show();
        $(".dropZone,div#cardCounter").hide();
        $("div#addNew,span.killBtn,ul#catList").show();
        $("div.catBox1").animate({'margin-left': '30.5px'}, 300, "linear", function () {});
        //loadBank(attrs);
        //$("textarea").attr("onclick", "this.focus();this.select()");
        $("div#wordBank").children().hide();
        //$("#draggable, #draggable1, #draggable2, #draggable3, #draggable4, #draggable5").draggable("option", "cancel", "button");
    } else {
        //Learner State
        $("div#wordBank").children().show();
        $("div.dropZone,div#cardCounter").show();
        learnerState = true;
        //$(".catBtn,.catBtn2,.killBtn,#insertWordBtn").hide();


        //cathead reset
        $("li#catHead").css({
            "-webkit-box-shadow":"inset 0px 0px 0px 0px #c7c3be",
            "-moz-box-shadow":"inset 0px 0px 0px 0px #c7c3be",
            "box-shadow":"inset 0px 0px 0px 0px #c7c3be",
            "background-color":"#c7c3be",
            "color":"white"
        })

        $("div#addNew,span.killBtn,ul#catList").hide();
        saveBank();
        cat3curtain();
        createDeck();
        makeCards();
        wordCheck();
        $("div#wordBank").css("background", "#fefdf9");
        $("div#statsBank").css("background", "#f8f7f1");
        //$("#draggable, #draggable1, #draggable2, #draggable3, #draggable4, #draggable5").draggable("option", "cancel", "text");
    }
});

// send this command to receive initial events
player.startListening();

// continuously watch for changes in height
player.watchBodyHeight();

// save a textarea

// change textarea when attributes change

var newCat = "<li><span class='killBtn'>&#x2716;</span><input contenteditable='true' class='entry' placeholder='card'></input></li>";

$('body').on('click', 'div#addNew', function () {
    var randomNumber = Math.floor(Math.random() * 10000) + 1;

    $(this).parent().find("ul#catList").append(newCat);
    $(this).parent().find("li:last-child input").focus();

    $(this).parent().parent().parent().find(".catWords table:first-child td");
    //$(this).closest(".catWords2").prepend(newCat);
});

$('body').on('click', 'span.killBtn', function () {
    $(this).parent().remove();
});

$('li#catHead').keypress(function (e) {
    if (e.which == 13) {
        event.preventDefault();
    }
})

var preventDupes = false;

$('body').on('focus', 'div.catBox li:last-child', function () {
    var b = 0;

    $(this).keypress(function (e) {

        if (e.which == 13) {
            event.preventDefault();
            //alert($(this).parent().html());
            if (!preventDupes) {
                $("div.catBox ul").append(newCat);
                $("div.catBox li:last-child input").focus();
            }
            preventDupes = true;
            setTimeout(function () {
                preventDupes = false;
                // Do something after 5 seconds
            }, 200);

            // $("li:last-child").select();

        }

    })

});

$('body').on('focus', 'div.catBox1 li:last-child', function () {
    $(this).keypress(function (e) {

        if (e.which == 13) {
            event.preventDefault();
            //alert($(this).parent().find("ul").html());
            //alert($("div.catBox1 li:last-child"));//.append(newCat);

            if (!preventDupes) {
                $("div.catBox1 ul").append(newCat);
                $("div.catBox1 li:last-child input").focus();
            }
            preventDupes = true;
            setTimeout(function () {
                preventDupes = false;
                // Do something after 5 seconds
            }, 200);
            // $("li:last-child").select();
            var what = focus();
            //alert(what);
        }

    })

});

$('body').on('focus', 'div.catBox2 li:last-child', function () {
    $(this).keypress(function (e) {

        if (e.which == 13) {
            event.preventDefault();
            //alert($(this).parent().find("ul").html());
            //alert($("div.catBox1 li:last-child"));//.append(newCat);

            if (!preventDupes) {
                $("div.catBox2 ul").append(newCat);
                $("div.catBox2 li:last-child input").focus();
            }
            preventDupes = true;
            setTimeout(function () {
                preventDupes = false;
                // Do something after 5 seconds
            }, 200);
            // $("li:last-child").select();
            var what = focus();
            //alert(what);
        }

    })

});

$('body').on('click', 'div.killCard', function () {
    //$(this).parent().attr('value');
});

$('body').on('mouseover', 'span.killBtn,div.dropZone', function () {
    $(this).css({cursor: 'default'});

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
                    wordCheck();
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
                    wordCheck();
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
                    wordCheck();
                }, 300);
            }
        });
    });

});

var wordArray = [];
var wordArray1 = [];
var wordArray2 = [];
var misses = 0;

function createDeck() {
    wordArray = [];
    wordArray1 = [];
    wordArray2 = [];
    misses = 0;

    $("div.catBox input.entry").each(function () {
        var cellText = $(this).val();
        wordArray.push(cellText);
    });

    $("div.catBox1 input.entry").each(function () {
        var cellText = $(this).val();
        wordArray1.push(cellText);
    });

    $("div.catBox2 input.entry").each(function () {
        var cellText = $(this).val();
        wordArray2.push(cellText);
    });

    //alert(rip);
    //alert(wordArray.join('\n'));
    //alert(wordArray1.join('\n'));
}

function makeCards() {



    var wordBankWidth = $("div#wordBank").width();

    $("div#wordBank").children().remove();

    h = 0;
    p = 0;
    f = 0;

    $.each(wordArray, function (h) {
        $("div#wordBank")
            .append("<div class='catCard drag cat'>" + wordArray[h] + "</div>");
        wordBankWidth += 160;
        ++h;
    });
    $.each(wordArray1, function (p) {
        $("div#wordBank")
            .append("<div class='catCard drag cat1'>" + wordArray1[p] + "</div>");
        ++p;
        wordBankWidth += 160;
    });
    $.each(wordArray2, function (f) {
        $("div#wordBank")
            .append("<div class='catCard drag cat2'>" + wordArray2[f] + "</div>");
        ++f;
        wordBankWidth += 160;
    });

    wordBankWidth += "px";

    $("div#wordBank").css({
        "width": wordBankWidth,
        "background-color": "#fefdf9"
    });


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
function pulseDropZone() {
    $("div.pulseGreen").animate({'background-color': '#86f4b2'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
        })
    })

}
function pulseDropZone2() {
    $("div.pulseGreen2").animate({'background-color': '#86f4b2'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
        })
    })
}
function pulseDropZone3() {
    $("div.pulseGreen3").animate({'background-color': '#86f4b2'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
        })
    })
}

function pulseMiss() {
    $("div#wordBank").animate({'background-color': '#f08080'}, 300, "linear", function () {
        $(this).animate({'background-color': '#fefdf9'}, 300, "linear", function () {
        })
    })
}


function wordCheck() {

    var wordCount = 0;
    var x = 0;

    $('div.catCard').each(function () {
        ++x;
        ++wordCount;

    });

    //var scoreText = "Misses: " + misses + "&nbsp;&nbsp;&nbsp;&nbsp;  Words left: " + wordCount;
    $("span#cardCounter").html(wordCount);

    if (wordCount == 0) {
        $("div#wordBank").css("background", "#86f4b2")
        $("ul#catList").show();
        $("div.dropZone,div.killBtn").hide();
        $("div#cardCounter").hide();

        var diff =  new Date();
        endTime = Math.floor(diff/1000);
        totalTime = endTime - startTime;

        if(totalTime >= 999){
            totalTime=999;
        }

        displayResults();

    }
    else {
        $("div#statsBank").css("background", "#f8f7f1");
        $("div#cardCounter").show();
    }
}

var textArray = [];
var classArray = [];
var textArrayObjs = [];

//find and save textareas
function saveBank() {
    textArray = [];
    classArray = [];
    textArrayObjs = [];
    //empty array

    var i = 0;

    $('input').each(function () {
        var calass = $(this).parent().parent().parent().parent().attr('class');

        textArray.push(this.value);
        classArray.push(calass);


        var tempText = textArray[i];
        var tempClass = classArray[i];
        // alert(textareaValue);

        //alert(tempText);


        ++i;

    });

    var cat1head = $("div.catBox li#catHead").html();
    var cat2head = $("div.catBox1 li#catHead").html();
    var cat3head = $("div.catBox2 li#catHead").html();

    player.setAttributes({
        wordValues: textArray,
        wordClasses: classArray,
        cat1header: cat1head,
        cat2header: cat2head,
        cat3header: cat3head
    });

}

function loadBank(attrs) {
    i=0;

    $("div.catBox li#catHead").html(attrs.cat1header);
    $("div.catBox1 li#catHead").html(attrs.cat2header);
    $("div.catBox2 li#catHead").html(attrs.cat3header);

    //alert("and the winner is" + );
    $(".catBox ul#catList,.catBox1 ul#catList,.catBox2 ul#catList").children().remove();

    //alert(textArray.join("\n"));
    //alert(classArray[0]);
    var x = 0;

    $.each(attrs.wordValues, function () {
        //alert(attrs.wordClasses[x]);

        var loadedCat = "<li><span class='killBtn'>&#x2716;</span><input contenteditable='true' class='entry' value=" + this + "></input></li>";

        if (attrs.wordClasses[x] == "catBox") {
            $(".catBox ul#catList").append(loadedCat)
        }
        if (attrs.wordClasses[x] == "catBox1") {
            $(".catBox1 ul#catList").append(loadedCat)
        }
        if (attrs.wordClasses[x] == "catBox2") {
            $(".catBox2 ul#catList").append(loadedCat)
        }
        //alert( classArray[x]);
        var catDest = '\".' + classArray[x] + '\"';
        var loadValue = "loadValue is: " + textArray[x];

        $("ul#catList li").css("marginBottom","8px");

        //alert($(textArrayObjs[x]).html());
        ++x;
    })

}

function cat3curtain(){

    if( !$('.catBox2 ul#catList li').length )         // use this if you are using id to check
    {
        // it exists
        $("div.catBox2").hide();
        $("div.catBox1").animate({'margin-left': '260px'}, 300, "linear", function () {});
    }
    else{
        $("div.catBox2").show();
        $("div.catBox1").animate({'margin-left': '30.5px'}, 300, "linear", function () {});
    }
}

function displayResults(){

    $("div#wordBank")
        .append("<div class='correctHeader'>" + textArray.length +
            "</div><div id='correctSub'>correct</div>" +
            "<div class='incorrectHeader'>" + misses + "</div>" +
            "<div id='incorrectSub'>incorrect</div>");

    var poo = $('span#ms_timer').html();

    $("div#statsBank").children("span").hide();

    $("div#statsBank")
        .append("<span class='timeResult'>Time remaining: " + poo +
            "</span>");



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
