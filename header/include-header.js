import * as JQuery from '/modules/jquery.min.js'

$(document).ready(() => {
	
	
	$('#header').load('/header/header.html', (response, status, xhr) => {
				
		switch ( $('#header').attr("data-active") ) {
			case 'calc' : $('#calc').addClass("active"); break;
			case 'chart': $('#chart').addClass("active"); break;
		}
		
		$('#root').innerHeight( window.innerHeight - $('#header').innerHeight()).toggle('fast')
		
		
		setTimeout(() => {
			
			//$('#root').innerHeight( window.innerHeight - $('#header').innerHeight()).toggle('fast')
					
			
			//$('#root').innerHeight( window.innerHeight - $('#header').innerHeight()).css('visibility', 'visible')
			
			
			setTimeout(() => {
				
				//$('#root').innerHeight( window.innerHeight - $('#header').innerHeight())
				
				
	
				
				//$('#root').toggle('slow')
				
				
			}, 800)
		}, 500)
		
	})
})