/**
* Function de waDebug
* @param {string} text : text à afficher*/
function waDebug(text)
{
    var mDate = new Date();
    console.log('DEBUG : '+mDate.getUTCMinutes()+':'+mDate.getUTCSeconds()+':'+mDate.getUTCMilliseconds()+" \t"+text);
}

function waGallery(data, options)
{
	//Zoom out for Gallery
	options['onopen'] = function(){
		wa$('meta[name="viewport"]').attr("content","width=device-width, initial-scale=1, maximum-scale=1.0");
	};
	options['onclose'] = function(){
		wa$('meta[name="viewport"]').attr("content","width=device-width, initial-scale=1");
	};
	blueimp.Gallery(data, options);
}

function bindInPageGalleries() 
{
	var className = waImageGalleryClassSelector;
 	wa$('.'+className).each(function(){
 		wa$(this).click(function(event){
			event = event || window.event;
			var target = event.target || event.srcElement,
			link = target.src ? target.parentNode : target,
			options = {index: link, event: event, container:"#wa-gallery"},
			links = wa$(this).find('a');

			wa$('#wa-gallery ol.indicator').show();
			if(wa$(this).hasClass(waImageGalleryNoIndicatior))
				wa$('#wa-gallery ol.indicator').hide();
			waGallery(links, options);

 		});
 	});
 }

function bindLinkedGalleries() 
{
	var className = waImageGalleryIdLinkSelectorPattern;
	wa$('.'+className).each(function(){
		var galName = wa$(this).attr("data-gal");
		var e = wa$(this);
		wa$.ajax( galName )
		.done(function(data) {
 				e.click(function(event){
 					event.preventDefault();
 					if(typeof(data) ==  "string")
 						data = JSON.parse(data);
 					waGallery(data, {container:"#wa-gallery"});
 				});
		})
		.fail(function( jqXHR, textStatus ) {
  			waDebug( "Request for wa_Galleries failed: " + textStatus );
		});
	});
}

function bindLinkedCarousel() 
{
	var idLinkPattern = waCarouselIdLinkSelectorPattern;
	var idCarouselPattern = waCarouselIdSelectorPattern;

	wa$("[id^="+idLinkPattern+"]").each(function(){
		var galName = wa$(this).attr("data-gal");
		var idCarousel = idCarouselPattern+wa$(this).attr("id").replace(idLinkPattern,"");

		//AutoStart ?
		var autoStart = (wa$(this).attr("data-gal-autostart") ==="true");

		//Display Mode
		var displayMode;
		if(wa$(this).attr("data-gal-display-mode") ==="cover")
			displayMode = "cover";
		else
			displayMode = true;

		//Slide Duration
		var duration = parseInt(wa$(this).attr("data-gal-duration"));


		wa$.ajax( galName )
		.done(function(data) {
				if(typeof(data) ==  "string")
					data = JSON.parse(data);
				blueimp.Gallery(data,{
     			container: "#"+idCarousel,
     			carousel: true,
     			stretchImages : displayMode,
     			startSlideshow : autoStart,
     			slideshowInterval : duration
		});
		})
		.fail(function( jqXHR, textStatus ) {
  			waDebug( "Request for wa_Galleries failed: " + textStatus );
		});
	});
}


function bindGalleries()
{
	bindInPageGalleries();
	bindLinkedGalleries();
	bindLinkedCarousel();
}


//Entry point
bindGalleries();