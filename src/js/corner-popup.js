/*
 * Corner Popup v1.21 - 23/12/2020
 * Author: Łukasz Brzostek
 *
 * This work is licensed under the Creative Commons
 * Attribution 4.0 International License:
 * https://creativecommons.org/licenses/by/4.0
*/

if ("undefined" == typeof jQuery)
    throw new Error("Corner Popup requires jQuery");

(function($){
$.fn.cornerpopup = function(options) {

// Default plugin options
// ----------------------

var options = $.extend({
    active: 1,
    variant: 1,
    slide: 0,
    slideTop: 0,
    timeOut: 0,
    delay: 0,
    closeBtn: 1,
    shadow: 1,
    link1: "https://wp.pl, _self",
    link2: "#, _self",
    popupImg: "img/img-1.png",
    cookieImg: "img/cookie.png",
    messageImg: "img/icon-3.png",
    header: "Corner Popup",
    text1: 'This website uses cookies to ensure you get the best experience on our website. <a href="http://www.allaboutcookies.org" target="_blank" class="cookie-more">More information.</a>',
    text2: "This is just a sample text. Feel free to change it to your own using proper parameter.",
    button1: "more",
    button2: "Got it",
    button3: "OK",
    content: "Your own html here.",
    loadContent: "no",
    width: "390px",
    font: "'Open Sans', 'Halvetica', sans-serif",
    colors: "#543189",
    bgColor: "#fff",
    borderColor: "#efefef",
    textColor: "#181818",
    iconColor: "#543189",
    btnColor: "#543189",
    btnTextColor: "#fff",
    corners: "0px",
    padding: 0,
    position: "right",
    escClose: 0,
    stickToBottom: 0,
    topCorner: 0,
    beforePopup : function(){},
    afterPopup : function(){},
    onBtnClick : function(){},
}, options);

    cp = "#corner-popup";

// Create/read cookie
// ------------------

function createCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameset = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameset) == 0) return c.substring(nameset.length, c.length);
    }
    return null;
}

// Check for slide option, set slide orientation, insert content and show popup
// ----------------------------------------------------------------------------

function popupShow() {
    options.beforePopup.call(this);
    if (options.slide == 0) {
        $(cp).html(popupContent).css("display", "flex").hide().fadeIn(800);
        if (options.delay != 0) {
        $(cp).hide();
        setTimeout(function() {
        $(cp).fadeIn(800);
        }, options.delay);
    }
    } else if (options.slideTop == 1) {
        if (options.topCorner == 0) {
        $(cp).addClass('slide-top');
        } else {
        $(cp).addClass('slide-bottom');    
        }
    } else if (options.slide == 1 && options.position == "right") {
        $(cp).addClass('slide-left');
    } else if (options.slide == 1 && options.position == "left") {
        $(cp).addClass('slide-right');
    } else if (options.slide == 1 && options.position == "center") {
        if (options.topCorner == 0) {
        $(cp).addClass('slide-top');
        } else {
        $(cp).addClass('slide-bottom');    
        }
    }
    $(cp).html(popupContent).css("display", "flex").show();
        if (options.delay != 0) {
        $(cp).hide();
        setTimeout(function() {
        $(cp).show();
    }, options.delay);
    }
}

// Check slide option, remove popup
// --------------------------------

function popupClose() {
    if (options.slide == 0) {
        $(cp).fadeOut(400, function() {
        $(this).remove();
        options.afterPopup.call(this);
    });
    } else {
        slideUndo();
    }
}

// Check slide orientation, reverse slide, remove popup after animation
// --------------------------------------------------------------------

function slideUndo() {
    if (options.slideTop == 1) {
       if (options.topCorner == 0) {
       $(cp).removeClass("slide-top").addClass("slide-top-rev");
        } else {
       $(cp).removeClass("slide-bottom").addClass("slide-bottom-rev");
        }
    } else if (options.slide == 1 && options.position == "right") {
       $(cp).removeClass("slide-left").addClass("slide-left-rev");
    } else if (options.slide == 1 && options.position == "left") {
       $(cp).removeClass("slide-right").addClass("slide-right-rev");
    } else if (options.slide == 1 && options.position == "center") {
       if (options.topCorner == 0) {
       $(cp).removeClass("slide-top").addClass("slide-top-rev");
        } else {
       $(cp).removeClass("slide-bottom").addClass("slide-bottom-rev");
        }
    }
    cpTemp = $(cp);
    cpTemp.animation = 'none';
    cpTemp.offsetHeight;
    cpTemp.animation = null;
    cpTemp.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    cpTemp.remove();
    options.afterPopup.call(this);
    });
}

// Close popup after specified time
// --------------------------------

function timeOut(time) {
    setTimeout(function() {
    if (options.slide == 0) {                
    $(cp).fadeOut(400, function() {
    $(this).remove();
    options.afterPopup.call(this);
    });
    } else {
    slideUndo();
    }
    }, time);
}

