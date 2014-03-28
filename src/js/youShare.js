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

var YTShareModule = {
  currentFrame: null,
  currentFrameImg: null,
  players: {},

  init: function() {
    var self = this;

    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // this function gets called when API is ready to use
    window.onYouTubePlayerAPIReady = function() {
      $(".joShare").each(function(i, item) {
        self.players[this.id] = new YT.Player(this.id, {
          events: {
            'onReady': self.onPlayerReady,
            'onStateChange': self.onPlayerStateChange
          }
        });
      });
    }
  },

  onPlayerReady: function(e) {
    var self = this;
    var currTarget = e.target;
    var vidTargetID = currTarget.a.id;
    var parentEl = $("#"+currTarget.a.id).data("vid");

    // social buttons.
    $("button[data-vid="+parentEl+"]").on("click", function(e){
      var socialType = $(this).data("social");
      var socialFunction = "click" + (socialType.charAt(0).toUpperCase() + socialType.slice(1));
      YTShareModule.getCurrentFrame(vidTargetID);
      YTShareModule[socialFunction](e);
    });

    // close modal and autoplay on click.
    $("#"+parentEl).find(".video-social-modal").on("click", function(e) {
      if(e.target === this) {
        YTShareModule.hideOverlay(parentEl);
        YTShareModule.players[vidTargetID].playVideo();
      }
    });

    // set vars.
    YTShareModule.players[vidTargetID].framerate = $("#"+vidTargetID).data("framerate") ? $("#"+vidTargetID).data("framerate") : 23.976;
    YTShareModule.players[vidTargetID].imagepath = $("#"+vidTargetID).data("imagepath") ? $("#"+vidTargetID).data("imagepath") : "";
    YTShareModule.players[vidTargetID].imagedefault = $("#"+vidTargetID).data("imagedefault") ? $("#"+vidTargetID).data("imagedefault") : "";
  },

  onPlayerStateChange: function(e) {
    var currTarget = e.target;
    var vidTargetID = currTarget.a.id;
    var parentEl = $("#"+currTarget.a.id).data("vid");

    if (e.data == 2) { // paused
      YTShareModule.showOverlay(parentEl);
    } else {
      YTShareModule.hideOverlay(parentEl);
    }
  },

  showOverlay: function(_parentEl) {
    $("#"+_parentEl).find(".video-social-modal").addClass("visible");
  },

  hideOverlay: function(_parentEl) {
    $("#"+_parentEl).find(".video-social-modal").removeClass("visible");
  },

  getCurrentFrame: function(vidTargetID) {
    YTShareModule.currentFrame = Math.round(YTShareModule.players[vidTargetID].getCurrentTime() * YTShareModule.players[vidTargetID].framerate);
    YTShareModule.currentFrameImg = YTShareModule.players[vidTargetID].imagepath+YTShareModule.currentFrame+".jpg";

    // fallback image
    $.get(YTShareModule.currentFrameImg).fail(function() {
      YTShareModule.currentFrameImg = YTShareModule.players[vidTargetID].imagedefault;
    });
  },

  clickTumblr: function(e) {
    var $currTarget = $(e.currentTarget);
    var tmData = {
      url: $currTarget.data("tmurl") ? encodeURIComponent($currTarget.data("tmurl")) : "",
      caption: $currTarget.data("tmcaption") ? encodeURIComponent($currTarget.data("tmcaption")) : "",
      picture: encodeURIComponent(YTShareModule.currentFrameImg)
    };

    this.openNewWindow("//www.tumblr.com/share/photo?source="+tmData.picture+"&caption="+tmData.caption+"&click_thru="+tmData.url);
  },

  clickTwitter: function(e) {
    var $currTarget = $(e.currentTarget);
    var twData = {
      url: $currTarget.data("twurl") ? $currTarget.data("twurl") : "",
      text: $currTarget.data("twtext") ? $currTarget.data("twtext") : "",
      picture: YTShareModule.currentFrameImg
    };

    this.openNewWindow("https://twitter.com/share?url="+twData.url+"&text="+twData.text+" "+twData.picture);
  },
  
  clickFacebook: function(e) {
    var $currTarget = $(e.currentTarget);
    var fbData = {
      method: 'feed',
      name: $currTarget.data("fbname") ? $currTarget.data("fbname") : "",
      link: $currTarget.data("fblink") ? $currTarget.data("fblink") : "",
      picture: YTShareModule.currentFrameImg,
      caption: $currTarget.data("fbcaption") ? $currTarget.data("fbcaption") : "",
      description: $currTarget.data("FBdescription"),
      source: 'http://www.youtube.com/v/1CE6W5BubQo'
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
  }

}

// initialize
YTShareModule.init();