$(document).ready(function () {
    /* Calling functions on load & setting some global variables */

    /* Set Global Variables */
    // Retrieves height of viewport
    globalViewportHeight = getViewportHeight();
    // Retrieves full height of page, including what's not visible
    globalPageHeight = getPageHeight();
    // Tracks the current pattern under the ligature
    pattern = 1;
    // Retrieves screen width (there's no horizontal scrolling so this is both viewport and window width)
    screenWidth = screen.width;

    /* Calling functions */
    //     Checks URL for sort instructions, acts accordingly
    sortPortfolio();
    //     Start parallax for hero headers
    heroParallax();
    //     Start parallax on images (on the homepage)
    parallax();

    /* Read More Functionality */
    // Expands or collapses panels with this switch in them
    // When the user clicks on an expand/collapse toggle
    $('.read-more').click(function toggleView() {
        var button = $(this);
        var container = $(this).parents('.container');

        //jQuery default slideToggle effect
        container.find('.expandable').slideToggle("fast");

        //If it's already checked
        if (button.attr('aria-checked') === 'true') {
            //Uncheck it, update the icon, expand text
            button.attr('aria-checked', 'false');
            button.html("View More ▼");
            container.find('.expandable').addClass('collapsed');
        } else {
            //If it is not checked, check it, update the icon, collapse text
            button.attr('aria-checked', 'true');
            button.html("View Less ▲");
            container.find('.expandable').removeClass('collapsed');
        }
    });

    /* Accessibility Concern - Enter/Space input in place of clicking */
    $('.read-more').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            $(this).click();
        }
    });

    //Gallery widget functionality
    $('.gallery-right').click(function () {
        var button = $(this);
        var gallery = button.parents('.gallery');
        var galleryNum = parseInt(gallery.attr('data-img-num'));
        var currentImg = gallery.find('.gallery-img');
        var imgNum = parseInt(currentImg.attr('data-current-img'));
        if (gallery.hasClass('gallery-anim')) {
            currentImg.animate({ 'opacity': '0' }, 100);
            if (imgNum === galleryNum) {
                imgNum = 1;
            } else {
                imgNum++;
            }
            currentImg
                .delay(100)
                .queue(function (next) { $(this).attr('data-current-img', imgNum); next(); })
                .animate({ 'opacity': '1' }, 400);
        } else {
            if (imgNum === galleryNum) {
                imgNum = 1;
            } else {
                imgNum++;
            }
            currentImg.attr('data-current-img', imgNum);
        }
    });

    $('.gallery-left').click(function () {
        var button = $(this);
        var gallery = button.parents('.gallery');
        var galleryNum = parseInt(gallery.attr('data-img-num'));
        var currentImg = gallery.find('.gallery-img');
        var imgNum = parseInt(currentImg.attr('data-current-img'));
        if (gallery.hasClass('gallery-anim')) {
            currentImg.animate({ 'opacity': '0' }, 100);
            if (imgNum === 1) {
                imgNum = galleryNum;
            } else {
                imgNum--;
            }
            currentImg
                .delay(100)
                .queue(function (next) { $(this).attr('data-current-img', imgNum); next(); })
                .animate({ 'opacity': '1' }, 400);
        } else {
            if (imgNum === 1) {
                imgNum = galleryNum;
            } else {
                imgNum--;
            }
            currentImg.attr('data-current-img', imgNum);
        }
    });

    $('.gallery-right').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            $(this).click();
        }
    });

    $('.gallery-left').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            $(this).click();
        }
    });

    /* Ligature Hover Function */
    $('header .sp-icon').mouseleave(function () {
        // Resets the pattern if the maximum is reached
        if (pattern < 3) {
            pattern++;
        } else {
            pattern = 1;
        }
        // Change the pattern url based on the outcome of the previous variable manipulation
        switch (pattern) {
            case 1:
                $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
                break;
            case 2:
                $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 2.gif');
                break;
            case 3:
                $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 3.gif');
                break;
            default:
                $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
        }
    });

    /* Ligature Hover Function (Footer Version) */
    $('footer .sp-icon').mouseleave(function () {
        // Resets the pattern if the maximum is reached (it's 2 here because the third pattern doesn't read well against a dark background)
        if (pattern < 2) {
            pattern++;
        } else {
            pattern = 1;
        }
        // Change the pattern url based on the outcome of the previous variable manipulation
        switch (pattern) {
            case 1:
                $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
                break;
            case 2:
                $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 2.gif');
                break;
            default:
                $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
        }
    });

    /* Ligature Click Function */
    $(".mark").click(function () {
        //If on the homepage
        //if (location.pathname == "/" || location.pathname == "/index.html") { // Change to this version on the real site.
        if (location.pathname == "/stage.susanpallmanndesign.com/" || location.pathname == "/stage.susanpallmanndesign.com/index.html") { // Change to this version on the stage site.
            // Retrieve current sorting instructions from URL
            var sort = getParameterByName('sort');
            // If there aren't any sort instructions
            if (!sort) {
                // Scroll to top of page rather than refreshing
                $("html,body").animate({
                    scrollTop: $("body").offset().top - $("header").height()
                }, "slow");
                // If there are filters in place
            } else {
                // Navigate to the homepage without filters
                window.location.assign("https://susanpallmann.github.io/stage.susanpallmanndesign.com/");
            }
            // If not on the homepage
        } else {
            // Navigate to the homepage
            window.location.assign("https://susanpallmann.github.io/stage.susanpallmanndesign.com/");
        }
    });
});

