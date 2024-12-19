wa$(document).ready(function(){
    var pageTitle	= document.title; //HTML page title
    var pageUrl		= location.href; //Location of this page
	
	wa$('.wa-sharebar li').click(function(event){
		OpenShareUrl(wa$(this).data("wa-url"));
	});
		
	function OpenShareUrl(openLink){
		if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0)<768)
		{
			location.href = openLink;
		}
		else
		{
		//Parameters for the Popup window
        winWidth    = 650; 
        winHeight   = 450;
        winLeft     = (wa$(window).width()  - winWidth)  / 2,
        winTop      = (wa$(window).height() - winHeight) / 2,
        winOptions   = 'width='  + winWidth  + ',height=' + winHeight + ',top='    + winTop    + ',left='   + winLeft;
        window.open(openLink,'Share This Link',winOptions); //open Popup window to share website.
     }
	}



	wa$(".wa-sharebar .wa-button-sharebar").css("width",wa$(".wa-sharebar").data("wa-size"));
	wa$(".wa-sharebar .wa-button-sharebar").css("height",wa$(".wa-sharebar").data("wa-size"));
	wa$(".wa-sharebar .wa-button-sharebar").css("margin-bottom",wa$(".wa-sharebar").data("wa-spacing"));

	var edge = parseInt(wa$(".wa-sharebar").data("wa-size").replace("px",""));
	var time = 25;
	var factor = 1.10;
	wa$(".wa-sharebar .wa-button-sharebar").hover(
		function() {
	    	wa$(this).animate({
				width: edge*factor+"px", 
				height: edge*factor+"px"
	    	}, time ); 
		},
		function(){
			wa$(this).animate({
				width: edge+"px", 
				height: edge+"px"
	    	}, time );
		}
	);

	wa$(".wa-sharebar").fadeIn();


});