
// global variables
let opd_1; // operand 1
let opd_2; // operand 1
let opr;   // operator
let numStr = ""; // the number input as a string 
let operator = 0; // operator for an action 0=none, 1=+, 2=-, 3=X, 4=/
let onOpd_2 = false; // indicator of operand 2 started
const displayContents = document.querySelector("#display>p");

//console.log(`display is ${displayContents.innerHTML}`);
//console.log(`the length is ${numElms.length}`);

/* !!!!
    Integer only sunny day condition. no +/- or .
    to be considered.
    !!!!
    should add a check for the first number for operand 1 entered
    to clear out display
Event listeners for all number buttons
*/ 
const numElms = document.querySelectorAll(".num");
for (let i = 0; i < numElms.length; i++) {
    numElms[i].addEventListener("click", () => {
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
    });
}

/*
    Event listener for back one button
    Delete the last number from display and the numStr

    !!! should think about what to do if operator is entered
    and backOne key is clicked.
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
    Monitor all operators
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
            let n = operate(opd_1, opd_2, operator);
            numStr = n.toString();
            console.log(`numStr is ${numStr}`);
            displayContents.innerHTML = numStr;
            opd_1 = n;
            opd_2 = 0;
            onOpd_2 = false;
            operator = 0;
        }

        let theID = numOprt[i].getAttribute("id"); 
        //console.log(`id is ${theID}`);
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
        //console.log(`operator is ${operator}`);
    });
}

const equal = document.querySelector("#equal");
equal.addEventListener("click", () =>{
    if (onOpd_2) {
        opd_2 = setOperand();
        let result = operate(opd_1, opd_2, operator);
        resetGlob();
        displayContents.innerHTML = result.toString();
    } else {
        // operand 2 is not yet entered, no operation.
        // return what had been entered
        displayContents.innerHTML = numStr;
    }
});

/* 
    It's sunny day condition now. should take care of veridation
    later in this function or separated function.

    and for decimal numbers too
*/
function setOperand() {
    let n = Number(numStr);
    //console.log(`operand is ${n}`);
    return n;
}

// reset global variables to the beginning
function resetGlob() {
   opd_1 = 0;
   opd_2 = 0;
   operator = 0;
   numStr = "";
   operator = 0; 
   onOpd_2 = false; 
   displayContents.innerHTML = "";
}

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

function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    if (b === 0) {
        return 0;
    } else {
        return (a / b);
    }
}