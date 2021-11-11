// Hàm tính PT bậc hai và trả về kết quả dưới dạng công thức latex
const quadraticCalculator = (a, b, c, fixed) => {
	
	let dispFraction = true
	
	
	const dispS = sign => sign >= 0 ? ' + ' : '	'
	
	const dispFloat = (float, withSign, noFixed) => {
		if (float == parseInt(float) || float == 0) return (withSign ? dispS(float): '') + float
		return (withSign ? dispS(float): '') + (noFixed ? float : float.toFixed(fixed))
	}
	
	const dispFrac = (float, withSign) => {
		if (float == parseInt(float) || float == 0) return (withSign ? dispS(frac.s): '') + float
		
		let frac = math.fraction(float)
		return (withSign ? dispS(frac.s): '') + `\\cfrac{${frac.n}}{${frac.d}}`
	}
	
	

	let delta = b*b - 4*a*c

	let result = `$$\\begin{align} f(x) &= ${a}x^2`
		result += dispFloat(b, true, true) + 'x'
		result += dispFloat(c, true, true) + '&&= 0\\\\'
	

	
	
	if (a === 0) {
		result += '&\\Leftrightarrow' + dispFloat(b) + 'x' + dispFloat(c, true) + ' &&= 0\\\\'

		if (b !== 0)
			result += '&\\Leftrightarrow x &&= ' + dispFloat(-c/b) +' \\end{align}$$'


		else {
			if (c !== 0) 
				result += '&\\Rightarrow \\text{Hệ vô nghiệm}\\end{align}$$' 
			else
				result += '&\\Rightarrow \\text{Hệ vô số nghiệm}\\end{align}$$' 
		}
	} else {

		result += '&\\Rightarrow \\Delta = b^2 - 4ac &&= '
		result += dispFraction ? dispFrac(delta) : delta.toFixed(fixed)
		result += '\\\\'
		
		
		if (delta > 0) {
			
			let x1 = -(b + Math.sqrt(delta))/(2.0*a)
			let x2 = -(b - Math.sqrt(delta))/(2.0*a)
		
			result += '&\\Rightarrow \\Delta > 0\\\\ \\\\'
			
			result += 'f(x) &\\Leftrightarrow \\begin{cases}x_1 &&=  \\cfrac{-b + \\sqrt{\\Delta}}{2a}\\\\ \\\\'
			result += 'x_2 &&= \\cfrac{-b - \\sqrt{\\Delta}}{2a}\\end{cases}\\\\ \\\\'
			
			result += '&\\Leftrightarrow \\begin{cases}x_1 &&= ' + dispFrac(x1) + '\\\\ \\\\'
			result += 'x_2 &&= ' +  dispFrac(x2) + '\\end{cases}\\\\ \\\\ '
			
			if (x1 !== parseInt(x1) && x2 !== parseInt(x2)) {
				result += '&\\Leftrightarrow \\begin{cases}x_1 &&= ' + dispFloat(x1) + '\\\\ \\\\'
				result += 'x_2 &&= ' + dispFloat(x2)
				result += '\\end{cases}'
			}
			
			result += '\\end{align}$$'

			
		} else if (delta === 0) {
			let x = -b / (2.0*a)
			
			result += '&\\Rightarrow \\Delta = 0\\\\'
			result += 'f(x) &\\Leftrightarrow x_1 = x_2 &&= \\frac{-b}{2a} = '
			result += dispFraction ? dispFrac(x) : x.toFixed(fixed)  
			result += '\\end{align}$$'
			
		} else {
			result += '&\\Rightarrow \\Delta < 0\\\\' 
			result += '&\\Rightarrow \\text{Hệ vô nghiệm}'
			result += '\\end{align}$$'
		}
			
	}
	
	return result	
}

export default quadraticCalculator