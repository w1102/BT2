import * as JQuery from '/modules/jquery.min.js'

$(document).ready(() => {
	
	
	$('#header').load('/header/header.html', (response, status, xhr) => {
				
		switch ( $('#header').attr("data-active") ) {
			case 'calc' : $('#calc').addClass("active"); break;
			case 'chart': $('#chart').addClass("active"); break;
		}
		
		setTimeout(() => {
			const headerLoaded = new CustomEvent('headerLoaded')
			$('#root').innerHeight( window.innerHeight - $('#header').innerHeight()).toggle('fast', () => window.dispatchEvent(headerLoaded))
		}, 250)
		
	})
})