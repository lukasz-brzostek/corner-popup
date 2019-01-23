/*
 * Corner Popup v1.13 - 17/1/2019
 * Author: Łukasz Brzostek
 *
 * This work is licensed under the Creative Commons
 * Attribution 4.0 International License:
 * https://creativecommons.org/licenses/by/4.0
*/
$.fn.cornerpopup = function(userOptions) {
    var options = $.extend({
        active: 1,
        variant: 1,
        slide: 0,
        slidetop: 0,
        timeout: 0,
        closebtn: 1,
        shadow: 1,
        link1: "https://wp.pl",
        link2: "#",
        popupimg: "img/img-1.png",
        cookieimg: "img/cookie.png",
        messageimg: "img/icon-3.png",
        header: "Corner Popup",
        text1: 'This website uses cookies to ensure you get the best experience on our website. <a href="http://www.allaboutcookies.org" target="_blank" class="cookie-more">More information.</a>',
        text2: "This is just a sample text. Feel free to change it to your own using proper parameter.",
        button1: "more",
        button2: "Got it",
        button3: "OK",
        content: "Your own html here.",
        loadcontent: "no",
        width: "390px",
        font: "'Open Sans', 'Halvetica', sans-serif",
        colors: "#543189",
        bgcolor: "#fff",
        bordercolor: "#efefef",
        textcolor: "#181818",
        iconcolor: "#543189",
        btncolor: "#543189",
        btntextcolor: "#fff",
        corners: "0px",
        position: "right",
    }, userOptions);
    // Create and show popup with content:
    var popupvariant;
    $('<div/>', { id: 'corner-popup', class: 'popup-xs' }).appendTo('body');
    if (options.slide == 0) {
    $('#corner-popup').html(popupvariant).css("display", "flex").hide().fadeIn(800);
    } else if (options.slidetop == 1) {
    $('#corner-popup').addClass('slide-top');
    } else if (options.slide == 1 && options.position == "right") {
    $('#corner-popup').addClass('slide-left');
    } else if (options.slide == 1 && options.position == "left") {
    $('#corner-popup').addClass('slide-right');
    } else if (options.slide == 1 && options.position == "center") {
    $('#corner-popup').addClass('slide-top');
    }
    $('#corner-popup').html(popupvariant).css("display", "flex").show();
    $(".corner-close").click(function() {
        $("#corner-popup").fadeOut(400);
    });
    // Variant of popup and details:
    if (options.active == 0) {
        $('#corner-popup').remove();
    } else {
        if (options.variant == 1) {
            popupvariant = '<div class="hide-mobile col sm-6"><a href="' + options.link1 + '"><img src="' + options.popupimg + '"class="corner-img responsive"></a></div><div class="col xs-12 sm-6"><div class="corner-close"></div><div class="corner-container"><p class="corner-head">' + options.header + '</p><a href="' + options.link1 + '" class="corner-btn">' + options.button1 + '</a></div></div>';
        } else if (options.variant == 2) {
            if (readcookie('cp-cookies-accepted') != 'Yes') {
                popupvariant = '<div class="hide-mobile col sm-4"><img src="' + options.cookieimg + '"class="corner-img-cookie responsive"></div><div class="col xs-12 sm-8"><div class="corner-close close-change"></div><div class="corner-container"><p class="corner-text">' + options.text1 + '</p><a class="corner-btn-cookie">' + options.button2 + '</a></div></div>';
            } else {
                $('#corner-popup').remove();
            }
        } else if (options.variant == 3) {
            popupvariant = '<div class="hide-mobile col sm-4"><img src="' + options.messageimg + '"class="corner-img-cookie responsive"></div><div class="col xs-12 sm-8"><div class="corner-close close-change"></div><div class="corner-container"><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2 + '" class="corner-btn-close">' + options.button3 + '</a></div></div>';
        } else if (options.variant == 4) {
            popupvariant = '<div class="hide-mobile col sm-4"><img src="' + options.messageimg + '"class="corner-img-cookie responsive"></div><div class="col xs-12 sm-8"><div class="corner-close close-change"></div><div class="corner-container-1"><p class="corner-text">' + options.text2 + '</p></div></div>';
        } else if (options.variant == 5) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container-1"><p class="corner-text">' + options.text2 + '</p></div></div>';
        } else if (options.variant == 6) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container-2"><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2 + '" class="corner-btn-close">' + options.button3 + '</a></div></div>';
        } else if (options.variant == 7) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container-1"><p class="corner-head head-center">' + options.header + '</p></div></div>';
        } else if (options.variant == 8) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container-1"><p class="corner-head">' + options.header + '</p><p class="corner-text">' + options.text2 + '</p></div></div>';
        } else if (options.variant == 9) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container-2"><p class="corner-head">' + options.header + '</p><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2 + '" class="corner-btn-close">' + options.button3 + '</a></div></div>';
        } else if (options.variant == 10) {
            popupvariant = '<div class="col sm-12"><div class="corner-close close-change1"></div><div class="corner-container">' + options.content + '</div></div>';
        } else {
            popupvariant = '<div class="hide-mobile col sm-6"><a href="' + options.link1 + '"><img src="' + options.popupimg + '"class="corner-img responsive"></a></div><div class="col xs-12 sm-6"><div class="corner-close"></div><div class="corner-container"><p class="corner-head">' + options.header + '</p><a href="' + options.link1 + '" class="corner-btn">' + options.button1 + '</a></div></div>';
        }
        $('#corner-popup').html(popupvariant);
        if (options.loadcontent !== "no") { if (options.variant == 10) {
            $(".corner-container").load(options.loadcontent);
        }
        }
        if (options.closebtn !== 1) {
            $(".corner-close").remove();
            $("#corner-popup").css("right", "70px");
            $(".corner-container").css({
                "bottom": "15px",
                "padding-top": "30px"
            });
            $(".corner-container-1").css({
                "bottom": "0",
                "padding-bottom": "10px",
                "padding-top": "20px"
            });
            $(".corner-container-2").css({
                "bottom": "12px",
                "padding-top": "30px"
            });
        }
        if (options.shadow !== 1) {
            $("#corner-popup").css("box-shadow", "none");
        }
        if (options.width !== "390px") {
            $("#corner-popup").css("width", options.width);
        }
        if (options.font !== "'Open Sans', 'Halvetica', sans-serif") {
            $("#corner-popup").css("font-family", options.font);
        }
        if (options.colors !== "#543189") {
            $(".corner-btn, .corner-btn-cookie, .corner-btn-close").css("background-color", options.colors);
            $(".corner-head, .cookie-more").css("color", options.colors);
            $("#corner-popup").after('<style>#corner-popup .corner-close:after{background-color:' + options.colors + ';}\n#corner-popup .corner-close:before{background-color:' + options.colors + ';} </style>');
        }
        if (options.bgcolor !== "#fff") {
            $("#corner-popup").css("background-color", options.bgcolor);
        }
        if (options.bordercolor !== "#efefef") {
            $("#corner-popup").css("border-color", options.bordercolor);
        }
        if (options.textcolor !== "#181818") {
            $(".corner-text, .corner-head, .corner-container").css("color", options.textcolor);
        }
        if (options.iconcolor !== "#543189") {
            $("body").append("<style></style>");
            $("style").html('#corner-popup .corner-close:after{background-color:' + options.iconcolor + ';}\n#corner-popup .corner-close:before{background-color:' + options.iconcolor + ';');
        }
        if (options.btncolor !== "#543189") {
            $(".corner-btn, .corner-btn-close, .corner-btn-cookie").css("background-color", options.btncolor);
        }
        if (options.textcolor !== "#fff") {
            $(".corner-btn, .corner-btn-close, .corner-btn-cookie").css("color", options.btntextcolor);
        }
        if (options.corners !== "0px") {
            $("#corner-popup").css("border-radius", options.corners);
        }
        if (options.position !== "right") {
            if (options.position == "left") {
            $("#corner-popup").css({
                "right": "",
                "left": "60px"
            });
        } else {
            $("#corner-popup").css({
                "right": "0",
                "left": "0",
                "margin": "0 auto"
            });
        }
        } 
        if (options.timeout !== 0) {
            setTimeout(function() {
            if (options.slide == 0) {                
            $("#corner-popup").fadeOut(400);
            } else {
            slideundo();
            }
            }, options.timeout);
        }
        $(".corner-close, .corner-btn-close").click(function() {
        if (options.slide == 0) {
            $("#corner-popup").fadeOut(400);
    } else {
            slideundo();
    }
        });
        $(".corner-btn-cookie").click(function() {
            if (options.slide == 0) {
            $("#corner-popup").fadeOut(400);
                } else {
            slideundo();
        }
            createcookie('cp-cookies-accepted', 'Yes', 365);
        });
    }
// Function used to reverse slide on close:
function slideundo() {
    if (options.slidetop == 1) {
       $('#corner-popup').removeClass("slide-top").addClass("slide-top-rev");
    } else if (options.slide == 1 && options.position == "right") {
       $('#corner-popup').removeClass("slide-left").addClass("slide-left-rev");
    } else if (options.slide == 1 && options.position == "left") {
       $('#corner-popup').removeClass("slide-right").addClass("slide-right-rev");
    } else if (options.slide == 1 && options.position == "center") {
       $('#corner-popup').removeClass("slide-top").addClass("slide-top-rev");
    }
    cp = $("#corner-popup");
    cp.animation = 'none';
    cp.offsetHeight;
    cp.animation = null; 
}
};
// Cookies Create and read:
function createcookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readcookie(name) {
    var nameset = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameset) == 0) return c.substring(nameset.length, c.length);
    }
    return null;
}