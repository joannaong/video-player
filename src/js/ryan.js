var YTShareModule = function() {
	init2 = function(){
		console.log("hello");
	};
  function init(){
    console.log("hello2");
  };

  return {
    init: init
  };
};

// initialize
var yt = new YTShareModule();
yt.init2();