// Check if plugin is already used and remove previous occurrences
// ---------------------------------------------------------------

    if ($(cp).length) {
    $(cp).remove();
    console.info("Corner Popup already initialized");
    }

// Add popup div into DOM if it is active
// --------------------------------------
    
    if (options.active != 0) {
    $('<div/>', { id: 'corner-popup', class: 'popup-xs' }).appendTo('body');

// Check popup width and setup columns for px and %
// ------------------------------------------------

    if (options.width.substr(-1) == "%") { 
        widthPercent = true;
        noPercents = options.width.slice(0, -1);
    } else {
        widthPercent = false;
        if (options.width.match(/^\d+$/)) {
        noUnit = options.width;
        } else {
        noUnit = options.width.replace(/\D/g,'');
        }
    }

    if (noUnit > 700 || widthPercent == true && noPercents > 50) {
        columnOne = 'p-sm-2';
        columnTwo = 'p-sm-10';
    } else if (noUnit > 450 || widthPercent == true && noPercents > 25) {
        columnOne = 'p-sm-3';
        columnTwo = 'p-sm-9';
    } else {
     if (options.variant == 1){
        columnOne = 'p-sm-6';
        columnTwo = 'p-sm-6';   
     } else {
        columnOne = 'p-sm-4';
        columnTwo = 'p-sm-8';
    }
    }

// Split link variable into array and check target value
// -----------------------------------------------------

    options.link1 = options.link1.replace(/\s/g, "").split(',');
    options.link2 = options.link2.replace(/\s/g, "").split(',');
    if (!options.link1[1]) options.link1[1] = "_self";
    if (!options.link2[1]) options.link2[1] = "_self";

// Check variant and insert proper content into variable
// -----------------------------------------------------

    if (options.variant == 2) {
        if (readCookie('cp-cookies-accepted') != 'Yes') {
            popupContent = '<div class="hide-mobile p-col ' + columnOne + '""><img src="' + options.cookieImg + '"class="corner-img-cookie responsive"></div><div class="p-col p-xs-12 ' + columnTwo + '"><div class="corner-close"></div><div class="corner-container"><p class="corner-text">' + options.text1 + '</p><a class="corner-btn-cookie">' + options.button2 + '</a></div></div>';
        } else {
            $(cp).remove();
        }
    } else if (options.variant == 3) {
        popupContent = '<div class="hide-mobile p-col ' + columnOne + '"><img src="' + options.messageImg + '"class="corner-img-cookie responsive"></div><div class="p-col p-xs-12 ' + columnTwo + '"><div class="corner-close"></div><div class="corner-container"><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2[0] + '" class="corner-btn-close" target="' + options.link2[1] + '">' + options.button3 + '</a></div></div>';
    } else if (options.variant == 4) {
        popupContent = '<div class="hide-mobile p-col ' + columnOne + '"><img src="' + options.messageImg + '"class="corner-img-cookie responsive"></div><div class="p-col p-xs-12 ' + columnTwo + '"><div class="corner-close"></div><div class="corner-container-3"><p class="corner-text">' + options.text2 + '</p></div></div>';
    } else if (options.variant == 5) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-1"><p class="corner-text">' + options.text2 + '</p></div></div>';
    } else if (options.variant == 6) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-2"><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2[0] + '" class="corner-btn-close" target="' + options.link2[1] + '">' + options.button3 + '</a></div></div>';
    } else if (options.variant == 7) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-1"><p class="corner-head head-center">' + options.header + '</p></div></div>';
    } else if (options.variant == 8) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-1"><p class="corner-head">' + options.header + '</p><p class="corner-text">' + options.text2 + '</p></div></div>';
    } else if (options.variant == 9) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-2"><p class="corner-head">' + options.header + '</p><p class="corner-text">' + options.text2 + '</p><a href="' + options.link2[0] + '" class="corner-btn-close" target="' + options.link2[1] + '">' + options.button3 + '</a></div></div>';
    } else if (options.variant == 10) {
        popupContent = '<div class="p-col p-xs-12 p-sm-12"><div class="corner-close"></div><div class="corner-container-2">' + options.content + '</div></div>';
    } else {
        popupContent = '<div class="hide-mobile p-col ' + columnOne + '"><a href="' + options.link1[0] + '"><img src="' + options.popupImg + '"class="corner-img responsive"></a></div><div class="p-col p-xs-12 ' + columnTwo + '"><div class="corner-close"></div><div class="corner-container"><p class="corner-head">' + options.header + '</p><a href="' + options.link1[0] + '" class="corner-btn" target="' + options.link1[1] + '">' + options.button1 + '</a></div></div>';
    }

// Popup show 
// ----------

    popupShow();

// Load personal html content
// --------------------------

    if (options.variant == 10 && options.loadContent !== "no") 
    $(".corner-container-2").load(options.loadContent);

// Top corner option check
// -----------------------

    if (options.topCorner != 0) {
        $(cp).addClass('corner-top');
        verticalPosition = 'top';
    } else {
       $(cp).removeClass('corner-top'); 
        verticalPosition = 'bottom';
    }

