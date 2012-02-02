# jQuery.birdseye

To Use

* copy dataset.js, birdseye.js, and birdseye.css somewhere into your project
* link to jquery, dataset.js, and birdseye.js in that order in your &lt;head&gt;
* link to birdseye.css somewhere in your &lt;head&gt;
* place a div, section, or aside into your document with the class of .birdseye
* on page load, call the birdseye function on the element for which you want birdseye navigation

    $(function() {
      $('.container').birdseye();
    });

Note: birdseye.css applies default styles to the .birdseye container - it sets a width, and position:fixed;
