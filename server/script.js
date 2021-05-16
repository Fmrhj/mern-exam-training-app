class FizzBuzzSolver {
	checkNumber(x, y){
		return (x % y == 0)
	}
	print(message){
		console.log(message);
	}
	execute(n){
		for (let i=1; i<=n; i++){
			if(this.checkNumber(i, 5) && this.checkNumber(i, 3)){
				this.print('Eva');
			} else if(this.checkNumber(i, 3)){
				this.print('Fizz');
			} else if(this.checkNumber(i,5)){
				this.print('Buzz');
			} else {
				this.print(i);
			}
		}
	}
}

new FizzBuzzSolver().execute(200);