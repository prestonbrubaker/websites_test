const text = "A Few Examples of my Work: Willoh Robbins :)";
let index = 0;
let blinkIterations = 0;
const maxBlinkIterations = 4; 

function typeText() {
    if (index < text.length) {
        document.getElementById("typing-effect").innerHTML += text.charAt(index);
        index++;
        const speed = 100 + Math.random() * 100;
        setTimeout(typeText, speed);
    } else {
        setTimeout(stopBlinking, 1000);
    }
}

function stopBlinking() {
    if (blinkIterations < maxBlinkIterations) {
        blinkIterations++;
        setTimeout(stopBlinking, 1000);
    } else {
        const typingElement = document.getElementById("typing-effect");
        typingElement.classList.add("no-blink");
    }
}

window.onload = typeText;