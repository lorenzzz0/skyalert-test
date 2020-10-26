exports.maskify = (data) => {
	try{
		if( typeof(data) != "string" || data.length == 0)
			throw new Error('Invalid input');
		if( data.length < 7 )
			return data;
		else{
			var length 		= data.length
			var positions 	= [0,length-1,length-2,length-3, length-4 ];
			var newText 	= "";

			for( var i=0;i<data.length;i++ ){
				if(positions.includes( i )){
					newText += data[i]
				}else{
					newText += '*';
				}
			}
		}
		return newText;

	}catch(error) {
		return error;
	}
}

exports.numberToOrdinal = (data) => {
	try{
		if( typeof(data) !== "number" || data < 0)
			throw new Error('Invalid input');

		var stringNumber	= data.toString();
		var specialData 	= ['11','12','13'];
		if( specialData.includes( stringNumber ) )
			return stringNumber+'th';
		else{
			switch (true) {
				case stringNumber == '0':
					return '0'
					break;
				case /1$/.test(stringNumber):
					return stringNumber+"st"
					break;
				case /2$/.test(stringNumber):
					return stringNumber+"nd"
					break;
				case /3$/.test(stringNumber):
					return stringNumber+"rd"
					break;
				default:
					return stringNumber+'th';
					break;
			}
		}

	}catch(error) {
		return error;
	}
}

function operation(operation, a, b){
	switch (operation) {
		case '+':
			return a+b
			break;
		case '-':
			return a-b
			break;
		case '*':
			return a*b
			break;
		case '/':
			return a/b
			break;
	}
}

exports.calculate = (data) => {
	try{
		if( typeof(data) !== "string" || data.length < 4 || !(  /^[0-9\s+\-\*\/]*$/.test(data) ) ){
			if( data.length == 1 &&  /^[0-9]*$/.test( data ))
				return data;
			throw new Error('Invalid input');
		}
		var numbersStack = [];

		for( var i=0;i<data.length;i++ ){
			if( /^[0-9]*$/.test( data[i] )){
				numbersStack.push( parseInt( data[i] ) )

			}else if( data[i] != " " ){
				var result = operation( data[i], numbersStack[numbersStack.length - 1], numbersStack[numbersStack.length -2]  );

				numbersStack.pop();
				numbersStack.pop();
				numbersStack.push( result );
			}
		}
		return numbersStack[numbersStack.length - 1];
	}catch(error) {
		return error;
	}
}