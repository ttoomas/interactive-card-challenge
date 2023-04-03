// Add a invisible space after every 4 numbers
const cardNumInput = document.querySelector('.number__input');

cardNumInput.addEventListener('input', (e) => {
    var target = e.target, position = target.selectionEnd, length = target.value.length;
    
    target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
})

// INPUT ERRORS
let callCount = [];

const main = document.querySelector('.main');
const confirmBtn = document.querySelector('.confirm__btn');
const nameInput = document.querySelector('.name__input');
const numberInput = document.querySelector('.number__input');
const expMmInput = document.querySelector('.inp__mm');
const expYyInput = document.querySelector('.inp__yy');
const cvcInput = document.querySelector('.cvc__input');

confirmBtn.addEventListener('click', () => {
    validateForm();    
})

function validateForm(){
    // Name Input
    if(nameInput.value == 0){
        nameInput.parentElement.classList.add('blankErr');
        nameInput.parentElement.classList.remove('formatErr');
        callCount.push('nameBlank');
    }
    else if(nameInput.value.trim().split(/\s+/).length < 2){
        nameInput.parentElement.classList.add('formatErr');
        nameInput.parentElement.classList.remove('blankErr');
        callCount.push('nameFormat');
    }
    else if(nameInput.value.trim().split(/\s+/).length >= 3){
        nameInput.parentElement.classList.add('formatErr');
        nameInput.parentElement.classList.remove('blankErr');
        callCount.push('nameFormat');
    }
    else{
        nameInput.parentElement.classList.remove('blankErr');
        nameInput.parentElement.classList.remove('formatErr');
    }

    // Card Number
    if(numberInput.value == 0){
        numberInput.parentElement.classList.add('blankErr');
        numberInput.parentElement.classList.remove('formatErr');
        callCount.push('numberBlank');
    }
    else if(numberInput.value.length < 19){
        numberInput.parentElement.classList.add('formatErr');
        numberInput.parentElement.classList.remove('blankErr');
        callCount.push('numberFormat');
    }
    else{
        numberInput.parentElement.classList.remove('blankErr');
        numberInput.parentElement.classList.remove('formatErr');
    }

    // Exp. MM or YY date Input
    if(expMmInput.value == 0){
        expMmInput.parentElement.classList.add('blankErr');
        expYyInput.parentElement.classList.remove('formatErr', 'expMmFormatErr');
        callCount.push('expMmBlank');
    }
    else if(expMmInput.value > 12){
        expMmInput.parentElement.classList.add('formatErr', 'expMmFormatErr');
        expYyInput.parentElement.classList.remove('blankErr');
        callCount.push('expErrFormat');
    }
    if(expYyInput.value == 0){
        expYyInput.parentElement.classList.add('blankErr');
        expMmInput.parentElement.classList.remove('formatErr', 'expMmFormatErr');
        callCount.push('expYyBlank');
    }


    if(!callCount.includes('expYyBlank') & !callCount.includes('expErrFormat') & !callCount.includes('expMmBlank')){
        expYyInput.parentElement.classList.remove('blankErr');
        expMmInput.parentElement.classList.remove('formatErr', 'expMmFormatErr');
    }

    // CVC input
    if(cvcInput.value == 0){
        cvcInput.parentElement.classList.add('blankErr');
        cvcInput.parentElement.classList.remove('formatErr');
        callCount.push('cvcBlank');
    }
    else if(cvcInput.value.length < 3){
        cvcInput.parentElement.classList.add('formatErr');
        cvcInput.parentElement.classList.remove('blankErr');
        callCount.push('cvcFormat');
    }
    else{
        cvcInput.parentElement.classList.remove('blankErr');
        cvcInput.parentElement.classList.remove('formatErr');
    }


    // CHECK FOR ERRORS
    if(callCount.length > 0){
        console.log('There is some error');
    }
    if(callCount.length == 0){
        formValidated();
    }

    // Reset errors count for new validation
    callCount = [];
}

// Change screen
function formValidated(){
    const mainForm = document.querySelector('.main__form');
    const mainSuccess = document.querySelector('.main__success');
    const scsContinueBtn = document.querySelector('.scs__continue');
    let allInputs = document.querySelectorAll('input');

    mainForm.style.display = "none";
    mainSuccess.style.display = "flex";

    scsContinueBtn.addEventListener('click', () => {
        mainSuccess.style.display = "none";
        mainForm.style.display = "grid";
        
        allInputs.forEach((aInput) => {
            aInput.value = "";
        })

        numberText.textContent = "0000 0000 0000 0000";
        nameText.textContent = "Jane Appleseed";
        expMmText.textContent = "00";
        expYyText.textContent = "00";
        cvcText.textContent = "000";
    })
}


// LIVE TYPING
// Card Number
const numberText = document.querySelector('.content__cNumber');

numberInput.addEventListener('input', (typedNumber) => {
    inputHandler(typedNumber, numberText, numberInput, '0000 0000 0000 0000');
})
numberInput.addEventListener('propertychange', (typedNumber) => {
    inputHandler(typedNumber, numberText, numberInput, '0000 0000 0000 0000');
})

// Cardholder name
const nameText = document.querySelector('.bottom__name');

nameInput.addEventListener('input', (typedNumber) => {
    inputHandler(typedNumber, nameText, nameInput, 'Jane Appleseed');
})
nameInput.addEventListener('propertychange', (typedNumber) => {
    inputHandler(typedNumber, nameText, nameInput, 'Jane Appleseed');
})

// // Exp. date - MM
const expMmText = document.querySelector('.exp__mm');

expMmInput.addEventListener('input', (typedNumber) => {
    inputHandler(typedNumber, expMmText, expMmInput, '00');
})
expMmInput.addEventListener('propertychange', (typedNumber) => {
    inputHandler(typedNumber, expMmText, expMmInput, '00');
})

// Exp. date - YY
const expYyText = document.querySelector('.exp__yy');

expYyInput.addEventListener('input', (typedNumber) => {
    inputHandler(typedNumber, expYyText, expYyInput, '00');
})
expYyInput.addEventListener('propertychange', (typedNumber) => {
    inputHandler(typedNumber, expYyText, expYyInput, '00');
})

// CVC
const cvcText = document.querySelector('.back__cvc');

cvcInput.addEventListener('input', (typedNumber) => {
    inputHandler(typedNumber, cvcText, cvcInput, '000');
})
cvcInput.addEventListener('propertychange', (typedNumber) => {
    inputHandler(typedNumber, cvcText, cvcInput, '000');
})


// InputHandler function
function inputHandler(typedNumber, finalElement, typedInput, emptyText){
    let number = typedNumber.target.value;

    finalElement.textContent = number;

    if(typedInput.value.length == 0){
        finalElement.textContent = emptyText;
    }
}
