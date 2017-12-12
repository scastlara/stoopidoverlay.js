/*
* Stoopidly simple overlay in pure javascript
*/

class StoopidOverlay {
  constructor(options) {
    var defaults = {
      container: 'overlay', closeContainer: 'close-overlay',
      width: '70%', height: '80%',
      hidden: true, align ="center"
    };
    for (var key in defaults) {
      if (!options.hasOwnProperty(key)) {
        options[key] = defaults[key];
      }
    }
    this.container = document.getElementById(options.container);
    this.close     = document.getElementById(options.closeContainer);
    // Check
    if (this.container == null) {
      throw("Container ${this.container} does not exist")
    }

    if (this.close == null) {
      throw("Container ${this.close} does not exist: (default: id='close-overlay')")
    }
    if (options.hidden) {
      this.hideOverlay();
    }
    // Add close listener
    var that = this;
    this.close.onclick=function(){ that.hideOverlay(); }
  }

  showOverlay() {
    this.container.style.display = 'block';
    this.close.style.display = 'block';
  }

  hideOverlay() {
    this.container.style.display = 'none';
    this.close.style.display = 'none';
  }
}
