let num1, num2 = 0;
let opr = "";
const numBtns = document.querySelectorAll(".num-buttons");
const oprBtns = document.querySelectorAll(".opr-buttons");
const allClearBtn = document.querySelector("#allClearBtn");
const clearBtn = document.querySelector("#clearBtn");
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

    // No operator
    if (!operator) {
        return displayResult.value;
    }
    else
        return operate(numArr[0], numArr[1], operator);
}

function removeLast(str) {
    let charArr = str.split("");
    charArr.splice(-1, 1);
    const removedStr = charArr.join("");
    return removedStr;
}

function containsOpr(str) {
    return str.includes("+") || str.includes("-")
        || str.includes("*") || str.includes("/");
}

numBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        const buttonValue = event.target.value;
        console.log(buttonValue);
        if (buttonValue != undefined)
            displayResult.value == 0 ? displayResult.value = buttonValue : displayResult.value += buttonValue;
    });
});

oprBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        // operate result first if there is operator and second num
        if (containsOpr(displayResult.value) && !displayResult.value.endsWith(event.target.id)) {
            displayResult.value = operateResult();
        }

        if (event.target.id === "=") {
            displayResult.value = operateResult();
        } else {
            displayResult.value += event.target.id;
        }
    });
});

//TODO 1: implement all-clear button
allClearBtn.addEventListener("click", () => {
    displayResult.value = 0;
});

//TODO 2: implement clear button
clearBtn.addEventListener("click", () => {
    displayResult.value = removeLast(displayResult.value);
});

console.log(add(1, 3));
console.log(subtract(4, 2));
console.log(multiply(3, 4));
console.log(divide(10, 5));
console.log(divide(3, 0));
