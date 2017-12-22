# stoopidoverlay.js

Stoopidly simple overlay in pure JavaScript. No bullshit overlay I made for myself.

## Usage

```js
var options = {
  container: 'overlay',
  width: '70%',
  height: '60%',
  align: "center",
  background: 'rgb(236, 236, 236)',
  closeBackground : 'rgb(222, 242, 255)'
}

// Set the thing
myOverlay = new StoopidOverlay(options);

// Show the thing
myOverlay.showOverlay();

// Hide the thing
myOverlay.hideOverlay();
```

> Html file with button that opens the overlay

```html
<html>
  <body>
    This is my content. Click <a id="btn">Here</a>
    <div id="overlay">Hidden teehee</div>
    <script src="https://rawgit.com/scastlara/stoopidoverlay.js/master/src/stoopidoverlay.js"></script>
    <script>
      var options = {
        container: 'overlay',
        openContainer: 'btn'
      }
      var myOverlay = new StoopidOverlay(options);
    </script>
  </body>
</html>

```


## License
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
