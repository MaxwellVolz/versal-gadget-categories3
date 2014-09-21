//global vars
var textArray = [];
var textArrayObjs = [];
var learnerState = true;
var wordCount = 0;

var player = new VersalPlayerAPI();

player.on('attributesChanged', function (attrs) {
    console.log('attributesChanged', attrs);


});

player.on('editableChanged', function (editableObj) {
    if (editableObj.editable) {
        //Author State
        //refreshBtn();
        learnerState = false;
        saveBank();
        $("input.entry").css("width","160px")
        $(".dropZone,div#cardCounter").hide();
        $("div#addNew,span.killBtn,ul#catList").show();
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
        $("div#addNew,span.killBtn,ul#catList").hide();

        createDeck();
        makeCards();
        wordCheck();
        $("div#statsBank,div#wordBank").css("background","lightgrey");

        //$("#draggable, #draggable1, #draggable2, #draggable3, #draggable4, #draggable5").draggable("option", "cancel", "text");
    }
});

// send this command to receive initial events
player.startListening();

// continuously watch for changes in height
player.watchBodyHeight();

// save a textarea


// change textarea when attributes change
player.on('attributesChanged', function (attrs) {


    if (attrs) {
        //textarea.value = attrs.textareaValue;
        loadBank(attrs);
        //textArrayObj[2].value = attrs.word2x
        //textarea.value = textArray[0];

    }
});
var newCat = "<li><span class='killBtn'>&#x2716;</span><input contenteditable='true' class='entry' placeholder='Enter Word'></input></li>";


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
                if(!preventDupes) {
                    $("div.catBox ul").append(newCat);
                    $("div.catBox li:last-child input").focus();
                }
                preventDupes = true;
                setTimeout(function() {
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

            if(!preventDupes) {
                $("div.catBox1 ul").append(newCat);
                $("div.catBox1 li:last-child input").focus();
            }
            preventDupes = true;
            setTimeout(function() {
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

            if(!preventDupes) {
                $("div.catBox2 ul").append(newCat);
                $("div.catBox2 li:last-child input").focus();
            }
            preventDupes = true;
            setTimeout(function() {
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
                checkWin();
            }
        });

        //Category 2 stickiness
        $("#droppable2").droppable({
            accept: ".cat1",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("pulseGreen2");
                $(".aboutToDrop").animate({opacity: 0.0}, 200, "linear", function () {
                    $(this).remove();
                })
                pulseDropZone2();
                setTimeout(function () {
                    // Do something after 5 seconds
                    wordCheck();
                }, 300);
                checkWin();
            }
        });
        //Category 3 stickiness
        $("#droppable3").droppable({
            accept: ".cat2",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("pulseGreen3");
                $(".aboutToDrop").animate({opacity: 0.0}, 200, "linear", function () {
                    $(this).remove();
                })
                pulseDropZone3();
                setTimeout(function () {
                    // Do something after 5 seconds
                    wordCheck();
                }, 300);
                checkWin();
            }
        });
    });
});
var wordArray = [];
var wordArray1 = [];
var wordArray2 = [];

function createDeck() {
    wordArray = [];
    wordArray1 = [];
    wordArray2 = [];

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

    e = 0;
    p = 0;
    f = 0;

    $.each(wordArray, function (e) {
        $("div#wordBank")
            .append("<div class='catCard drag cat'>" + wordArray[e] + "</div>");
        wordBankWidth += 160;
        ++e;
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
    $("div#wordBank").css("width", wordBankWidth);


    $(".drag").draggable({
        revert: function (event, ui) {
            $(this).appendTo("div#wordBank")
                .animate({
                    top: '0px',
                    left: '0px'
                }, 300, "linear", function () {})
        },
        cancel: "text",
        snap: "#droppable",
        snapMode: "inner",
        containment: "body",
        start: function () {
            $("div.dropZone").css('background-color', 'whitesmoke');
            $(this).addClass("aboutToDrop");
        },
        stop: function () {
            $("div.dropZone").css('background-color', 'white');
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
    $("div.pulseGreen").animate({'background-color': '#90EE90'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
        })
    })

}
function pulseDropZone2() {
    $("div.pulseGreen2").animate({'background-color': '#90EE90'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
        })
    })
}
function pulseDropZone3() {
    $("div.pulseGreen3").animate({'background-color': '#90EE90'}, 300, "linear", function () {
        $(this).animate({'background-color': 'white'}, 300, "linear", function () {
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

    var scoreText = "Words left: " + wordCount;
    $("div#cardCounter").html(scoreText);

    if(wordCount==0){
        $("div#statsBank,div#wordBank").css("background","#90EE90")
        $("ul#catList").show();
        $("input.entry").css("width","99%")
        $("div.dropZone").hide();

    }
    else{
        $("div#statsBank").css("background","lightgrey")
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

    player.setAttributes({
        wordValues: textArray,
        wordClasses: classArray
    });



}

function loadBank(attrs) {
    i=0;


    //alert("and the winner is" + );
    $(".catBox ul#catList,.catBox1 ul#catList,.catBox2 ul#catList").children().remove();

    //alert(textArray.join("\n"));
    //alert(classArray[0]);
    var x = 0;

    $.each(attrs.wordValues,function(){
        //alert(attrs.wordClasses[x]);

        var loadedCat = "<li><span class='killBtn'>&#x2716;</span><input contenteditable='true' class='entry' value="+ this +"></input></li>";

        if(attrs.wordClasses[x] == "catBox")
        {
            $(".catBox ul#catList").append(loadedCat)
        }
        if(attrs.wordClasses[x] == "catBox1")
        {
            $(".catBox1 ul#catList").append(loadedCat)
        }
        if(attrs.wordClasses[x] == "catBox2")
        {
            $(".catBox2 ul#catList").append(loadedCat)
        }
        //alert( classArray[x]);
        var catDest = '\".' + classArray[x] + '\"';
        var loadValue = "loadValue is: " + textArray[x];

       //alert($(textArrayObjs[x]).html());
        ++x;

    })
    //alert(textArrayObjs[1].value);

    //var newCat = "<li><span class='killBtn'>&#x2716;</span><input contenteditable='true' class='entry' placeholder='Enter Word'></input></li>";

/*
    $('body').on('click', 'div#addNew', function () {
        var randomNumber = Math.floor(Math.random() * 10000) + 1;

        $(this).parent().find("ul#catList").append(newCat);
*/
}

function checkWin() {
    var x = 0;
    $('.ui-state-highlight').each(function () {
        ++x;
        if (x >= 6) {
            //catHeader depreciated
            //$("#catHeader>textarea").val("Great Job!");
        }

    });
    x = 0;
}




