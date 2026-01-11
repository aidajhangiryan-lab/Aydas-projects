const buttons = document.querySelectorAll("button");
const arr = ["0"];
const text = document.getElementById("text")


// add digits for virtual keybord
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        if ( btn.dataset.action === "=") return;
        if (!btn.dataset.value && !btn.dataset.action) return;
        addDigit(btn.dataset.value || btn.dataset.action);

        btn.blur();
    });
});

// If key "equal " pressed
const equal = document.getElementById("equal")
equal.addEventListener("click", () => {
    if (!["+", "-", "*", "/"].includes(arr.at(-1))) {
        calculate()
    }
})

//if key "delete " pressed
const deletebtn = document.getElementById("delete")
deletebtn.addEventListener("click", () => {
    deleteScreen()
})


// keybord
document.addEventListener("keydown", event => {

    //adding digit
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"].includes(event.key)) {
        addDigit(event.key)
    }

    //if = pressed
    if (event.key == "=" || event.key == "Enter") {
        calculate()

    }

    //if backspace pressed
    if (event.key == "Backspace") {
        deleteScreen();
    }
})

//my functions

function deleteScreen() {
    text.innerText = ""
    arr.length = 0;
}

function addDigit(key) {
    const last = arr.at(-1);
    const numKey = Number(key);
    const lastnum = Number(last)
     const isNumber = function (input){
        return Number.isFinite(input)
    }

    const addFromRigth = function(){
        arr.push(key);
        text.innerText += key;
    }

    const concatToLastNum = function(){
        arr[arr.length - 1] += key;
        text.innerText += key;
    }


    const changeDigit = function(){
        arr[arr.length - 1] = key;
        text.innerText = text.innerText.slice(0, -1) + key;
    }


    const checkIfzeroAfterZero = last === "0" && "0123456789".includes(key)
    const checkIfArrIsEmpty = arr.length === 0 && isNumber(numKey)
    const checkTypingNums = isNumber(lastnum) && isNumber(numKey)
    const checkIfOperator = isNumber(lastnum) && !isNumber(numKey)
    const checkNumAfterOperator = !isNumber(lastnum) && isNumber(numKey)

    if (checkIfzeroAfterZero) {
        changeDigit()
    }
    else if (checkIfArrIsEmpty || checkIfOperator || checkNumAfterOperator) {
        addFromRigth()
    }
    else if (checkTypingNums) {
       concatToLastNum()
    }
    }





function calculate() {
    if (arr.length == 0) return;

    // *, /
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*" || arr[i] === "/") {
            let prev = Number(arr[i - 1]);
            let next = Number(arr[i + 1]);
            let result = arr[i] === "*" ? prev * next : prev / next;

            arr[i - 1] = result;
            arr.splice(i, 2);
            i--;
        }
    }

    // +, -
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+" || arr[i] === "-") {
            let prev = Number(arr[i - 1]);
            let next = Number(arr[i + 1]);
            let result = arr[i] === "+" ? prev + next : prev - next;

            arr[i - 1] = result;
            arr.splice(i, 2);
            i--;
        }
    }

    //kotorakayin mas
    if (arr[0] % 1 !== 0) {
        arr[0] = Number(arr[0]).toFixed(2)
    }

    text.innerText = arr[0];
    arr.length = 0;
    arr.push(String(text.innerText));

    return Number(text.innerText);

}

// Memory 
let memoryValue = parseFloat(localStorage.getItem("calculatorMemory")) || 0;
// Get memory buttons
const memorySave = document.getElementById("memorysave");      // MS
const memoryRecall = document.getElementById("memoryrecall");  // MR
const memoryPlus = document.getElementById("memoryplus");       // M+
const memoryMinus = document.getElementById("memoryminus"); // M-

// memorysave
memorySave.addEventListener("click", () => {
    let currentDisplayValue = parseFloat(text.innerText) || 0;
    memoryValue = currentDisplayValue;
    localStorage.setItem("calculatorMemory", memoryValue);
});

// memoryrecall
memoryRecall.addEventListener("click", () => {
 addDigit(memoryValue.toString());

});

// memoryplus
memoryPlus.addEventListener("click", () => {
    let currentDisplayValue = parseFloat(text.innerText) || 0;
    memoryValue += currentDisplayValue;
    localStorage.setItem("calculatorMemory", memoryValue);
});

// memory minus
memoryMinus.addEventListener("click", () => {
    let currentDisplayValue = parseFloat(text.innerText) || 0;
    memoryValue -= currentDisplayValue;
    localStorage.setItem("calculatorMemory", memoryValue);
});