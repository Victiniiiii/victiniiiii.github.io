// sass-processor.js

// Define a function to process SCSS
function processSCSS(scssContent, callback) {
  Sass.compile(scssContent, function(result) {
    if (result.status === 0) {
      // Successful compilation, result.text contains the CSS
      var css = result.text;
      // Invoke the provided callback with the CSS
      callback(css);
    } else {
      // Compilation error, invoke the callback with an error
      callback(null, result.formatted);
    }
  });
}
