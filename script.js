const buttons = document.querySelectorAll("button");
const arr = ["0"];
const text = document.getElementById("text")


// add digits for virtual keybord
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        if ( btn.dataset.action === "=") return;
        if (!btn.dataset.value && !btn.dataset.action) return;
        addDigit(btn.dataset.value || btn.dataset.action);

    });
});

// If key "equal " pressed
const equal = document.getElementById("equal")
equal.addEventListener("click", () => {
    if (!["+", "-", "*", "/"].includes(arr.at(-1))) {
        calculate()
    }
})

//if key "delate " pressed
const delate = document.getElementById("delate")
delate.addEventListener("click", () => {
    delateScreen()
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
        delateScreen();
    }
})

//my functions
function delateScreen() {
    text.innerText = ""
    arr.length = 0;
}

function addDigit(key) {
    //ete irar hetevic 0 a poxuma 0n tvi
    //ete zangvacy datarka u nemucvox nishy tiva-> push
    //ete verji nishy tiva u nermucvox nishy tiva  && ete verji tivy 0a u nermucvox tivy 0 chi -> +=
    //ete vreji nishy tiva u nermucvox nishy nshana -> push
    //ete verji nishy nshana u nermucvox nishy tiva u 0 chi  -> push
    let last = arr.at(-1);
    let numKey = Number(key);

    if (last === "0" && "0123456789".includes(key)) {
        arr[arr.length - 1] = key;
        text.innerText = text.innerText.slice(0, -1) + key;
    }
    else if (arr.length === 0 && Number.isFinite(numKey)) {
        arr.push(key);
        text.innerText += key;
    }
    else if (Number.isFinite(Number(last)) && Number.isFinite(numKey)) {
        arr[arr.length - 1] += key;
        text.innerText += key;
    }
    else if (Number.isFinite(Number(last)) && !Number.isFinite(numKey)) {
        arr.push(key);
        text.innerText += key;
    }
    else if (!Number.isFinite(Number(last)) && Number.isFinite(numKey)) {
        arr.push(key);
        text.innerText += key;
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