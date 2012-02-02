(function($) {

  // add hashCode function to JS strings
  String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
      char = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  // the actual plugin function
  $.fn.birdseye = function(options) {

    // set default settings
    var settings = $.extend({
      'create_id' : true
    }, options);

    // create birdseye nav from the element on which the function was called
    var container = this;

    // establish global object that can store constants etc.
    birdseye_constants = new Object();

    // constants can change if viewport width/height are adjusted
    // call this function to recalculate constants
    function calculate_constants() {
      // determines how many times smaller birdseye will be than the content container
      // fills height of view window
      birdseye_constants.divisor = $(document).height() / 
                                   ($(window).height() - $('.birdseye').offset().top);
      // store placement info on content section
      birdseye_constants.content_dist_from_top = $(container).offset().top;
      birdseye_constants.content_height = $(container).outerHeight();
    }

    // fill birdseye container with html / data-* attributes from content container
    // if already filled, recalculates data-* attributes
    function birdseye_render() {
      // check if birdseye container is already filled - if so, update data-* attributes
      if ($('.birdseye').children().length) {
        $(container).children('div').each(function(e) {
          var height = $(this).outerHeight() / birdseye_constants.divisor;
          var dist_from_top = ($(this).offset().top - birdseye_constants.content_dist_from_top) 
                              / birdseye_constants.divisor;

          $('.birdseye h2').eq(e).dataset('top', dist_from_top);
          $('.birdseye h2').eq(e).dataset('height', height);
        });
      }
      else {
        $(container).children('div').each(function() {
          var title = $(this).children('h2').text();
          var height = $(this).outerHeight() / birdseye_constants.divisor;
          var dist_from_top = ($(this).offset().top - birdseye_constants.content_dist_from_top) 
                              / birdseye_constants.divisor;

          // for anchor tag navigation, auto asign anchors / links to divs / birdseye links
          // anchors are created from hash of content div's title
          // if create_id setting is false, fetch already existing ids from divs
          if (settings.create_id) {
            var id = 'section' + title.hashCode();
            $(this).attr('id', id);
          }
          else {
            var id = $(this).attr('id');
          }

          $('.birdseye').append(
            '<h2 data-height="'+height+'" data-top="'+dist_from_top+'">'+
              '<a href="#'+id+'">'+title+'</a>'+
            '</h2>'
          );
        });
      }
    }

    // goes through h2 elements in birdseye container and styles them
    // based on their data-* attributes
    function birdseye_style() {
      $('.birdseye h2').each(function() {
        var height = $(this).dataset('height');
        var dist_from_top = $(this).dataset('top');
        $(this).css({
          'top': dist_from_top+'px',
          'height': height+'px'
        });
      });
    }

    // fill birdseye container with viewport html and data-* attributes
    function viewport_render() {
      var window_height = $(window).innerHeight() / birdseye_constants.divisor;
      var window_dist_from_top = (window.scrollY - birdseye_constants.content_dist_from_top) 
                                 / birdseye_constants.divisor;

      // check if window has moved before executing
      if (window_dist_from_top != $('#birdseye-location').dataset('top')) {
        // check if the element already exists to avoid inserting the dom element more than once
        if ($('#birdseye-location').length) {
          $('#birdseye-location').dataset('height', window_height);
          $('#birdseye-location').dataset('top', window_dist_from_top);
        }
        else {
          $('.birdseye').append(
            '<div id="birdseye-location"'+
                     'data-height="'+window_height+'"'+
                     'data-top="'+window_dist_from_top+'"></div>'
          );
        }
      }
    }

    // goes through data-* attributes of viewport and applies css styles
    function viewport_style() {
      var window_height = $('#birdseye-location').dataset('height');
      var window_dist_from_top = $('#birdseye-location').dataset('top');
      $('#birdseye-location').css({
        'top': window_dist_from_top+'px',
        'height': window_height+'px'
      });
    }

    // set birdseye container height so top and bottom of viewport indicator
    // clip correctly
    function birdseye_height() {
      var birdseye_elements_height = eval($('.birdseye h2:last').dataset('height')) +
                                     eval($('.birdseye h2:last').dataset('top'));

      $('.birdseye').height(birdseye_elements_height);
    }

    // call both viewport functions
    function viewport() {
      viewport_render();
      viewport_style();
    }

    // run plugin
    calculate_constants();
    birdseye_render();
    birdseye_style();
    viewport();
    birdseye_height();

    // recalculates everything on window resize
    $(window).resize(function() {
      calculate_constants();
      birdseye_render();
      birdseye_style();
      viewport();
      birdseye_height();
    });

    // calls viewport() every 50 milliseconds - moves the indicator smoothly
    window.setInterval(viewport, 50);

    // maintain chainability
    return this;
  }

})(jQuery);
