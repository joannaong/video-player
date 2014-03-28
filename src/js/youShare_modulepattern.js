// setup social: Facebook
// -----------------------
window.fbAsyncInit = function() {
  FB.init({
    appId  : 1396295913972778,
    status : false,
    cookie : true,
    xfbml  : true
  });
};
(function() {
  var e = document.createElement('script');
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  e.async = true;
  document.getElementById('fb-root').appendChild(e);
}());
// -----------------------

var YTShareModule = (function() {
  // private variables and functions
  // var foo = 'bar';

  // constructor
  var YTShareModule = function (_element) {
    var self = this;

    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    console.log("a", _element);

    // this is called by YT
    window.onYouTubePlayerAPIReady = function() {
      // create the global player from the specific iframe (#video)
      YTPlayer = new YT.Player(_element, {
        events: {
          'onReady': self.onPlayerReady,
          'onStateChange': self.onPlayerStateChange
        }
      });
    }
  };

  // prototype
  YTShareModule.prototype = {
    constructor: YTShareModule,

    onPlayerReady: function(event) {
      console.log("s");
    },

    onPlayerStateChange: function(event) {
      console.log("1s");
    }

  };

  // return YTShareModule
  return YTShareModule;
})();

var my_module = new YTShareModule("vision-video");
var as = new YTShareModule("night-video");