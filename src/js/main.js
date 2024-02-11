let today = new Date();
let yearNow = today.getFullYear().toString();
yearNow = parseInt(yearNow.slice(2));
let monthNow = today.getMonth() + 1; // Months are zero-indexed, so January is 0


var nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)$/;
var numbRegex = /[0-9]/g;

let cardNumber = document.getElementById("card-number");
let cardName = document.getElementById("name");
let expMonth = document.getElementById("exp-month");
let expYear = document.getElementById("exp-year");
let cvc = document.getElementById("cvc");

let cardNumberInput = document.getElementById("card-number-input");
let nameInput = document.getElementById("name-input");
let expMonthInput = document.getElementById("exp-month-input");
let expYearInput = document.getElementById("exp-year-input");
let cvcInput = document.getElementById("cvc-input");

let allInputs = document.getElementsByTagName("input");
let errorMesages = document.querySelectorAll(".error-mesage");
let submit = document.getElementById("submit-btn");

let form = document.getElementById("main-form");
let acceptDiv = document.getElementById("submit-accept-div");
let returnBtn = document.getElementById("back-btn");

function structCardNum(str) {
    let newStr = "";
    let count = 0;
    for(let i = 0; i < str.length; i++) {
        if(count === 4) {
            newStr += " ";
            count = 0;
        }
        newStr += str[i];
        count++;
    }
    return newStr;
}

function showErrorMesage(field, errorMeasge = "Invalid input") {
    field.parentNode.querySelector(".error-mesage").classList.remove("hidden");
    field.parentNode.querySelector(".error-mesage").innerText = errorMeasge;
    field.classList.add("border-color-red");
}

function sliceLastChar(element, count) {
    element.value = element.value.slice(0, count)
}

function padZero(element) {
    return "0" + element.value;
}

returnBtn.addEventListener("click", function() {
    form.classList.remove("hidden");
    acceptDiv.classList.add("hidden");
})

cardNumberInput.addEventListener("input", function() {
    if(this.value.length > 16) sliceLastChar(this, 16);
})

expMonthInput.addEventListener("input", function() {
    if(this.value.length > 2) sliceLastChar(this, 2);
})

expYearInput.addEventListener("input", function() {
    if(this.value.length > 2) sliceLastChar(this, 2);
})

cvcInput.addEventListener("input", function() {
    if(this.value.length > 3) sliceLastChar(this, 3);
})

submit.addEventListener("click", function() {

    errorMesages.forEach(element => {
        element.classList.add("hidden");
    });

    for(let input of allInputs){
        input.classList.remove("border-color-red");
    }

    //////////NAME///////////////////////////
    if(nameInput.value.match(nameRegex)) cardName.innerText = nameInput.value;
    else showErrorMesage(nameInput ,"Wrong format, leters only");
    if(nameInput.value.length < 5) showErrorMesage(nameInput, "Min 5 characters");
    if(nameInput.value.length > 30) showErrorMesage(nameInput, "Max 30 characters");
    /////////////CARD NUMBER///////////////////
    cardNumber.innerText = structCardNum(cardNumberInput.value);
    if(cardNumberInput.value.match(/[^\d]+/g)) showErrorMesage(cardNumberInput, "Wrong format, numbers only");
    if(cardNumberInput.value.length < 16) showErrorMesage(cardNumberInput, "Card number must be 16 digits long");
    ///////////////MONTH//////////////////////////
    if(expMonthInput.value.match(/[^\d]+/g)) showErrorMesage(expMonthInput, "Wrong format, numbers only");
    if(expMonthInput.value > 12 || expMonthInput.value == 0) showErrorMesage(expMonthInput, "Invalid month");
    if(expMonthInput.value.length < 2){
        let modMonthValue = padZero(expMonthInput);
        expMonth.innerText = modMonthValue;
    } else expMonth.innerText = expMonthInput.value;
    /////////////YEAR//////////////////////////////
    if(expYearInput.value.match(numbRegex)) expYear.innerText = expYearInput.value;
    else showErrorMesage(expYearInput, "Wrong format, numbers only");   
    if(expYearInput.value < yearNow) showErrorMesage(expYearInput , "Card expiration date shuld be in future");
    else if(expMonthInput.value <= monthNow && expYearInput.value == yearNow) showErrorMesage(expMonthInput, "Card expiration date shuld be in future");
    /////////////////////CVC////////////////////////
    if(cvcInput.value.length != 3) showErrorMesage(cvcInput, "CVC must be 3 digits long");
    if(cvcInput.value.match(/[^\d]+/g)) showErrorMesage(cvcInput, "Wrong format, numbers only");
    else cvc.innerText = cvcInput.value;

    let errorCheck = false;
    errorMesages.forEach(error => {
        if(!error.classList.contains("hidden")) {
            errorCheck = true;
            return 0;
        };
    })

    if(errorCheck == false) {
        form.classList.add("hidden");
        acceptDiv.classList.remove("hidden");
    }
})

