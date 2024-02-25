// main.js

// Example SCSS content
var scssContent = `
  // Your SCSS code here
  body {
    background-color: #f0f0f0;
  }
`;

// Process SCSS and apply styles
processSCSS(scssContent, function(css, error) {
  if (css) {
    // Apply the CSS to the document or use as needed
    applyStyles(css);
  } else {
    // Handle compilation error
    console.error(error);
  }
});

// Function to apply styles to the document
function applyStyles(css) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
