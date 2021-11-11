import * as JQuery from '/modules/jquery.min.js'

$(document).ready(() => {
	
	
	$('#header').load('/header/header.html', (response, status, xhr) => {
				
		switch ( $('#header').attr("data-active") ) {
			case 'calc' : $('#calc').addClass("active"); break;
			case 'chart': $('#chart').addClass("active"); break;
		}
		
		setTimeout(() => {
			
			$('#root').innerHeight( window.innerHeight - $('#header').innerHeight()).slideToggle('fast', () => {
							
				$('#root').innerHeight( window.innerHeight - $('#header').innerHeight())
				window.dispatchEvent(new CustomEvent('headerLoaded'))
			})
		}, 350)
		
	})
})