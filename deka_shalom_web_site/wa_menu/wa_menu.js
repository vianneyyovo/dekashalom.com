//Menu auto sizing
function MenuShaper(id){
	this.id = "#"+id;
	this.content = 0;
	this.container = 0;
	this.isTypeCentered = false;
	this.isCentered = false;
}

MenuShaper.prototype.setCentered = function(active)
{
	if(active)
	{
		var space = this.container-this.content;
		var pad = space/2+15;// 15-> negative margin .navbar-brand
		this.waInMenu$(".navbar-header").css("padding-left", pad+"px");
	}
	else
		this.waInMenu$(".navbar-header").css("padding-left","");
}


MenuShaper.prototype.waInMenu$ = function(selector)
{
	if(selector === undefined)
		return wa$(this.id);
	return wa$(this.id).find(selector);
};

MenuShaper.prototype.updateMenuShape = function()
{
	if(this.content>-1)
	{
		var $menu = this.waInMenu$();
		this.container = this.waInMenu$("nav > div").first().width();

		var $containerAdjusted = this.container;

		if(this.isTypeCentered)
			$containerAdjusted -=30; //cancel 15 margin centered case

		if(this.content>$containerAdjusted && !$menu.hasClass("wa-menu-small"))
		{
			$menu.addClass("wa-menu-small");
			this.setCentered(false);
		}

		else if(this.content<$containerAdjusted)
		{
			if($menu.hasClass("wa-menu-small"))
				$menu.removeClass("wa-menu-small");
			
			if(this.isTypeCentered)
					this.setCentered(true);
		}
	}
	else
		this.trySetContentSize();
};

MenuShaper.prototype.trySetContentSize = function()
{
	var $this = this;
	if(this.waInMenu$("nav > div > .navbar-collapse").css("display") !=="none" && this.waInMenu$().css("display") !=="none" )
	{
		this.content = this.waInMenu$("nav > div > .navbar-header .navbar-brand").first().outerWidth()
		this.waInMenu$("nav > div > .navbar-collapse >ul > li").each(function(){
			$this.content += $this.waInMenu$(this).outerWidth();
		});

		$searchBar = this.waInMenu$("nav > div > .navbar-collapse > .navbar-form");
		if($searchBar.length)
			this.content +=$searchBar.first().outerWidth()
		this.updateMenuShape();
	}
	else
		this.content=-1;

	this.waInMenu$().removeClass("wa-menu-init");
};

MenuShaper.prototype.handle = function()
{
	var $this = this;
	this.isTypeCentered = this.waInMenu$(".navbar").hasClass("wa-menu-centered");

	this.trySetContentSize();
	wa$(window).resize(function() {	
		$this.updateMenuShape();
	});
};


//----------------------------------------------------------------------------------------------------------//

