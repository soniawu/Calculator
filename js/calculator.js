
// global variables
let opd_1; // operand 1
let opd_2; // operand 1
let opr;   // operator
let numStr = ""; // the number input as a string 
let operator = 0; // operator for an action 0=none, 1=+, 2=-, 3=X, 4=/
let newOper = true; // indicator of new operation starts
let onOpd_2 = false; // indicator of operand 2 started
let decmOn = false;  // indicator if decimal point is already entered
let isPos = true;    // indicator for the current number is positive

const displayContents = document.querySelector("#display>p");

/* 
    Event listeners for all number buttons
*/ 
const numElms = document.querySelectorAll(".num");
for (let i = 0; i < numElms.length; i++) {
    numElms[i].addEventListener("click", () => {
        if (newOper) {
            console.log("This is new operation");
            displayContents.innerHTML = "";
            newOper = false;
        }
        /* 
            if operator is already entered and 2nd operand indicator is false,
            that means this is the first number for the 2nd operand. clear out 
            the display where it still has the 1st operand, to display the 2nd one.
        */
        if ((operator != 0) && (!onOpd_2)) {
            opd_1 = setOperand();
            numStr = "";
            onOpd_2 = true;
            displayContents.innerHTML = "";
        }

    let n = numElms[i].innerHTML;
    displayContents.innerHTML += n;
    numStr += n;
    })
}

/*
    Event listener for back one button
    Delete the last number from display and the numStr

    !!! should think about what to do if operator is entered
    and backOne key is clicked. Currently, backing the last 
    digit of operand 1. 
*/

const backOne = document.querySelector("#backOne");
backOne.addEventListener("click", () => {
    numStr = numStr.substring(0,(numStr.length -1));
    displayContents.innerHTML = numStr;
});

/* 
    Event listener for AC button.
    Empty the display and numStr
*/ 
const cancelAll = document.querySelector("#cancel");
cancelAll.addEventListener("click", () => {
    resetGlob();
});

/*
    Event listeners for operators
*/
const numOprt = document.querySelectorAll(".operator");
for (let i = 0; i < numOprt.length; i++) {
    numOprt[i].addEventListener("click", () => {
        /*
            if operator is entered before and operand 2 had started,
            an operator is clicked again, that means user is doing 
            a seriers operation.

            need to calculate what is entred before and take the result as 
            the operand 1 and continue.
        */
        if ((operator != 0) && (onOpd_2)) {
            opd_2 = setOperand();
            let result = operate(opd_1, opd_2, operator);
            if (typeof result === "number") {
                numStr = result.toString();
                console.log(`numStr is ${numStr}`);
                displayContents.innerHTML = numStr;
                opd_1 = result;
                opd_2 = 0;
                onOpd_2 = false;
                operator = 0;
            } else {
                resetGlob;
                displayContents.innerHTML = result;
                console.log("I am here");
            }
        }

        let theID = numOprt[i].getAttribute("id"); 
        switch (theID) {
            case "plus": operator = 1;
                break;
            case "minus": operator = 2 ;
                break;
            case "multiply" : operator = 3;
                break;
            case "divid": operator = 4;
                break;
            default: operator = 0
        }
    });
}

/*
    Event listener for equal sign
*/
const equal = document.querySelector("#equal");
equal.addEventListener("click", () =>{
    if (onOpd_2) {
        opd_2 = setOperand();
        let result = operate(opd_1, opd_2, operator);
        resetGlob();
        if (typeof result === "number") {
            displayContents.innerHTML = result.toString();
        } else {
            displayContents.innerHTML = result;
        }
    } else {
        // operand 2 is not yet entered, no operation.
        // return what had been entered
        displayContents.innerHTML = numStr;
    }
});

/*
    Event listener for decimal point
*/
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    /* decimal point is not allowed to entered at the 
        beginning of the numbeer or it is already 
        entered for this Number
    */
    if ((numStr !== "") && ( !decmOn)) {
        displayContents.innerHTML += ".";
        numStr += ".";
        decmOn = true;
    }
});

/*
    Event listener for positive/negative sign
*/
const sign = document.querySelector(".posOrNeg");
sign.addEventListener("click", () => {
    /* 
        Check the current indicator and change to opposite
    */
    if ((numStr !== "" ) || ((operator != 0) && (!onOpd_2)))
    { 
        if (isPos) {
            numStr = "-" + numStr;
        } else {
            numStr = numStr.substring(1, numStr.length);
        }
        displayContents.innerHTML = numStr;
        isPos = !isPos;
    }
});

/**********************************************************
    It's sunny day condition now. should take care of veridation
    later in this function or separated function.
**********************************************************/
function setOperand() {
    let l = numStr.length - 1;
    if (numStr[l] === ".") {
        numStr += "00";
    }
    decmOn = false;
    console.log(`operand is ${Number(numStr)}`);
    return Number(numStr);
}

/**********************************************************
    This function resets the global variables for a new operation
**********************************************************/

// reset global variables to the beginning
function resetGlob() {
   opd_1 = 0;
   opd_2 = 0;
   operator = 0;
   numStr = "";
   operator = 0; 
   onOpd_2 = false; 
   decmOn = false;
   newOper = true;
   displayContents.innerHTML = "";
}

/**********************************************************
    This function handles the operation base on the current 
    operator. 
**********************************************************/
function operate(a, b, o) {
    switch (o) {
        case 1: 
            return add(a, b);
            break;
        case 2: 
            return subtract(a, b);
            break;
        case 3: 
            return multiply(a, b);
            break;
        case 4: 
            return divide(a, b);
            break;
    }
}

/**********************************************************
    This function performs addition operation
**********************************************************/
function add(a, b) {
    return (a + b);
}

/**********************************************************
    This function performs subtraction operation
**********************************************************/
function subtract(a, b) {
    return (a - b);
}

/**********************************************************
    This function performs multification operation
**********************************************************/
function multiply(a, b) {
    return (a * b);
}

/**********************************************************
    This function performs division operation
**********************************************************/
function divide(a, b) {
    // !!! add addiional care for divided by 0 case to display N/A
    if (b === 0) {
        return "N/A, AC to restart";
    } else {
        return (a / b);
    }
}