import quadraticCalculator from './QuadraticCalculator.js'

import * as JQuery from '/modules/jquery.min.js'

let fontSize = 16
let fixed = 2

let a = 2
let b = 0
let c = 0

let result = ''


/* ================= =================  chạy 1 lần khi load web ================= ================= =================  */



// hiển thị kết quả dưới dạng latex
const printResult = () => {

	result = quadraticCalculator(parseFloat(a), parseFloat(b), parseFloat(c), fixed)

	document.querySelector('.result-container p').textContent = result
	MathJax.typeset()
}


// nạp hệ số lần đầu
$('.sidebar input').each((idx, input) => {
	switch (input.parentElement.id) {
		case 'a-coeff':
			input.value = a
			break
		case 'b-coeff':
			input.value = b
			break
		case 'c-coeff':
			input.value = c
			break
		case 'font-size':
			input.value = fontSize
			break
		case 'fixed':
			input.value = fixed
			break
	}

	document.querySelector('.result-container').style.fontSize = fontSize + 'px'
	printResult()
})






/* ================= =================  DOM event ================= ================= =================  */


// sự kiện nhấn button
$('button').click(event => {
	
	// hàm random
	const randomCoeff = randBothNegative => {
		let negative = Math.random() < 0.5 && randBothNegative ? -1 : 1
		return (Math.random() * 20 * negative).toFixed(2)
	}
	
	// button vẽ đồ thị
	if (event.target.id === 'goToChartjs') {
		let hashURL = `#${a},${b},${c}`
		window.location.href = '/chartjs/' + hashURL
	}
	
	// button khác
	switch (event.target.parentElement.id) {
		case 'a-coeff':
			a = randomCoeff(false)
			event.target.parentElement.querySelector('input').value = a
			break
		case 'b-coeff':
			b = randomCoeff(true)
			event.target.parentElement.querySelector('input').value = b
			break
		case 'c-coeff':
			c = randomCoeff(true)
			event.target.parentElement.querySelector('input').value = c
			break
			
		case 'font-size':
			if (event.target.id === 'font-increase') fontSize += 1
			else fontSize -=  fontSize >= 2 ? 1 : 0
			event.target.parentElement.querySelector('input').value = fontSize
			document.querySelector('.result-container').style.fontSize = fontSize + 'px'
			break
		
		
		case 'fixed':
			if (event.target.id === 'fixed-increase') fixed += 1
			else fixed -= fixed >= 2 ? 1 : 0
			event.target.parentElement.querySelector('input').value = fixed
			break 

	}

	printResult()
	
	
	
})





// khi user xóa trống input mà không điền gì, sẽ tự động thêm số 0
$('input').focusout(event => {
	
	console.log('out')
	
	if (event.target.value !== '') return
	
	event.target.value = 0
	switch (event.target.parentElement.id) {
		case 'a-coeff':
			a = 0
			break 
		case 'b-coeff':
			b = 0
			break 
		case 'c-coeff':
			c = 0
			break 
	}
	
	printResult()
})




// sự kiện thay đổi form input
$('input').on('input', event => {
	
	//regex loại bỏ kí tự không phải chữ số
	event.target.value = event.target.value.replace(/[^-0-9.]/g, '')
	
	if (event.target.value === '') return
	
	switch (event.target.parentElement.id) {
		case 'a-coeff':
			a = parseFloat(event.target.value)
			break
		case 'b-coeff':
			b = parseFloat(event.target.value)
			break
		case 'c-coeff':
			c = parseFloat(event.target.value)
			break
		case 'font-size':
			fontSize = parseInt(event.target.value)
			document.querySelector('.result-container').style.fontSize = fontSize + 'px'
			break
		case 'fixed':
			fixed = parseInt(event.target.value)
			break
	}

	printResult()
})


