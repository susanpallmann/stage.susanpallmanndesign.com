$(document).ready(function() {
  globalViewportHeight = getViewportHeight();
  globalPageHeight = getPageHeight();
  heroParallax();
  parallax();
  pattern = 1;

  /* Adjust these global variables */
  // Speed of hamburger animation (milliseconds). Should match CSS animation speed.
  hamburgerAnimSpeed = 400;
  /* End adjustable variables */

  /* Do not adjust these global variables */
  scrollValue = -100;
  screenWidth = screen.width;
  /* End global variables */

  $("#top_hamburger").click(function() {
    if ($(this).hasClass("animcomplete")) {
      $(this).removeClass("animcomplete");
      $(this).addClass("closed");
      $("#dropdown").slideToggle( "fast" );
      $('#dropdown').find('.expandable').addClass('collapsed');
      setTimeout(function() {
        $("#top_hamburger").removeClass("closed");
      }, hamburgerAnimSpeed);
    } else {
      $(this).addClass("open");
      $('#dropdown').find('.expandable').removeClass('collapsed');
      $("#dropdown").slideToggle( "fast" );
      setTimeout(function() {
        $("#top_hamburger").removeClass("open");
        $("#top_hamburger").addClass("animcomplete");
      }, hamburgerAnimSpeed);
    }
  });
  
  $("#mark").click(function() {
    if (location.pathname == "/") {
      scrollToTop();
    } else {
      window.location.assign("https://susanpallmann.github.io/stage.susanpallmanndesign.com/");
    }
  });
  $('header .sp-icon').mouseleave(function() {
    if (pattern < 3) {
      pattern++;
    } else {
      pattern = 1;
    }
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
  $('footer .sp-icon').mouseleave(function() {
    if (pattern < 2) {
      pattern++;
    } else {
      pattern = 1;
    }
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
  $("#filter .tag").click(function() {
    filter = $(this);
    text = filter.html();
    newText = text.toLowerCase().replace(' ','-');
    $("#filter .tag").removeClass('selected');
    $(this).addClass('selected');
    if (newText === "view-all") {
      $('.project .column').parents('.project').addClass('visible').css('display', 'inline-block');
    } else {
      $('.project .column').parents('.project').removeClass('visible').css('display', 'none');
      $('.' + newText).parents('.project').addClass('visible').css('display', 'inline-block');
    }
  });
  //Expands or collapses panels with this switch in them
  //When the user clicks on an expand/collapse toggle
  $('.read-more').click(function () {
    var button = $(this);
    var container = $(this).parents('.container');
    
    //jQuery default slideToggle effect
    container.find('.expandable').slideToggle( "fast" );
    
    //If it's already checked
    if (button.attr('aria-checked') === 'true') {
      //Uncheck it, update the icon, expand text
      button.attr('aria-checked','false');
      button.html("Read More ▼");
      container.find('.expandable').addClass('collapsed');
    } else {
      //If it is not checked, check it, update the icon, collapse text
      button.attr('aria-checked','true');
      button.html("Read Less ▲");
      container.find('.expandable').removeClass('collapsed');
    }
  });
  
  //Gallery widget functionality
  $('.gallery-right').click(function() {
    var button = $(this);
    var gallery = button.parents('.gallery');
    var galleryNum = parseInt(gallery.attr('data-img-num'));
    var currentImg = gallery.find('.gallery-img');
    var imgNum = parseInt(currentImg.attr('data-current-img'));
    if (gallery.hasClass('gallery-anim')) {
      currentImg.animate({'opacity':'0'},100);
      if ( imgNum === galleryNum) {
        imgNum = 1;
      } else {
        imgNum++;
      }
      currentImg
        .delay(100)
        .queue(function(next) { $(this).attr('data-current-img',imgNum); next(); })
        .animate({'opacity':'1'},400);
    } else {
      if ( imgNum === galleryNum) {
        imgNum = 1;
      } else {
        imgNum++;
      }
      currentImg.attr('data-current-img',imgNum);
    }
  });
  $('.gallery-left').click(function() {
    var button = $(this);
    var gallery = button.parents('.gallery');
    var galleryNum = parseInt(gallery.attr('data-img-num'));
    var currentImg = gallery.find('.gallery-img');
    var imgNum = parseInt(currentImg.attr('data-current-img'));
    if (gallery.hasClass('gallery-anim')) {
      currentImg.animate({'opacity':'0'},100);
      if ( imgNum === 1) {
        imgNum = galleryNum;
      } else {
        imgNum--;
      }
      currentImg
        .delay(100)
        .queue(function(next) { $(this).attr('data-current-img',imgNum); next(); })
        .animate({'opacity':'1'},400);
    } else {
      if ( imgNum === 1) {
        imgNum = galleryNum;
      } else {
        imgNum--;
      }
      currentImg.attr('data-current-img',imgNum);
    }
  });  
  
});

window.onload = function() {
};
//Returns the position user is scrolled to when called. Ensure this function is called when user has finished scrolling.
function getScrollPosition() {
  var scrollPosition = $(window).scrollTop();
  return scrollPosition;
}
//Returns the full height of the page, even past the viewport. Useful for determining percentage scrolled.
function getPageHeight() {
  var pageHeight = $(document).height();
  globalPageHeight = pageHeight;
  return pageHeight;
}
//Returns the viewport height. Useful for determining if something is visible or not as the user scrolls.
function getViewportHeight() {
  var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  globalViewportHeight = viewportHeight;
  return viewportHeight;
}

function heroParallax() {
  if ( $('#hero').length ) {
    if ( $('#hero').hasClass('gradient') ) {
      $("#hero").mousemove(function( event ) {
        var w = $(this).width(),
          pct = 360*(+event.pageX)/w,
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
      $(window).scroll(function() {
        var scrollPosition = getScrollPosition();
        var bottomScrollPosition = scrollPosition + globalViewportHeight;
        if ( heroBottom > scrollPosition) {
          if ( heroBottom < bottomScrollPosition) {
            var percentScrolled = 1 - (((heroBottom + bottomOffset) - scrollPosition)/globalViewportHeight);
            $('img.parallax').css('transform','translateY(-' + imageModifier*percentScrolled + 'px)');
            $('#dramatic-headline').css('transform','translateY(' + headlineModifier*percentScrolled + 'px)');
          }
        }
      }
    });
  }
}

function parallax() {
  $('.imgParallax').each( function(index) {
    var image = $(this);
    var imageOffset = image.offset();
    var imageTop = imageOffset.top;
    var imageHeight = image.height();
    var imageBottom = imageTop + imageHeight;
    var parallaxModifier = 50;
    var scrollPosition = getScrollPosition();
    var bottomScrollPosition = scrollPosition + globalViewportHeight;
    var bottomOffset = bottomScrollPosition - imageBottom;
    if (bottomOffset < 0) {
      bottomOffset = 0;
    }
    $(window).scroll(function() {
      var scrollPosition = getScrollPosition();
      var bottomScrollPosition = scrollPosition + globalViewportHeight;
      if ( imageBottom > scrollPosition) {
        if ( imageBottom < bottomScrollPosition) {
          var percentScrolled = 1 - (((imageBottom + bottomOffset) - scrollPosition)/globalViewportHeight);
          image.css('background-position-y', (-25+parallaxModifier*percentScrolled) + 'px');
        }
      }
    });
  });
}

//Listen for when the user scrolls and then finishes scrolling (that is, stopped scrolling for 250 milliseconds)
$(window).scroll(function() {
  if ( $("#false-after").length ) {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      var scrollPosition = getScrollPosition();
      var pageHeight =  getPageHeight();
      var viewportHeight = getViewportHeight();
      var newScrollMax = pageHeight - viewportHeight;
      var pageScrollPercentage = scrollPosition/newScrollMax;
      if (pageScrollPercentage > 0) {
        $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
        $("#false-after").css("height", "4px");
      } else {
        $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
        $("#false-after").css("height", "0px");
      }
      //Scroll timer value
    }, 100));
  } else {
  }
  /* Get locations of page bottom and an arbitrary height of each element */
  $('.animate-fade-in').each( function(i){
    var fadeLocation = $(this).offset().top + 0.25*($(window).height());
    var windowBottom = $(window).scrollTop() + $(window).height();
    /* If the object is visible in the window, fade in */
    if( windowBottom > fadeLocation ){
      $(this).delay(150).animate({'opacity':'1'},600);
    }
  });
});
/* Please say editing it magically fixed the problem */
