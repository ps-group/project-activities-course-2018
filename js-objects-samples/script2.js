const Calculator = function() {
    this.a = 0;
    this.b = 0;

    this.read = function() {
        this.a = parseInt(prompt('Enter a', 0), 10) || 0;
        this.b = parseInt(prompt('Enter b', 0), 10) || 0;
    };
    
    this.sum = function() {
        return this.a + this.b;
    };

    this.mul = function() {
        return this.a * this.b;
    }
}

function main() {
    const calc = new Calculator();
    calc.read();
    console.log('sum = ', calc.sum());
    console.log('mul = ', calc.mul());
}

main();