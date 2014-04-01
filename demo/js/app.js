$(function() {

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	var x, y = 0; 
	var video = $("#detroit-video")[0];
	
	(function animloop(){
	  requestAnimFrame(animloop);
	  render();
	})();

	function render() {
		var divider = video.duration * 0.01;
		var ct = video.currentTime / divider;
		$(".seek-head").css('width', ct + '%');
	}

	$(".seek").on("mousemove", function(e) {
		var xy_pos = getXYpos(this);
    x = e.pageX;
	  x = x - xy_pos['xp'];

	  var seekBarWidth = $(this).width();
	  var mouseTime = (x * video.duration) / seekBarWidth;
	  var frameNum = Math.round(mouseTime * 23.976);
	  var videoImgpath = $("video").data("imgpath");

	  $(".seek-hover").css("background-image","url('"+videoImgpath+frameNum+".jpg')");
		$(".seek-hover").css("left",x);
	});


	function getXYpos(elm) {
	  x = elm.offsetLeft;        // set x to elm’s offsetLeft
	  y = elm.offsetTop;         // set y to elm’s offsetTop
	  elm = elm.offsetParent;    // set elm to its offsetParent

	  //use while loop to check if elm is null
	  // if not then add current elm’s offsetLeft to x
	  //offsetTop to y and set elm to its offsetParent
	  while(elm != null) {
	    x = parseInt(x) + parseInt(elm.offsetLeft);
	    y = parseInt(y) + parseInt(elm.offsetTop);
	    elm = elm.offsetParent;
	  }

	  // returns an object with "xp" (Left), "=yp" (Top) position
	  return {'xp':x, 'yp':y};
	}
	
});