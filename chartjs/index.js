import quadratic from './modules/quadratic.js'
import cubic from './modules/cubic.js'
import quartic from './modules/quartic.js'
import logarit from './modules/logarit.js'
import { sinFunction, cosFunction, tanFunction } from './modules/trigonometric.js'

import * as JQuery from '/modules/jquery.min.js'

let coeffDics = {
	bacHai	: ['a-coeff', 'b-coeff', 'c-coeff'],
	bacBa	: ['a-coeff', 'b-coeff', 'c-coeff', 'd-coeff'],
	bacBon	: ['a-coeff', 'b-coeff', 'c-coeff'],
	logarit	: ['a-coeff'],
	sin: ['a-coeff'],
	cos: ['a-coeff'],
	tan: ['a-coeff']
}

let settings

const store = localStorage.getItem('settings')
settings = store !== null ? JSON.parse(store) : {
	step: 0.5,
	pointRadius: 1.0,
	Linecolor: '#ff479c',
	graphSelected: 'bacHai'
}



const saveSettings = () => localStorage.setItem('settings', JSON.stringify(settings))



let a = 2
let b = 0
let c = 0
let d = 0


const hashURL = window.location.hash.substring(1)
if (hashURL !== '') {
	const coeffs = hashURL.split(',')
	a = parseFloat(coeffs[0])
	b = parseFloat(coeffs[1])
	c = parseFloat(coeffs[2])
}


/* ================= =================  chạy 1 lần khi load web ================= ================= =================  */

/* nạp hệ số vào input khi load web */
$('input').each((idx, input) => {
	switch (input.parentElement.id) {
		case 'a-coeff':
			input.value = String(a)
			break
		case 'b-coeff':
			input.value = String(b)
			break
		case 'c-coeff':
			input.value = String(c)
			break
		case 'd-coeff':
			input.value = String(d)
			break
		case 'step':
			//input.value = String(step)
			input.value = String(settings.step.toFixed(1))
			break
		case 'pointRadius':
			//input.value = String(pointRadius)
			input.value = String(settings.pointRadius.toFixed(1))
			break
	}
})


/* tạo chart */
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
	type: 'scatter',
	data: [],
	options: {
		maintainAspectRatio: false,
		responsive: true,
	},
})

/* hàm cập nhật chart   */
const drawChart = () => {
	
	// disable khung input hệ số không cần dùng
	$('.coeff-form input').each((idx, coeff) => {
		coeff.disabled = !coeffDics[settings.graphSelected].includes(coeff.parentElement.id)
	})

	if (settings.step === 0) return

	switch (settings.graphSelected) {
		case 'bacHai':
			quadratic(a, b, c, settings.step, chart, settings.Linecolor)
			break
		case 'bacBa':
			cubic(a, b, c, d, settings.step, chart, settings.Linecolor)
			break
		case 'bacBon':
			quartic(a, b, c, settings.step, chart, settings.Linecolor)
			break
		case 'logarit':
			logarit(a, settings.step, chart, settings.Linecolor)
			break
		case 'sin':
			sinFunction(a, settings.step, chart, settings.Linecolor)
			break
		case 'cos':
			cosFunction(a, settings.step, chart, settings.Linecolor)
			break
		case 'tan':
			tanFunction(a, settings.step, chart, settings.Linecolor)
	}

	chart.options.elements.point.radius = settings.pointRadius
	
	// nội suy đường cong
	for (const dataset of chart.data.datasets) {
		dataset.cubicInterpolationMode = 'monotone'
		dataset.tension = 0.4
	}

	chart.update()
}




// vẽ chart lần đầu khi load web
let drew = false

setTimeout(() => {
	if (drew === false) {
		console.warn('Header loading timeout, force draw chart')
		drawChart()
	}
}, 1000)

$(window).on('headerLoaded', () => {drawChart(); drew = true})







/* ================= =================  DOM event ================= ================= =================  */



// khi user xóa trống input mà không điền gì, sẽ tự động thêm số 0
$('input').focusout(event => {
	
	if (event.target.value !== '') return
	
	event.target.value = 0
	switch (event.target.parentElement.id) {
		case 'a-coeff':
			a = 0;
			break;
		case 'b-coeff':
			b = 0;
			break;
		case 'c-coeff':
			c = 0;
			break;
		case 'd-coeff':
			d = 0;
			break;
		case 'step':
			//event.target.value = step;
			event.target.value = settings.step
			saveSettings()
			break;
		case 'pointRadius':
			//pointRadius = 0;
			settings.pointRadius
			saveSettings()
			break;
	}
	
	drawChart()
})



// sự kiện thay đổi form input
$('input').on('input', event => {
		
	// regex xóa ký tự không phải chữ số
	event.target.value = event.target.value.replace(/[^-0-9.]/g, '')
	
	if (event.target.value === '') return
	
	switch (event.target.parentElement.id) {
		case 'pointRadius':
			//pointRadius = parseFloat(event.target.value)
			settings.pointRadius = parseFloat(event.target.value)
			saveSettings()
			break
		case 'step':
			//step = parseFloat(event.target.value)
			settings.step = parseFloat(event.target.value)
			saveSettings()
			break
		case 'a-coeff':
			a = parseFloat(event.target.value)
			break
		case 'b-coeff':
			b = parseFloat(event.target.value)
			break
		case 'c-coeff':
			c = parseFloat(event.target.value)
			break
		case 'd-coeff':
			d = parseFloat(event.target.value)
			break
	}
	
	drawChart()
})



// sự kiện click button tăng giảm
$('button').click(event => {
	switch (event.target.id) {
		case 'step-increase':
			settings.step += 0.1
			saveSettings()
			event.target.parentElement.querySelector('input').value = settings.step.toFixed(1)
			break 
		case 'step-decrease':
			settings.step -= settings.step >= 0.2 ? 0.1 : 0
			saveSettings()
			event.target.parentElement.querySelector('input').value = settings.step.toFixed(1)
			break 
			
		case 'point-increase':
			settings.pointRadius += 0.5
			saveSettings()
			event.target.parentElement.querySelector('input').value = settings.pointRadius.toFixed(1)
			break 
		case 'point-decrease':
			settings.pointRadius -= settings.pointRadius >= 0.5 ? 0.5 : 0
			saveSettings()
			event.target.parentElement.querySelector('input').value = settings.pointRadius.toFixed(1)
			break 
	}
	
	console.log(settings.pointRadius)
	
	drawChart()
})




// sự kiện click chọn màu
$('.colorpicker').click(event => {
	settings.Linecolor = '#' + event.target.id
	saveSettings()
	drawChart()
})


// sự kiện click chọn loại đồ thị
$('.graphSelect').click(event => {
	
	$('.graphSelect').removeClass('active')
	$('#' + event.target.id).addClass('active')
	
	settings.graphSelected = event.target.id
	saveSettings()
	drawChart()
	
})
