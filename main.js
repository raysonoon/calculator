let num1, num2 = 0;
let opr = "";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Error! Cannot divide by 0";
    } else {
        return num1 / num2;
    }
}

function operate(num1, num2, opr) {
    let result = 0;
    switch (opr) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
    }
    
    return result;
}

console.log(add(1, 3));
console.log(subtract(4, 2));
console.log(multiply(3, 4));
console.log(divide(10, 5));
console.log(divide(3, 0));