// Close button visibility
// -----------------------

    if (options.closeBtn !== 1) {
        $(".corner-close").remove();
        if ($(window).width() > 768) {
        $(cp).css("right", "70px");
        }
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

// Shadow visibility
// -----------------

    if (options.shadow !== 1)
        $(cp).css("box-shadow", "none");

// Popup width
// -----------

    if (options.width !== "390px") 
        $(cp).css("width", options.width);

    window.onresize = function(event) {
      if ($(window).width() < 768) {
      $(cp).css("width", '100%');   
      } else {
      $(cp).css("width", options.width);    
      }
    };

// Popup font
// ----------

    if (options.font !== "'Open Sans', 'Halvetica', sans-serif")
        $(cp).css("font-family", options.font);

// Popup colors
// ------------

    if (options.colors !== "#543189") {
        $(".corner-btn, .corner-btn-cookie, .corner-btn-close").css("background-color", options.colors);
        $(".corner-head, .cookie-more").css("color", options.colors);
        $(cp).after('<style>#corner-popup .corner-close:after{background-color:' + options.colors + ';}\n#corner-popup .corner-close:before{background-color:' + options.colors + ';} </style>');
    }

// Popup background color
// ----------------------

    if (options.bgColor !== "#fff")
        $(cp).css("background-color", options.bgColor);

// Popup border color
// ------------------

    if (options.borderColor !== "#efefef")
        $(cp).css("border-color", options.borderColor);

// Popup text color
// ----------------

    if (options.textColor !== "#181818")
        $(".corner-text, .corner-head, .corner-container").css("color", options.textColor);

// Popup icon colors
// -----------------

    if (options.iconColor !== "#543189") {
        $("body").append("<style></style>");
        $("style").html('#corner-popup .corner-close:after{background-color:' + options.iconColor + ';}\n#corner-popup .corner-close:before{background-color:' + options.iconColor + ';');
    }

// Popup button color
// ------------------

    if (options.btnColor !== "#543189")
        $(".corner-btn, .corner-btn-close, .corner-btn-cookie").css("background-color", options.btnColor);

// Popup button text color
// -----------------------

    if (options.btnTextColor !== "#fff")
        $(".corner-btn, .corner-btn-close, .corner-btn-cookie").css("color", options.btnTextColor);

// Popup corner radius
// -------------------

    if (options.corners !== "0px")
        $(cp).css("border-radius", options.corners);

// Popup padding
// -------------

    if (options.padding !== 0) {
        if (options.variant >= 5) {
        $('.corner-container, .corner-container-1, .corner-container-2, .corner-container-3').css({"padding": options.padding});
        } else 
        $('.corner-container, .corner-container-1, .corner-container-2, .corner-container-3').css({"padding": options.padding, "padding-left": "0px"});
        $('.p-col').first().css("padding-left", options.padding);
    }

// Popup position
// --------------

    if (options.position !== "right") {
        if (options.position == "left" && $(window).width() > 768) {
        $(cp).css({
            "right": "0",
            "left": "60px"
        });
    } else {
        $(cp).css({
            "right": "0",
            "left": "0",
            "margin": "0 auto"
        });
    }
    }

// Stick to bottom option
// ----------------------

    if (options.stickToBottom !== 0 && $(window).width() > 768) {
        $(cp).css(
            verticalPosition, "0"
        );
    if (options.position == "right") {
        $(cp).css({
            "right": "0"
        });
    } else if (options.position == "left") {
        $(cp).css({
            "left": "0"
        });
    }
    }

// Popup timeout
// -------------    

    if (options.timeOut !== 0)
        timeOut(options.timeOut);

// Popup close
// ----------- 

    $(".corner-close").click(function() {
        popupClose();       
    });

// Button click
// ------------

    $('.corner-btn, .corner-btn-close, .corner-btn-cookie').click(function(e) {
        elementClassName = $(this).attr("class");
        if (options.onBtnClick.toString().length > 13) {
        e.preventDefault();
        options.onBtnClick.call(this);
        } else {
          if (elementClassName == 'corner-btn-cookie') {
          popupClose();
          createCookie('cp-cookies-accepted', 'Yes', 365);
          } else if (elementClassName == 'corner-btn-close' && options.link2[0] == "#") {
          popupClose();
          }
        }
    });  

// Close on ESC key press
// ----------------------

    $(document).keyup(function(e) {
        if (options.escClose != 0 && (e.key === "Escape" || e.keyCode == 27))
        popupClose();
    });

// Public functions
// ----------------

    $.fn.cornerpopup.popupClose = function(timing) {
        setTimeout(popupClose, timing);
    }

    $.fn.cornerpopup.popupHide = function(timing) {
        $(cp).delay(timing).fadeOut(400);
    }

    $.fn.cornerpopup.popupShow = function(timing) {
        $(cp).delay(timing).fadeIn(800);
    }

}
};
})(jQuery);