let passwordLength = 8;
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numbersCheckEl = document.querySelector("#numbers-check");
const symbolsCheckEl = document.querySelector("#symbols-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

function generatePassword() {

    let chars = "abcdefghjklmnopqrstuvwxyz";
    const uperCaseChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!#$@&*()[],.;";
    let password = "";

    if(upperCaseCheckEl.checked)
        chars += uperCaseChars;

    if(numbersCheckEl.checked)
        chars += numberChars;

    if(symbolsCheckEl.checked)
        chars += symbolChars;

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    inputEl.value = password;
    calculateQuality();
    calculateFontSize();

}

function calculateQuality(){
    // critical -> 20%
    // safe -> 100%

    // T*P1 + M*P2 + N*P3 + S*P4 = 100%
    // T*25% + M*15% + N*25% + S*35% = 100%

    const percent = Math.round(
        ((passwordLength / 64)*25) + 
        (upperCaseCheckEl.checked ? 15 : 0) + 
        (numbersCheckEl.checked ? 25 : 0) +
        (symbolsCheckEl.checked ? 35 : 0)
        );

    securityIndicatorBarEl.style.width = `${percent}%`;

    if(percent > 69){
        // safe
        securityIndicatorBarEl.classList.add("safe");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.remove("critical");
    } else if(percent > 50) {
        // warning
        securityIndicatorBarEl.classList.add("warning");
        securityIndicatorBarEl.classList.remove("safe");
        securityIndicatorBarEl.classList.remove("critical");
    } else{
        // critical
        securityIndicatorBarEl.classList.add("critical");
        securityIndicatorBarEl.classList.remove("safe");
        securityIndicatorBarEl.classList.remove("warning");
    }

    if(percent >= 100){
        securityIndicatorBarEl.classList.add("completed");
    } else{
        securityIndicatorBarEl.classList.remove("completed");
    }
}

function calculateFontSize(){
    if(passwordLength > 45){
        inputEl.classList.add("font-xxs");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-sm");        
    } else if(passwordLength > 32){
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.remove("font-sm");  
    } else if(passwordLength > 22){
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");  
    } else{
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");  
    }
}

function copy(){
    navigator.clipboard.writeText(inputEl.value);
}

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value;
    document.querySelector("#password-length-text").innerText = passwordLength;
    generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numbersCheckEl.addEventListener("click", generatePassword);
symbolsCheckEl.addEventListener("click", generatePassword);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();