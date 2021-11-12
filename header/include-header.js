import * as JQuery from '/modules/jquery.min.js'


$(document).ready(() => {

	$('#header').load('/header/header.html', (response, status, xhr) => {
				
		switch ( $('#header').attr("data-active") ) {
			case 'calc' : $('#calc').addClass("active"); break;
			case 'chart': $('#chart').addClass("active"); break;
		}
		
	
		const headerHeight = $(window).innerWidth() <= 575 ? 56 : 65
		const resizeRoot = () => {
			
			// console.log($('#header').innerHeight(), headerHeight)
		
			if ($('#header').innerHeight() < headerHeight) setTimeout(resizeRoot, 5)
			else {
				
				// console.log($('#header').innerHeight())
				
				const headerLoaded = new CustomEvent('headerLoaded')
				$('#root').innerHeight( window.innerHeight - headerHeight).slideToggle('fast', () => window.dispatchEvent(headerLoaded))
			}
		}
		
		resizeRoot()
		
		
	})
})