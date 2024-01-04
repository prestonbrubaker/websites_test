let canvas;

function setup() {
    canvas = createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.5); // Adjust size as needed
    canvas.parent('wave-simulation'); // Bind canvas to div
    attachSliderListeners();
}

function draw() {
    background(100); // Clear with light grey background
    drawWave();
    updateSliderValues();
}

function attachSliderListeners() {
    document.getElementById('amplitudeSlider').addEventListener('input', updateSliderValues);
    document.getElementById('frequencySlider').addEventListener('input', updateSliderValues);
    document.getElementById('phaseSlider').addEventListener('input', updateSliderValues);
}

function updateSliderValues() {
    document.getElementById('amplitudeValue').textContent = document.getElementById('amplitudeSlider').value;
    document.getElementById('frequencyValue').textContent = document.getElementById('frequencySlider').value;
    document.getElementById('phaseValue').textContent = document.getElementById('phaseSlider').value;
}

function drawWave() {
    let amplitude = document.getElementById('amplitudeSlider').value;
    let frequency = document.getElementById('frequencySlider').value;
    let phaseShift = document.getElementById('phaseSlider').value;

    beginShape();
    for (let x = 0; x < width; x++) {
        let angle = frequency * x + phaseShift;
        let y = amplitude * sin(angle);
        vertex(x, height / 2 + y);
    }
    endShape();
}