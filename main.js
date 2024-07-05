let num1, num2 = 0;
let opr = "";
const numBtns = document.querySelectorAll(".middle-buttons");
const zeroBtn = document.querySelector("#zeroBtn");
const oprBtns = document.querySelectorAll(".right-buttons");
const allClearBtn = document.querySelector("#allClearBtn");
const delBtn = document.querySelector("#delBtn");
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
    // Split by non-digits, filter out empty strings, and convert each element to numbers
    const numArr = displayResult.textContent
        .split(/\D/g)
        .filter(num => num !== "")
        .map(num => +num);
    console.log(numArr);
    console.log(numArr.length);
    const oprArr = displayResult.textContent.split(/\d/g).filter(opr => opr !== ""); // Split by digits
    console.log(oprArr);
    const operator = oprArr.filter(opr => opr).toString();
    console.log(operator);
    
    // Operate result only if there is an operator and a pair of numbers
    if (operator && numArr.length == 2) {
        return operate(numArr[0], numArr[1], operator);
    } else {
        return numArr + operator;
    }
}

function removeLast(str) {
    const charArr = str.split("");
    charArr.splice(-1, 1);
    let removedStr = charArr.join("");
    console.log(removedStr);
    // Set back default value to 0 if no digits/operators to remove
    if (removedStr === "")
        removedStr = "0";
    return removedStr;
}

function containsOpr(str) {
    const operators = ["+", "-", "*", "/"];
    return operators.some(opr => str.includes(opr));
}

function endsWithNumber(str) {
    return /\d$/.test(str);
}

numBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        const buttonValue = event.target.value;
        console.log(buttonValue);
        if (buttonValue != undefined)
            displayResult.textContent == 0 ? displayResult.textContent = buttonValue : displayResult.textContent += buttonValue;
    });
});

zeroBtn.addEventListener("click", () => {
    if (displayResult.textContent !== "0")
        displayResult.textContent += "0";
});

oprBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        // operate result first if there is operator and second num
        if (containsOpr(displayResult.textContent) && endsWithNumber(displayResult.textContent)) {
            displayResult.textContent = operateResult();
        }

        if (event.target.id === "=") {
            // operate result as usual
            displayResult.textContent = operateResult();
        } else {
            // add operator if no operator
            if (!containsOpr(displayResult.textContent)) {
                displayResult.textContent += event.target.id;
            }
        }
    });
});

//TODO 1: implement all-clear button
allClearBtn.addEventListener("click", () => {
    displayResult.textContent = 0;
});

//TODO 2: implement del button
delBtn.addEventListener("click", () => {
    displayResult.textContent = removeLast(displayResult.textContent);
});
