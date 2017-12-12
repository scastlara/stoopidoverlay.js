/**
 * Stoopidly simple overlay in pure javascript
 */
class StoopidOverlay {
  /**
   * Takes arguments:
   *    container: 'id'
   *    closeContainer: 'id'
   *    width: "x%"
   *    height: "y%"
   *    hidden: bool
   *    align: 'center' | 'left' | 'right'
   *    background: 'red'
   *    padding: '5%'
   *    closeBackground: 'blue'
   *
   */
  constructor(options) {
    var defaults = {
      container: 'overlay', closeContainer: 'close-overlay',
      width: '70%', height: '60%',
      hidden: true, align: "center",
      background: 'rgb(236, 236, 236)', padding: '5%',
      closeBackground : 'rgb(222, 242, 255)', scroll: true
    };
    for (var key in defaults) {
      if (!options.hasOwnProperty(key)) {
        options[key] = defaults[key];
      }
    }
    this.container = document.getElementById(options.container);
    this.close     = document.getElementById(options.closeContainer);
    // Check if containers exist
    if (this.container == null) {
      throw("Error: Container ${this.container} does not exist")
    }
    if (this.close == null) {
      throw("Error: Container ${this.close} does not exist: (default: id='close-overlay')")
    }
    // Initialize as hidden if necessary
    if (options.hidden) {
      this.hideOverlay();
    }

    // Reference to this
    var that = this;

    // Initialize css
    this.initCss(that, options);

    // Add close listener
    this.close.onclick=function(){ that.hideOverlay(); }
  }

  /*
   * Shows the overlay
   */
  showOverlay() {
    //this.container.style.display = 'block';
    this.close.style.display = 'block';
    var AnimationStep = 10; //pixels
    var AnimationInterval = 50; //milliseconds

    /* Stolen from:
     * https://stackoverflow.com/questions/5461575/animated-show-without-jquery
     */
    function Animate(element, targetHeight) {
      var curHeight = element.clientHeight;
      if (curHeight >= targetHeight)
      return true;
      element.style.height = (curHeight + AnimationStep) + "px";
      window.setTimeout(function() {
        Animate(element, targetHeight);
      }, AnimationInterval);
      return false;
    };

    this.container.style.display = "block";
    var height = this.container.scrollHeight;
    this.container.style.height = "0px";
    Animate(this.container, height);
  }


  /*
   * Hides the overlay
   */
  hideOverlay() {
    this.container.style.display = 'none';
    this.close.style.display = 'none';
  }

  /*
   * Changes the css of the overlay
   */
  initCss(that, options) {
    that.container.style.backgroundColor = options.background;
    that.container.style.width = options.width;
    that.container.style.position = "fixed";
    that.container.style.zIndex = "80";

    // Compute left and top offset
    var width  = parseInt(options.width.replace('%', ''));
    var height = parseInt(options.height.replace('%', ''));
    var pad    = parseInt(options.padding.replace('%', ''));
    var topoff = (100 - height) / 4;
    height = height - 4*pad;
    that.container.style.height = height + "%";
    that.container.style.top = topoff + "%";
    if (options.scroll) {
      that.container.style.overflowY = "scroll";
    }

    if (options.align == "center") {
      var offset = ((100 - width)/2) - pad;
    } else if (options.align == "left") {
      var offset = (100 - width)/8;
    } else if (options.align == "right") {
      var offset = (100 - width)/1.5;
    } else {
      throw("Error: Align should be 'center', 'left', or 'right'.")
    }

    console.log(offset);
    this.container.style.marginLeft = offset + "%";

    // Add padding
    that.container.style.padding = options.padding;

    // Close overlay
    that.close.style.position = "fixed";
    that.close.style.top = topoff + "%";

    // Color and size of close
    that.close.style.left =  offset + pad + width + "%";
    that.close.style.padding = "20px";
    that.close.style.zIndex = "100";
    that.close.style.backgroundColor = options.closeBackground;
    // Opacity of close button
    that.close.onmouseover = function() {
      this.style.opacity = 0.5;
      this.style.cursor  = "pointer";
    }
    that.close.onmouseleave = function() {
      this.style.opacity = 1;
      this.style.cursor  = "default";
    }


    //var height = options.height.replace('%', '');

  }
}