/* Hamburger Menu Animation */
$("#top_hamburger").click(function () {
    // If the animation is complete
    if ($(this).hasClass("animcomplete")) {
        // Set to incomplete
        $(this).removeClass("animcomplete");
        // Mark closed
        $(this).addClass("closed");
        // Toggle dropdown
        $("#dropdown").slideToggle("fast");
        $('#dropdown').find('.expandable').addClass('collapsed');
        // Set delay (for CSS animation)
        setTimeout(function () {
            // Remove closed
            $("#top_hamburger").removeClass("closed");
        }, 400);
    } else {
        // Mark open
        $(this).addClass("open");
        // Toggle dropdown
        $('#dropdown').find('.expandable').removeClass('collapsed');
        $("#dropdown").slideToggle("fast");
        // Set delay (for CSS animation)
        setTimeout(function () {
            // Remove open
            $("#top_hamburger").removeClass("open");
            // Mark complete
            $("#top_hamburger").addClass("animcomplete");
        }, 400);
    }
});

/* Checks URL for search parameters */
function getParameterByName(name, url) {
    // Gets current URL
    if (!url) url = window.location.href;
    // Some regular expression manipulation to get to the parameter we're looking for
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    // Failsafes
    if (!results) return null;
    if (!results[2]) return '';
    // Returns the parameter information
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* Sorts Portfolio */
function sortPortfolio() {
    // Retrieves sort parameter
    var sort = getParameterByName('sort');
    // If there isn't a sort instruction
    if (!sort) {
        // Assumes to view all
        $('.tag').removeClass('selected');
        $('.tag-all').addClass('selected');
        return null;
        // If there is a sort instruction
    } else {
        // Hide all projects
        $('.project .column').parents('.project').removeClass('visible').css('display', 'none');
        // Show projects with the correct tag (marked as a class)
        $('.' + sort).parents('.project').addClass('visible').css('display', 'inline-block');
        // Unselect any of the tag options on the homepage
        $('.tag').removeClass('selected');
        // Select the correct tag option
        $('.tag-' + sort).addClass('selected');
    }
}

/* Returns the position user is scrolled to when called. Ensure this function is called when user has finished scrolling. */
function getScrollPosition() {
    var scrollPosition = $(window).scrollTop();
    return scrollPosition;
}

/* Returns the full height of the page, even past the viewport. Useful for determining percentage scrolled. */
function getPageHeight() {
    var pageHeight = $(document).height();
    globalPageHeight = pageHeight;
    return pageHeight;
}

/* Returns the viewport height. Useful for determining if something is visible or not as the user scrolls. */
function getViewportHeight() {
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    globalViewportHeight = viewportHeight;
    return viewportHeight;
}

/* Parallax effect on heros (project pages) */
function heroParallax() {
    if ($('#hero').length) {
        if ($('#hero').hasClass('gradient')) {
            $("#hero").mousemove(function (event) {
                var w = $(this).width(),
                    pct = 360 * (+event.pageX) / w,
                    bg = "linear-gradient(" + pct + "deg,#FF6666,#DCA1C4)";
                $("#hero").css('background-image', bg);
            });
        } else {
            var hero = $('#hero');
            var heroOffset = hero.offset();
            var heroTop = heroOffset.top;
            var heroHeight = hero.height();
            var heroBottom = heroTop + heroHeight;
            var imageModifier = 200;
            var headlineModifier = 50;
            var scrollPosition = getScrollPosition();
            var bottomScrollPosition = scrollPosition + globalViewportHeight;
            var bottomOffset = bottomScrollPosition - heroBottom;
            if (bottomOffset < 0) {
                bottomOffset = 0;
            }
            $(window).scroll(function () {
                var scrollPosition = getScrollPosition();
                var bottomScrollPosition = scrollPosition + globalViewportHeight;
                if (heroBottom > scrollPosition) {
                    if (heroBottom < bottomScrollPosition) {
                        var percentScrolled = 1 - (((heroBottom + bottomOffset) - scrollPosition) / globalViewportHeight);
                        $('img.parallax').css('transform', 'translateY(-' + imageModifier * percentScrolled + 'px)');
                        $('#dramatic-headline').css('transform', 'translateY(' + headlineModifier * percentScrolled + 'px)');
                    }
                }
            });
        }
    }
}

/* Parallax effect on images (homepage) */
function parallax() {
    $('.imgParallax').each(function (index) {
        var image = $(this);
        var imageOffset = image.offset();
        var imageTop = imageOffset.top;
        var imageHeight = image.height();
        var imageBottom = imageTop + imageHeight;
        var parallaxModifier = 20;
        var scrollPosition = getScrollPosition();
        var bottomScrollPosition = scrollPosition + globalViewportHeight;
        var bottomOffset = bottomScrollPosition - imageBottom;
        if (bottomOffset < 0) {
            bottomOffset = 0;
        }
        $(window).scroll(function () {
            var scrollPosition = getScrollPosition();
            var bottomScrollPosition = scrollPosition + globalViewportHeight;
            if (imageBottom > scrollPosition) {
                if (imageBottom < bottomScrollPosition) {
                    var percentScrolled = 1 - (((imageBottom + bottomOffset) - scrollPosition) / globalViewportHeight);
                    image.css('background-position-y', (-10 + parallaxModifier * percentScrolled) + 'px');
                }
            }
        });
    });
}

//Listen for when the user scrolls and then finishes scrolling (that is, stopped scrolling for 250 milliseconds)
$(window).scroll(function () {
    if ($("#false-after").length) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            var scrollPosition = getScrollPosition();
            var pageHeight = getPageHeight();
            var viewportHeight = getViewportHeight();
            var newScrollMax = pageHeight - viewportHeight;
            var pageScrollPercentage = scrollPosition / newScrollMax;
            if (pageScrollPercentage > 0) {
                $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")");
                $("#false-after").css("height", "4px");
            } else {
                $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")");
                $("#false-after").css("height", "0px");
            }
            //Scroll timer value
        }, 100));
    } else {
    }
    /* Get locations of page bottom and an arbitrary height of each element */
    $('.animate-fade-in').each(function (i) {
        var fadeLocation = $(this).offset().top + 0.25 * ($(window).height());
        var windowBottom = $(window).scrollTop() + $(window).height();
        /* If the object is visible in the window, fade in */
        if (windowBottom > fadeLocation) {
            $(this).delay(150).animate({ 'opacity': '1' }, 600);
        }
    });
});
