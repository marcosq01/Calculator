let leftOperand = "";
let rightOperand = "";
let lastOperator = '';
let isOperator = false;
let isDecimal = false;
// val is going to be the current value on display
// or at least that's the idea
let val = "";

function operate(left, right, op) {
    switch(op) {
        case '+':
            return +left + +right;
            break;
        case '-':
            return left - right;
            break;
        case 'x':
            return left * right;
            break
        case '/':
            // return right == 0 ? 'Error' : left / right;
            return left / right;
            break;
    }
}

function display(text) {
    let disp = document.querySelector('#display');
    disp.textContent = text;
}

function clearDisplay() {
    val = "";
    let disp = document.querySelector('#display');
    disp.textContent = '0';
}

function ac() {
    const btn = document.querySelector('#ac')
    btn.addEventListener('click', e => {
        leftOperand = "";
        rightOperand = "";
        val = "";
        isOperator = false;
        isDecimal = false;
        display('0'); 
    });
}

function del() {
    let delButton = document.querySelector('#del');
    delButton.addEventListener('click', e => {
        val = val.slice(0, val.length - 1); 
        if (val == "") {
            display('0');
        } else {
            display(val);
        }
    });
}



function clickOperator() {
    const operators = document.querySelectorAll('.operations')
    operators.forEach(operator => {
        operator.addEventListener('click', e => {
            if (val == "") {
                val = 0;
            } 
            if(isOperator) {
                val = operate(leftOperand, val, lastOperator);
                display(val);
            } else {
                isOperator = true;
            }       
            leftOperand = val;
            lastOperator = operator.textContent;
        });
    });
}

function resultButton() {
    let resButton = document.querySelector('#result');
    resButton.addEventListener('click', e => {
        if (leftOperand && val) {
            val = operate(leftOperand, val, lastOperator);
            val = val.toString();
            display(val);
            if (val == 'Error') {
                val = '';
            }
            leftOperand = val;
       } 
    });
}

function negative() {
    const negButton = document.querySelector('#negative');
    negButton.addEventListener('click', e => {
        val *= -1;
        display(val);
    });
}

let numbers = document.querySelectorAll('.numbers');

// when a number is clicked
numbers.forEach(number => {
    number.addEventListener('click', e => {
        if (isOperator) {
            val = "";
        }
        val += e.target.textContent;
        display(val);            

    });
});

// del button
del();

// ac button
ac();

// negative is clicked
negative();

// operator is clicked
clickOperator();

// '=' button is clicked
resultButton();



