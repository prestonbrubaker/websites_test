const text = "About Me: Willoh Robbins :)";
let index = 0;
let blinkIterations = 0;
const maxBlinkIterations = 4; // Set to 4 or 5 as per your requirement

function typeText() {
    if (index < text.length) {
        document.getElementById("typing-effect").innerHTML += text.charAt(index);
        index++;
        const speed = 100 + Math.random() * 100; // Random speed between 100ms and 200ms
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
