// -----------------------
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



(function($) {

  // ------------------------------
  // jQuery plugin: for HTML video
  // ------------------------------
  $.fn.videoShareFrame = function(options) {
    // default options.
    var defaults = $.extend({
      framerate: 23.976,
      imagePath: "",
      defaultImg: "",
    }, options);
    // initialize.
    videoShareFrame.init(this, defaults);
    return this;
  }

  // --------------------
  // videoShareFrame Methods
  // --------------------
  var videoShareFrame = {
    currentFrame: null,
    currentFrameImg: null,

    init: function(_thisElement, _defaultOptions) {
      var self = this;
      var vidTargetName = _thisElement.data("vid");
      _vidOptions = _defaultOptions;

      // handlers
      $("button[data-vid="+vidTargetName+"]").on("click", function(e){
        var socialType = $(this).data("social");
        var socialFunction = "click" + (socialType.charAt(0).toUpperCase() + socialType.slice(1));
        self.pauseVideo(_thisElement);
        self.getCurrentFrame(_thisElement, _defaultOptions);
        self[socialFunction](e);
      });
    },

    getCurrentFrame: function(_vidTarget, _vidOptions) {
      var self = this;

      this.currentFrame = Math.round(_vidTarget[0].currentTime * _vidOptions.framerate);
      this.currentFrameImg = _vidOptions.imagePath+self.currentFrame+".jpg";

      // fallback image
      $.get(this.currentFrameImg).fail(function() {
        self.currentFrameImg = _vidOptions.defaultImg;
      });
    },

    clickTumblr: function(e) {
      var self = this;
      var $currTarget = $(e.currentTarget);
      var tmData = {
        url: $currTarget.data("tmurl") ? encodeURIComponent($currTarget.data("tmurl")) : "",
        caption: $currTarget.data("tmcaption") ? encodeURIComponent($currTarget.data("tmcaption")) : "",
        picture: encodeURIComponent(self.currentFrameImg)
      };

      this.openNewWindow("//www.tumblr.com/share/photo?source="+tmData.picture+"&caption="+tmData.caption+"&click_thru="+tmData.url);
    },

    clickTwitter: function(e) {
      var self = this;
      var $currTarget = $(e.currentTarget);
      var twData = {
        url: $currTarget.data("twurl") ? $currTarget.data("twurl") : "",
        text: $currTarget.data("twtext") ? $currTarget.data("twtext") : "",
        picture: self.currentFrameImg
      };

      this.openNewWindow("https://twitter.com/share?url="+twData.url+"&text="+twData.text+" "+twData.picture);
    },
    
    clickFacebook: function(e) {
      var self = this;
      var $currTarget = $(e.currentTarget);
      var fbData = {
        method: 'feed',
        name: $currTarget.data("fbname") ? $currTarget.data("fbname") : "",
        link: $currTarget.data("fblink") ? $currTarget.data("fblink") : "",
        picture: self.currentFrameImg,
        caption: $currTarget.data("fbcaption") ? $currTarget.data("fbcaption") : "",
        description: $currTarget.data("FBdescription")
      };

      // FB method
      FB.ui(
        fbData,
        function(response) {
          if (response && response.post_id) { 
            console.log('Facebook post was published.', response.post_id);
          } else {
            console.log('Facebook post was not published.');
          }
        }
      );
    },

    openNewWindow: function(_url) {
      var width  = 575,
          height = 400,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          url    = _url,
          opts   = 'status=1' +
                   ',width='  + width  +
                   ',height=' + height +
                   ',top='    + top    +
                   ',left='   + left;

      window.open(url, "_blank", opts);
    },

    pauseVideo: function(_vidTarget) {
      var self = this;
      _vidTarget[0].pause();
    }

  }
 
})(jQuery);