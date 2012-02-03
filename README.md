# jQuery.birdseye

### About

jQuery.birdseye will read a content container and create a minified, birdseye version which shows the container's children elements in a navigable list. jQuery.birdseye will display the location of the user's viewport over the current section, and the birdseye links are anchor links to their sections.

It's ideal to use on a content area with lots of subsections, like a long quiz or a long form.

### To Use

* copy dataset.js, birdseye.js, and birdseye.css somewhere into your project
* link to jquery, dataset.js, and birdseye.js in that order in your &lt;head&gt;
* link to birdseye.css somewhere in your &lt;head&gt;
* place a div, section, or aside into your document with the class of .birdseye
* on page load, call the birdseye function on the element for which you want birdseye navigation

```javascript
$(function() {
  $('.container').birdseye();
});
```

### Options

You can currently set the child element from which birdseye will create its sections, the element which it will read for the section's title, and whether or not it should apply automatic anchor tags to sections.

These values currently default, respectively, to "div", "h2", and "true".

Here's an example of overriding the default values:

```javascript
$(function() {
  $('.container').birdseye({
    'child_element' : 'section.class',
    'title_element' : 'h1.title',
    'create_id'     : false
  });
});
```


Note: birdseye.css applies default styles to the .birdseye container - it sets a width, and position:fixed;

Check back or "watch" for updates!
