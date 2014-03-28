/*
var feed = new Instafeed({
  get: 'tagged',
  tagName: 'awesome',
  clientId: 'YOUR_CLIENT_ID'
});
feed.run();
*/

(function() {
  // Inject YouTube API script
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // globals
  var YouShare, root, player;

  // start
  YouShare = (function() {

    function YouShare(params) {
      var option, value;
      this.options = {
        target: 'youShare',
        framerate: 23.976,
        imagePath: "",
        defaultImg: ""
      };
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
    }

    YouShare.prototype.run = function() {
      var self = this;
      var currentTarget = $("#"+this.options.target);
      var currentVidName = $("#"+this.options.target).data("vid");

      // this function gets called when API is ready to use
      window.onYouTubePlayerAPIReady = function() {
        // create the global player from the specific iframe (#video)
        player = new YT.Player(this.options.target, {
          events: {
            // call this function when player is ready to use
            'onReady': Youshare.onPlayerReady
          }
        });
      }

    };

    YouShare.prototype.onPlayerReady = function() {
      $("button[data-vid="+currentVidName+"]").on("click", function(e){
        var socialType = $(this).data("social");
        // var socialFunction = "click" + (socialType.charAt(0).toUpperCase() + socialType.slice(1));
        self.pauseVideo(currentTarget);
        self.getCurrentFrame(currentTarget);
        // self[socialFunction](e);
        // self.getCurrentFrame();
      });
    };

    YouShare.prototype.getCurrentFrame = function(_currentTarget) {
      var self = this;

      var currentFrame = Math.round(_currentTarget[0].currentTime * this.options.framerate);
      var currentFrameImg = this.options.imagePath+currentFrame+".jpg";

      // fallback image
      // $.get(this.currentFrameImg).fail(function() {
      //   self.currentFrameImg = _vidOptions.defaultImg;
      // });
    };

    YouShare.prototype.pauseVideo = function(_currentTarget) {
      var self = this;
      _currentTarget[0].pauseVideo();
    };

  
    return YouShare;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.YouShare = YouShare;

}).call(this);