function getPin() {
    const random = Math.random() * 10000; // generate 4 digit random pin
    const pin = (random + '').split('.')[0]; //taking the first 4 digit from the random number
    if (pin.length === 4) {
        return pin;
    } else {
        // console.log('shorter pin', pin);
        return getPin();
    }
}

// Display Generated PIN

function generatePin() {
    const pinInput = document.getElementById('pin');
    pinInput.value = getPin();
    document.getElementById('typed-pin').value = '';
    document.getElementById('notify-success').style.display='none';
}

// handle calculator button event

const buttonContainer = document.getElementById('digits-container');
buttonContainer.addEventListener('click', function (event) {
    const digit = event.target.innerText;

    if (isNaN(digit)) {
        //handle backspace and clear

        if (digit === 'C') {
            const typedInput = document.getElementById('typed-pin');
            typedInput.value = '';
        } else if (digit === '<') {
            const typedInput = document.getElementById('typed-pin');
            const newInput = typedInput.value;
            const newNumber = Number(newInput.toString().slice(0, -1));
            typedInput.value = newNumber;
        }

    } else {
        //    console.log(digit)
        const typedInput = document.getElementById('typed-pin');
        typedInput.value = typedInput.value + digit;
    }
})

// verify pin

const defaultTryLeft = document.getElementById('try-left').innerText;

function verifyPin() {
    const pin = document.getElementById('pin').value;
    const typedPin = document.getElementById('typed-pin').value;

if(pin.length > 0){
    if (pin === typedPin) {
        displayMatchResult('block', 'none');
        document.getElementById('pin').value = '';
        document.getElementById('try-left').innerText = defaultTryLeft;

    } else {

        displayMatchResult('none', 'block');

        const tryLeft = document.getElementById('try-left');
        const tryLeftValue = parseInt(tryLeft.innerText);
        if (tryLeftValue > 1) {
            const tryLeftNew = tryLeftValue - 1;
            document.getElementById('try-left').innerText = tryLeftNew;
        } else {
            location.reload(); //reload page after 3 try finished
        }
    }
}

else{
    alert('Please generate PIN first');
}


}

function displayMatchResult(correctStatus, incorrectStatus) {
    const correct = document.getElementById('notify-success');
    correct.style.display = correctStatus;
    const inCorrect = document.getElementById('notify-fail');
    inCorrect.style.display = incorrectStatus;

    document.getElementById('typed-pin').value = '';
}