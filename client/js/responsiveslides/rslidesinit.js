function rsliderInit (idControl) {

	// Slideshow 3 - "#slider3"
  console.log(idControl);
	$(idControl).responsiveSlides({
		auto: false,
		pager: false,
		nav: true,
		speed: 500,
		maxwidth: 800,
		namespace: "large-btns"
	});
}