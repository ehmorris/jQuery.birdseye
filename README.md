# jQuery.birdseye

### About

jQuery.birdseye will read a content container and create a minified, birdseye version which shows the container's children elements in a navigable list, and the location of the user's viewport.

It's ideal to use on a content area with lots of subsections, like a long quiz or a long form.

### To Use

* copy dataset.js, birdseye.js, and birdseye.css somewhere into your project
* link to jquery, jquery UI, dataset.js, and birdseye.js in that order in your &lt;head&gt;
* link to birdseye.css somewhere in your &lt;head&gt;
* place a div, section, or aside into your document with the class of .birdseye
* on page load, call the birdseye function on the element for which you want birdseye navigation

```javascript
$(function() {
  $('.container').birdseye();
});
```

### Options

You can currently set the child element from which birdseye will create its sections, and the element which it will read for the section's title.

These values currently default, respectively, to "div", "h2".

Here's an example of overriding the default values:

```javascript
$(function() {
  $('.container').birdseye({
    'child_element' : 'section.class',
    'title_element' : 'h1.title'
  });
});
```


Note: birdseye.css applies default styles to the .birdseye container - it sets a width, and position:fixed;

Check back or "watch" for updates!
