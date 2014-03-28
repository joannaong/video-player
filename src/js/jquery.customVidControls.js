window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();




(function($) {

  // --------------------
  // jQuery plugin
  // --------------------
  $.fn.customVidControls = function(options) {
    // default options.
    var defaults = $.extend({
     
    }, options);
    // initialize.
    customVidControls.init(this, defaults);
    return this;
  }

  // --------------------
  // customVidControls Methods
  // --------------------
  var customVidControls = {

    init: function(_thisElement, _defaultOptions) {
      var self = this;
      var vidTargetName = _thisElement.data("vid");
      _vidOptions = _defaultOptions;

      // handlers
      $(".seek").on("mousemove", function(e) {
        console.log(e.pageX);
      });

      (function animloop(){
        requestAnimFrame(animloop);
        self.render(_thisElement);
      })();

      $("button[data-vid="+vidTargetName+"]").on("click", function(e){
        var socialType = $(this).data("social");
        var socialFunction = "click" + (socialType.charAt(0).toUpperCase() + socialType.slice(1));
        self.pauseVideo(_thisElement);
        self.getCurrentFrame(_thisElement, _defaultOptions);
        self[socialFunction](e);
      });
    },

    seek: function(_thisElement) {
      var video = _thisElement[0];
      var divider = video.duration * 0.01;
      var ct = video.currentTime / divider;
      $(".seek-head").css('width', ct + '%');
    }

  }
 
})(jQuery);