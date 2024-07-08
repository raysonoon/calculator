let num1, num2 = 0;
let opr = "";
const numBtns = document.querySelectorAll(".middle-buttons");
const oprBtns = document.querySelectorAll(".right-buttons");
const allClearBtn = document.querySelector("#allClearBtn");
const delBtn = document.querySelector("#delBtn");
const zeroBtn = document.querySelector("#zeroBtn");
const dotBtn = document.querySelector("#dotBtn");
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
        alert("Math Error :(");
        return displayResult.textContent;
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
    // Split non-digits & non-decimal pts, filter out empty strings, and convert each element to numbers
    const numArr = displayResult.textContent
        .split(/[^0-9.]+/)
        .filter(num => num !== "")
        .map(num => +num);
    console.log(numArr);
    const oprArr = displayResult.textContent.split(/[0-9.]+/).filter(opr => opr !== ""); // Split by digits or .
    console.log(oprArr);

    // Operate negative result only if there are 2 operators and a pair of numbers
    if (oprArr.length == 2 && numArr.length == 2) {
        console.log("Negative operation");
        return operate(-numArr[0], numArr[1], oprArr[1]);
    // Operate positive result if there are 1 operator and a pair of numbers
    } else if (oprArr.length == 1 && numArr.length == 2) {
        console.log("Positive operation");
        return operate(numArr[0], numArr[1], oprArr[0]);
    } else {
        // Negative number only
        return displayResult.textContent;
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

function containsTwoDots(str) {
    const dotCount = str.split(".").length - 1;
    return dotCount === 2;
}

function endsWithNumber(str) {
    return /\d$/.test(str);
}

function getLastNum(str) {
    const lastNum = str.split(/[^0-9.]+/).pop();
    console.log(lastNum);
    return lastNum;
}

function isNegativeFirstNum(str) {
    if (str.startsWith("-"))
        return true;
}

numBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        const buttonValue = event.target.value;
        console.log(buttonValue);
        resultLength = displayResult.textContent.length;
        if (buttonValue != undefined) {
            if (displayResult.textContent === "0") {
                displayResult.textContent = buttonValue;
            } else if (getLastNum(displayResult.textContent) === "0") {
                // Remove 0 and replace by non-0 digit
                displayResult.textContent = displayResult.textContent.slice(0, resultLength - 1);
                displayResult.textContent += buttonValue;
            } else {
                displayResult.textContent += buttonValue;
            }
        }
    });
});

zeroBtn.addEventListener("click", () => {
    if (getLastNum(displayResult.textContent) !== "0")
        displayResult.textContent += "0";
});

oprBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        // operate result first if there is operator and second num or decimal point
        if (containsOpr(displayResult.textContent) && (endsWithNumber(displayResult.textContent) || containsTwoDots(displayResult.textContent))) {
            console.log("Operating result...");
            displayResult.textContent = operateResult();
        }
        // add /, x, -, + operator if no operator
        if ((!containsOpr(displayResult.textContent) || isNegativeFirstNum(displayResult.textContent)) && event.target.id !== "=") {
            displayResult.textContent += event.target.id;
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

dotBtn.addEventListener("click", () => {
    if (!getLastNum(displayResult.textContent).includes(".")) {
        if (endsWithNumber(displayResult.textContent)) {
            displayResult.textContent += ".";
        } else {
            displayResult.textContent += "0.";
        }
    }
});