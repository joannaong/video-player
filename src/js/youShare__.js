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
  var players = {};

  // constructor
  var YTShareModule = function () {
    var self = this;

    // YT: Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YT: calls this on player API ready
    window.onYouTubePlayerAPIReady = function() {
      $(".joShare").each(function() {
        var identifier = this.id;
        players[identifier] = new YT.Player(identifier, {
          events: {
            'onReady': self.onPlayerReady,
            'onStateChange': self.onPlayerStateChange
          }
        });
      });
    }
  };

  // prototype
  YTShareModule.prototype = {
    constructor: YTShareModule,

    onPlayerReady: function(event) {
      YTPlayer.vidTargetID = YTPlayer.a.id;
      YTPlayer.parentEl = $("#"+YTPlayer.a.id).data("vid");

      $("button[data-vid="+YTPlayer.parentEl+"]").on("click", function(e){
        var socialType = $(this).data("social");
        var socialFunction = "click" + (socialType.charAt(0).toUpperCase() + socialType.slice(1));
        YTShareModule.getCurrentFrame();
        YTShareModule[socialFunction](e);
      });

      // close modal and autoplay on click
      $("#"+YTPlayer.parentEl).find(".video-social-modal").on("click", function(e) {
        if(e.target === this) {
          YTShareModule.hideOverlay();
          YTPlayer.playVideo();
        }
      });
    },

    onPlayerStateChange: function(event) {
      console.log("1s");
    }

  };

  return YTShareModule;
})();

// initialize
var yt = new YTShareModule();