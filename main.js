let num1, num2 = 0;
let opr = "";
const numBtns = document.querySelectorAll(".num-buttons");
const oprBtns = document.querySelectorAll(".opr-buttons");
const displayResult = document.querySelector("#result");

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

function operateResult() {
    const numArr = displayResult.value.split(/\D/g).map(num => +num); // Split by non-digits and convert each element to numbers
    console.log(numArr);
    const oprArr = displayResult.value.split(/\d/g); // Split by digits
    console.log(oprArr);
    const operator = oprArr.filter(opr => opr).toString();
    console.log(operator);
    if (!operator)
        return displayResult.value;
    else
        return operate(numArr[0], numArr[1], operator);
}

numBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        const buttonValue = event.target.value;
        console.log(buttonValue);
        displayResult.value == 0 ? displayResult.value = buttonValue : displayResult.value += buttonValue;
    });
});

oprBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        switch (event.target.id) {
            case "add":
                displayResult.value += "+";
                break;
            case "subtract":
                displayResult.value += "-";
                break;
            case "multiply":
                displayResult.value += "*";
                break;
            case "divide":
                displayResult.value += "/";
                break;
            case "equal":
                displayResult.value = operateResult();
        }
    });
});

//TODO 1: implement all-clear button

//TODO 2: implement clear button

console.log(add(1, 3));
console.log(subtract(4, 2));
console.log(multiply(3, 4));
console.log(divide(10, 5));
console.log(divide(3, 0));
