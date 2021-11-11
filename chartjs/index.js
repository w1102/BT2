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


let step = 0.5
let pointRadius = 1.0
let Linecolor = '#ff479c'
let graphSelected = 'bacHai'

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
			input.value = String(step)
			break
		case 'pointRadius':
			input.value = String(pointRadius)
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
	
	$('.coeff-form input').each((idx, coeff) => {
		coeff.disabled = !coeffDics[graphSelected].includes(coeff.parentElement.id)
	})

	if (step === 0) return

	switch (graphSelected) {
		case 'bacHai':
			quadratic(a, b, c, step, chart, Linecolor)
			break
		case 'bacBa':
			cubic(a, b, c, d, step, chart, Linecolor)
			break
		case 'bacBon':
			quartic(a, b, c, step, chart, Linecolor)
			break
		case 'logarit':
			logarit(a, step, chart, Linecolor)
			break
		case 'sin':
			sinFunction(a, step, chart, Linecolor)
			break
		case 'cos':
			cosFunction(a, step, chart, Linecolor)
			break
		case 'tan':
			tanFunction(a, step, chart, Linecolor)
	}

	chart.options.elements.point.radius = pointRadius
	
	
	for (const dataset of chart.data.datasets) {
		dataset.cubicInterpolationMode = 'monotone'
		dataset.tension = 0.4
	}

	chart.update()
}




// vẽ chart lần đầu 
let drew = false
$(window).on('headerLoaded', () => {drawChart(); drew = true})
setTimeout(() => {
	if (drew === false) {
		console.log('force draw chartjs')
		drawChart()
	}
}, 1000)





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
			event.target.value = step;
			break;
		case 'pointRadius':
			pointRadius = 0;
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
			pointRadius = parseFloat(event.target.value)
			break
		case 'step':
			step = parseFloat(event.target.value)
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
			step += 0.1
			event.target.parentElement.querySelector('input').value = step.toFixed(1)
			break 
		case 'step-decrease':
			step -= step >= 0.2 ? 0.1 : 0
			event.target.parentElement.querySelector('input').value = step.toFixed(1)
			break 
			
		case 'point-increase':
			pointRadius += 0.5
			event.target.parentElement.querySelector('input').value = pointRadius.toFixed(1)
			break 
		case 'point-decrease':
			pointRadius -= pointRadius >= 0.5 ? 0.5 : 0
			event.target.parentElement.querySelector('input').value = pointRadius.toFixed(1)
			break 
	}
	
	drawChart()
})




// sự kiện click chọn màu
$('.colorpicker').click(event => {
	Linecolor = '#' + event.target.id
	drawChart()
})


// sự kiện click chọn loại đồ thị
$('.graphSelect').click(event => {
	
	$('.graphSelect').removeClass('active')
	$('#' + event.target.id).addClass('active')
	
	graphSelected = event.target.id
	drawChart()
	
})
