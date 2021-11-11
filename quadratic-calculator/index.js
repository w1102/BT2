import quadraticCalculator from './QuadraticCalculator.js'

console.log('hi')

let fontSize = 16
let fixed = 2

let a = 2
let b = 0
let c = 0

let result = ''


// event nhấn button
for (const button of document.querySelectorAll('button')) button.addEventListener('click', event => {

	const randomCoeff = randBothNegative => {
		let negative = Math.random() < 0.5 && randBothNegative ? -1 : 1
		return (Math.random() * 20 * negative).toFixed(2)
	}

	if (event.target.id === 'goToChartjs') {
		let hashURL = `#${a},${b},${c}`
		window.open("/chartjs/" + hashURL, '_blank').focus();
	}

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
			fontSize += event.target.id === 'font-increase' ? 1 : (fontSize >= 2 ? -1 : 0)
			event.target.parentElement.querySelector('input').value = fontSize
			document.querySelector('.result-container').style.fontSize = fontSize + 'px'
			break
		case 'fixed':
			fixed += event.target.id === 'fixed-increase' ? 1 : (fixed >= 2 ? -1 : 0)
			event.target.parentElement.querySelector('input').value = fixed
			break

	}

	printResult()
})



// event input thay đổi
for (const input of document.querySelectorAll('input')) input.addEventListener('input', event => {
	
	event.target.value = event.target.value.replace(/[^-0-9.]/g, '')

	if (event.target.value === '')
		return


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


// print kết quả
const printResult = () => {

	result = quadraticCalculator(parseFloat(a), parseFloat(b), parseFloat(c), fixed)

	document.querySelector('.result-container p').textContent = result
	MathJax.typeset()
}


// nạp hệ số lần đầu
for (const input of document.querySelectorAll('.sidebar input')) {
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
}