//Menu always on top
var MenuFixedHandler = {
	
	menuTop:0,
	menuBottom:0,

	msi:0,
	fixedMenuShaper:0,

	$fixedMenu:0,
	isFluid : true,

	isUsed:false,
	margin:16,

	isMenuVisible:function()
	{
		var $window = wa$(window);
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();

		if(this.menuBottom-this.margin <= docViewTop)
			return false;
		else if(this.menuTop+this.margin >= docViewBottom)
			return false;
		else
			return true;
	},

	setMenuFixed: function(fixed)
	{
		if(fixed && ResponsiveBootstrapToolkit.is('>xs'))
		 	this.$fixedMenu.fadeIn();

		else
			this.$fixedMenu.fadeOut();

		this.fixedMenuShaper.updateMenuShape();
	},

	init: function()
	{
		this.msi.waInMenu$().css('visibility','visible');

		//Clone Menu
		this.isFluid = this.msi.waInMenu$('.navbar').hasClass("wa-aot-fluid");
		this.$fixedMenu = this.msi.waInMenu$().clone().hide().addClass("navbar-fixed-top");
		this.$fixedMenu.attr("id",this.$fixedMenu.attr("id")+"-fixed");
		this.$fixedMenu.find("button").attr("data-target", this.$fixedMenu.find("button").attr("data-target")+"-fixed");
		this.$fixedMenu.find(".navbar-collapse").attr("id", this.$fixedMenu.find(".navbar-collapse").attr("id")+"-fixed");
		this.$fixedMenu.removeClass("wa-menu-small");
		if(!this.isFluid)
		{
			this.$fixedMenu.css("right", "auto");
			this.$fixedMenu.css("left", "auto");
			this.$fixedMenu.css("width", this.msi.waInMenu$().width()+"px");
			var self = this;
			wa$(window).resize(function() {	
				self.$fixedMenu.css("width", self.msi.waInMenu$().width()+"px");
			});
		}			

		this.msi.waInMenu$().parent().append(this.$fixedMenu);

		this.fixedMenuShaper = new MenuShaper(this.$fixedMenu.attr("id"));
		this.fixedMenuShaper.handle();

		var $elem = this.msi.waInMenu$(".navbar");
		this.menuTop = $elem.offset().top;
		this.menuBottom = this.menuTop + $elem.height();
	},

	handle: function(menuShaperInst)
	{
		//Only first
		if(!this.isUsed)
		{

			this.msi = menuShaperInst;
			this.init();
			this.setMenuFixed(!this.isMenuVisible());
			var self = this;
			wa$(window).scroll(function(){
				self.setMenuFixed(!self.isMenuVisible());
			});
			this.isUsed = true;
		}
	},

}


wa$( document ).ready(function() {
	wa$(window).bind("load", function() {
		wa$(".wa-compmenu").each(function(){
			var $menu = wa$(this);
			var tmp = new MenuShaper($menu.attr("id"));
			tmp.handle();
			if($menu.find(".navbar").hasClass("wa-always-on-top") && $menu.parent().css("display")!=="none")
				MenuFixedHandler.handle(tmp);

			//Menu visible uniquement apres gestion
 			//wa$(this).css('visibility','visible').hide().fadeIn(100);
			wa$(this).css('visibility','visible');
			
		});

		/*Gestion niveau 3 sous menu sur mobile*/
		wa$(".dropdown-submenu").click(function( event ) {
			event.stopPropagation();
			wa$(this).find(".dropdown-menu").toggle();
		});



		/*Fermeture menu au clic*/
		wa$(".navbar-header>a.navbar-brand,.navbar-collapse>ul>li>a").click(function( event ) { //Level 0
			if(  ResponsiveBootstrapToolkit.is('xs') || wa$(this).closest(".wa-compmenu").hasClass("wa-menu-small") )
			{
				if(wa$(this).siblings("ul").length===0)
				{
					wa$(this).closest(".navbar").find(".navbar-collapse").removeClass("in");
					//console.log("level 0");
				}
			}
		});
		wa$(".dropdown-menu a").click(function( event ) { // Level 1
			if(  ResponsiveBootstrapToolkit.is('xs') || wa$(this).closest(".wa-compmenu").hasClass("wa-menu-small") )
			{
				if(wa$(this).siblings("ul").length===0)
				{
					//console.log("level 1");
					wa$(this).closest("li.dropdown").removeClass("open");
					wa$(this).closest(".navbar-collapse").removeClass("in");
				}
				else
					event.preventDefault();//Floating menu small
			}
			else //if >XS ans !menu-small
			{
				if(wa$(this).siblings("ul").length===0)
					wa$(this).closest("li.dropdown").removeClass("open");
				else
					event.preventDefault();//Floating menu
			}
		});

		wa$(".dropdown-submenu .dropdown-menu a").click(function( event ) {//Level 2
			if(ResponsiveBootstrapToolkit.is('xs') || wa$(this).closest(".wa-compmenu").hasClass("wa-menu-small"))
			{
				//console.log("level 2");
				wa$(this).closest(".dropdown-menu").hide();
				wa$(this).closest("li.dropdown").removeClass("open");
				wa$(this).closest(".navbar-collapse").removeClass("in");
			}
		});

		bindSmoothScroll(".wa-compmenu"); // bind smooth scroll menu

		//binding search toolbar
		bindSearch();

	});

});