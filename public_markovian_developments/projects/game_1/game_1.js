function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownMenu");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdwn')) {
        var dropdownContent = document.getElementById("dropdownMenu");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var xa = .2;
    var xb = .8;
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;

    var maxW = canvas.width;
    var maxH = canvas.height;
    var charW = maxW * 0.37 * 0.7;
    var charH = maxH * 0.6 * 0.7;

var char_1_hues = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 69, 55, 51, 60, 90, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 60, 44, 43, 44, 43, 43, 42, 43, 43, 44, 47, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 45, 43, 42, 43, 42, 42, 42, 42, 42, 42, 43, 42, 44, 46, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 54, 43, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 42, 44, 54, 60, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 60, 46, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 46, 60, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 50, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 44, 50, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 51, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 51, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 79, 44, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 42, 42, 42, 42, 44, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 47, 43, 42, 42, 43, 42, 40, 39, 41, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 40, 41, 43, 42, 42, 42, 46, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 43, 42, 42, 42, 41, 40, 39, 40, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 39, 39, 40, 43, 42, 42, 44, 60, 0, 0, 0, 0], [0, 0, 0, 0, 0, 47, 42, 42, 42, 40, 40, 40, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 40, 43, 42, 43, 50, 60, 0, 0, 0], [0, 0, 0, 0, 0, 44, 43, 43, 41, 40, 41, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 40, 41, 42, 42, 43, 180, 0, 0, 0], [0, 0, 0, 0, 60, 44, 42, 43, 40, 40, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 43, 42, 43, 60, 0, 0, 0], [0, 0, 0, 0, 44, 42, 42, 41, 40, 42, 42, 42, 43, 42, 42, 43, 42, 42, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 41, 41, 42, 43, 48, 0, 0, 0], [0, 0, 0, 0, 50, 43, 43, 41, 41, 43, 42, 42, 40, 40, 40, 41, 42, 42, 42, 42, 42, 43, 40, 39, 39, 39, 43, 42, 42, 40, 42, 42, 43, 46, 60, 0, 0], [0, 0, 0, 0, 46, 42, 42, 42, 43, 43, 42, 40, 40, 40, 40, 40, 40, 42, 42, 42, 42, 40, 40, 40, 40, 40, 40, 43, 42, 42, 43, 42, 42, 44, 60, 0, 0], [0, 0, 0, 0, 45, 42, 42, 42, 42, 43, 75, 44, 40, 40, 41, 40, 39, 42, 42, 42, 41, 39, 41, 41, 41, 41, 43, 72, 43, 42, 42, 42, 43, 46, 60, 0, 0], [0, 0, 0, 0, 46, 42, 42, 42, 43, 127, 207, 157, 42, 42, 42, 42, 43, 42, 42, 42, 42, 41, 42, 42, 42, 43, 167, 206, 110, 43, 42, 42, 42, 45, 120, 0, 0], [0, 0, 0, 0, 46, 42, 42, 43, 86, 205, 206, 204, 44, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 42, 43, 205, 206, 206, 80, 43, 42, 42, 44, 60, 0, 0], [0, 0, 0, 0, 46, 43, 43, 55, 205, 206, 206, 206, 48, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 48, 207, 206, 206, 206, 55, 43, 43, 47, 0, 0, 0], [0, 0, 0, 0, 53, 43, 46, 205, 206, 206, 206, 206, 137, 41, 41, 43, 42, 42, 42, 42, 42, 42, 42, 41, 41, 151, 206, 206, 206, 206, 204, 45, 43, 40, 0, 0, 0], [0, 0, 0, 0, 30, 44, 191, 206, 206, 206, 206, 206, 198, 40, 40, 40, 40, 39, 40, 40, 40, 39, 40, 40, 40, 198, 206, 206, 206, 206, 206, 190, 44, 90, 0, 0, 0], [0, 0, 0, 0, 0, 177, 206, 206, 206, 206, 206, 206, 206, 46, 42, 38, 40, 40, 41, 42, 41, 41, 40, 42, 44, 206, 206, 206, 206, 206, 206, 205, 161, 120, 0, 0, 0], [0, 0, 0, 0, 139, 205, 206, 206, 206, 206, 206, 206, 206, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 83, 206, 206, 206, 206, 206, 206, 206, 205, 120, 0, 0, 0], [0, 0, 0, 0, 199, 205, 206, 206, 206, 206, 206, 206, 206, 43, 42, 42, 120, 60, 0, 0, 60, 60, 48, 44, 43, 206, 206, 206, 206, 206, 206, 206, 206, 200, 180, 0, 0], [0, 0, 0, 0, 206, 206, 206, 206, 206, 206, 206, 206, 206, 41, 40, 40, 41, 39, 39, 40, 41, 40, 40, 39, 42, 206, 206, 206, 206, 206, 206, 206, 206, 201, 60, 0, 0], [0, 0, 0, 0, 205, 206, 206, 206, 206, 206, 206, 206, 206, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 41, 206, 206, 206, 206, 206, 206, 206, 206, 204, 60, 0, 0], [0, 0, 0, 0, 155, 206, 206, 206, 206, 206, 206, 206, 199, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 39, 199, 206, 206, 206, 206, 206, 206, 205, 180, 0, 0, 0], [0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 206, 205, 49, 42, 39, 40, 40, 40, 40, 40, 40, 40, 40, 39, 42, 48, 206, 206, 206, 206, 206, 206, 203, 180, 0, 0, 0], [0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 203, 53, 43, 43, 43, 41, 39, 40, 40, 40, 40, 40, 40, 42, 42, 43, 56, 204, 206, 205, 205, 204, 150, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 120, 197, 204, 204, 56, 44, 42, 42, 42, 43, 43, 42, 42, 41, 42, 42, 42, 42, 43, 43, 44, 60, 203, 206, 193, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 44, 43, 43, 43, 42, 42, 42, 42, 42, 43, 43, 42, 43, 44, 60, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 60, 45, 43, 43, 43, 42, 43, 42, 43, 43, 46, 45, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 56, 46, 0, 51, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var char_1_saturations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 60, 76, 87, 60, 50, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 42, 87, 92, 94, 96, 97, 97, 97, 95, 92, 83, 42, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 86, 94, 98, 98, 98, 100, 100, 100, 100, 100, 97, 98, 93, 86, 33, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 66, 93, 97, 97, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 98, 98, 93, 66, 33, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 33, 79, 94, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 98, 94, 79, 33, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 76, 94, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 93, 76, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 63, 95, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 94, 63, 33, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 60, 90, 98, 100, 100, 100, 93, 59, 72, 100, 100, 100, 100, 100, 100, 100, 100, 71, 60, 93, 100, 100, 100, 100, 91, 33, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 83, 96, 100, 100, 97, 59, 84, 92, 67, 100, 100, 100, 100, 100, 100, 100, 100, 70, 98, 82, 58, 97, 100, 100, 97, 81, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 94, 100, 100, 90, 68, 94, 90, 64, 68, 100, 100, 100, 100, 100, 100, 100, 100, 68, 66, 92, 92, 68, 90, 100, 100, 91, 33, 0, 0, 0, 0], [0, 0, 0, 0, 0, 76, 98, 100, 94, 69, 94, 70, 76, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 98, 74, 71, 98, 69, 92, 100, 95, 76, 33, 0, 0, 0], [0, 0, 0, 0, 0, 90, 100, 98, 60, 94, 66, 92, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 93, 68, 98, 61, 100, 100, 92, 33, 0, 0, 0], [0, 0, 0, 0, 50, 94, 100, 75, 94, 78, 90, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 90, 76, 94, 76, 100, 95, 33, 0, 0, 0], [0, 0, 0, 0, 66, 96, 98, 62, 96, 60, 100, 100, 95, 69, 71, 96, 100, 100, 100, 100, 100, 100, 96, 70, 69, 95, 100, 100, 61, 96, 63, 100, 96, 71, 0, 0, 0], [0, 0, 0, 0, 75, 98, 98, 68, 75, 96, 100, 71, 76, 96, 94, 75, 77, 100, 100, 100, 100, 77, 74, 94, 92, 77, 71, 98, 98, 76, 66, 100, 97, 79, 33, 0, 0], [0, 0, 0, 0, 80, 100, 100, 91, 87, 98, 81, 82, 98, 98, 94, 96, 76, 89, 100, 100, 89, 76, 96, 96, 96, 96, 82, 81, 100, 89, 91, 100, 98, 87, 33, 0, 0], [0, 0, 0, 0, 86, 100, 100, 100, 100, 95, 14, 42, 69, 62, 64, 71, 92, 59, 100, 100, 61, 90, 70, 64, 63, 69, 39, 15, 96, 100, 100, 100, 100, 86, 33, 0, 0], [0, 0, 0, 0, 84, 100, 100, 100, 96, 14, 77, 18, 98, 100, 100, 100, 77, 57, 100, 100, 58, 79, 100, 100, 100, 97, 18, 76, 15, 94, 100, 100, 100, 86, 33, 0, 0], [0, 0, 0, 0, 84, 100, 100, 96, 20, 75, 78, 62, 91, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 93, 65, 79, 78, 22, 95, 100, 100, 92, 33, 0, 0], [0, 0, 0, 0, 81, 98, 97, 40, 74, 79, 79, 76, 58, 100, 98, 98, 100, 100, 100, 100, 100, 100, 98, 98, 97, 56, 78, 79, 79, 74, 42, 98, 97, 80, 0, 0, 0], [0, 0, 0, 0, 69, 95, 72, 65, 79, 79, 79, 78, 6, 66, 61, 58, 65, 72, 75, 75, 72, 65, 59, 60, 65, 7, 78, 79, 79, 79, 63, 76, 95, 75, 0, 0, 0], [0, 0, 0, 0, 50, 91, 30, 79, 79, 79, 79, 78, 22, 98, 98, 98, 92, 90, 92, 92, 92, 94, 96, 98, 96, 24, 79, 79, 79, 79, 79, 28, 91, 50, 0, 0, 0], [0, 0, 0, 0, 0, 20, 76, 79, 79, 79, 79, 79, 66, 20, 23, 24, 25, 32, 35, 35, 31, 26, 24, 21, 21, 67, 79, 79, 79, 79, 79, 77, 20, 33, 0, 0, 0], [0, 0, 0, 0, 42, 74, 78, 79, 79, 79, 79, 79, 74, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 16, 76, 79, 79, 79, 79, 79, 79, 74, 20, 0, 0, 0], [0, 0, 0, 0, 54, 77, 79, 79, 79, 79, 79, 79, 75, 42, 22, 41, 33, 33, 0, 0, 33, 33, 29, 22, 39, 75, 79, 79, 79, 79, 79, 79, 78, 58, 33, 0, 0], [0, 0, 0, 0, 72, 77, 79, 79, 79, 79, 79, 79, 76, 57, 94, 67, 30, 24, 22, 22, 23, 30, 69, 94, 56, 77, 79, 79, 79, 79, 79, 79, 79, 64, 33, 0, 0], [0, 0, 0, 0, 65, 77, 79, 79, 79, 79, 79, 78, 73, 73, 98, 98, 98, 96, 96, 96, 96, 98, 98, 98, 73, 74, 79, 79, 79, 79, 79, 79, 78, 62, 33, 0, 0], [0, 0, 0, 0, 45, 73, 78, 79, 79, 79, 79, 79, 31, 92, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 92, 34, 79, 79, 79, 79, 79, 79, 74, 25, 0, 0, 0], [0, 0, 0, 0, 0, 69, 78, 79, 79, 79, 79, 72, 55, 58, 89, 98, 98, 98, 98, 98, 98, 98, 98, 89, 59, 54, 74, 79, 79, 79, 79, 76, 67, 33, 0, 0, 0], [0, 0, 0, 0, 0, 0, 68, 77, 80, 78, 61, 43, 98, 98, 77, 64, 86, 92, 94, 92, 96, 86, 61, 77, 98, 98, 40, 63, 77, 75, 76, 66, 50, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 33, 55, 61, 68, 47, 92, 98, 100, 100, 98, 95, 72, 61, 62, 72, 95, 100, 100, 98, 97, 92, 41, 64, 73, 47, 50, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 55, 89, 96, 98, 98, 100, 100, 100, 100, 100, 98, 97, 98, 96, 89, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 60, 85, 93, 97, 97, 98, 98, 98, 96, 93, 88, 80, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 72, 81, 0, 71, 60, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var char_1_lightings = [[100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 98, 98, 96, 96, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 98, 90, 79, 71, 67, 65, 66, 67, 71, 79, 90, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 88, 70, 65, 64, 65, 65, 65, 65, 65, 65, 64, 65, 70, 88, 98, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 96, 76, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 75, 96, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 99, 94, 70, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 70, 94, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 95, 68, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 69, 94, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 97, 71, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 71, 97, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 80, 65, 65, 65, 65, 63, 51, 57, 65, 65, 65, 65, 65, 65, 65, 65, 56, 51, 63, 65, 65, 65, 65, 80, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 92, 66, 65, 65, 65, 47, 24, 20, 32, 65, 65, 65, 65, 65, 65, 65, 65, 32, 20, 24, 47, 65, 65, 65, 66, 93, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 76, 65, 65, 63, 33, 20, 21, 36, 55, 65, 65, 65, 65, 65, 65, 65, 65, 55, 35, 21, 20, 34, 63, 65, 65, 76, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 95, 66, 65, 64, 32, 20, 30, 58, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 58, 30, 20, 32, 63, 65, 65, 95, 99, 99, 100, 100], [100, 100, 100, 99, 99, 83, 65, 64, 41, 20, 34, 63, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 64, 33, 20, 41, 65, 65, 83, 99, 99, 100, 100], [100, 100, 100, 99, 99, 73, 65, 58, 21, 27, 62, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 63, 27, 21, 58, 65, 74, 99, 99, 100, 100], [100, 100, 100, 99, 97, 67, 65, 39, 20, 52, 65, 65, 64, 56, 56, 64, 65, 65, 65, 65, 65, 65, 64, 56, 56, 64, 65, 65, 51, 20, 39, 65, 66, 98, 99, 100, 100], [100, 100, 100, 99, 93, 65, 65, 34, 28, 64, 65, 56, 27, 20, 20, 29, 59, 65, 65, 65, 65, 58, 29, 20, 20, 27, 56, 65, 65, 28, 34, 65, 64, 94, 99, 100, 100], [100, 100, 100, 99, 89, 65, 65, 63, 62, 65, 60, 24, 20, 20, 20, 20, 27, 62, 65, 65, 62, 27, 20, 20, 20, 20, 24, 60, 65, 62, 63, 65, 65, 90, 99, 100, 100], [100, 100, 100, 99, 88, 65, 65, 65, 65, 64, 55, 28, 32, 39, 38, 31, 21, 42, 65, 65, 42, 21, 31, 38, 39, 32, 29, 54, 64, 65, 65, 65, 65, 88, 99, 100, 100], [100, 100, 100, 99, 87, 65, 65, 65, 65, 68, 64, 66, 65, 65, 65, 65, 59, 50, 65, 65, 50, 59, 65, 65, 65, 65, 65, 64, 68, 64, 65, 65, 65, 88, 99, 100, 100], [100, 100, 100, 99, 89, 65, 65, 64, 67, 64, 64, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 64, 64, 64, 67, 64, 65, 65, 90, 99, 100, 100], [100, 100, 100, 99, 93, 65, 64, 64, 63, 64, 64, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 64, 64, 64, 64, 64, 64, 65, 64, 93, 99, 100, 100], [100, 100, 100, 99, 97, 66, 64, 64, 64, 64, 64, 64, 47, 35, 43, 48, 53, 57, 58, 58, 57, 54, 49, 43, 35, 48, 64, 64, 64, 64, 64, 65, 65, 98, 99, 100, 100], [100, 100, 100, 99, 99, 71, 64, 64, 64, 64, 64, 64, 49, 20, 20, 20, 20, 21, 20, 20, 20, 20, 20, 20, 20, 49, 64, 64, 64, 64, 64, 64, 72, 99, 99, 100, 100], [100, 100, 100, 99, 99, 80, 64, 64, 64, 64, 64, 64, 67, 74, 63, 54, 47, 43, 40, 40, 42, 47, 54, 63, 75, 66, 64, 64, 64, 64, 64, 64, 80, 99, 99, 100, 100], [100, 100, 100, 99, 98, 68, 64, 64, 64, 64, 64, 64, 65, 93, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 93, 65, 64, 64, 64, 64, 64, 64, 69, 99, 99, 100, 100], [100, 100, 100, 99, 91, 64, 64, 64, 64, 64, 64, 64, 64, 31, 69, 96, 99, 99, 99, 99, 99, 99, 96, 69, 32, 64, 64, 64, 64, 64, 64, 64, 64, 92, 99, 100, 100], [100, 100, 100, 99, 88, 64, 64, 64, 64, 64, 64, 64, 64, 24, 20, 25, 44, 58, 64, 65, 58, 44, 25, 20, 25, 64, 64, 64, 64, 64, 64, 64, 64, 87, 99, 100, 100], [100, 100, 100, 99, 90, 64, 64, 64, 64, 64, 64, 64, 63, 22, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 22, 64, 64, 64, 64, 64, 64, 64, 64, 91, 99, 100, 100], [100, 100, 100, 99, 97, 66, 64, 64, 64, 64, 64, 64, 54, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 55, 64, 64, 64, 64, 64, 64, 67, 98, 99, 100, 100], [100, 100, 100, 99, 99, 84, 64, 64, 64, 64, 64, 64, 64, 44, 22, 20, 20, 20, 20, 20, 20, 20, 20, 22, 44, 64, 64, 64, 64, 64, 64, 64, 84, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 82, 65, 64, 64, 64, 64, 65, 65, 58, 38, 23, 20, 20, 20, 20, 23, 39, 59, 65, 65, 63, 64, 64, 63, 65, 82, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 96, 88, 90, 93, 72, 65, 65, 65, 65, 65, 57, 52, 52, 57, 65, 65, 65, 65, 65, 72, 93, 90, 89, 96, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 98, 84, 68, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 68, 84, 98, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 97, 86, 76, 68, 65, 65, 65, 65, 68, 75, 86, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 100, 100, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 98, 95, 93, 0, 95, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 100, 99, 100, 100, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100], [100, 100, 0, 0, 0, 0, 0, 0, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 0, 0, 0, 100, 100], [100, 100, 0, 100, 0, 0, 100, 100, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 100, 0, 100, 100], [100, 100, 0, 0, 100, 0, 100, 100, 100, 100, 100, 0, 100, 100, 100, 100, 100, 100, 100, 0, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 0, 100, 0, 0, 100, 100], [100, 100, 0, 100, 0, 0, 100, 100, 100, 100, 100, 0, 0, 0, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 0, 0, 0, 0, 100, 100, 0, 0, 100, 0, 100, 100], [100, 100, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 100, 0, 100, 100, 100, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 0, 0, 0, 100, 100], [100, 100, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 51, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 51, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 51, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 51, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 0, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 51, 51, 51, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 100, 100, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]]
    
    if(maxW > maxH){
        blockSize = Math.floor(maxH /100);
    } else{
        blockSize = Math.floor(maxW / 100);
    }
    if(blockSize < 1){
        blockSize = 1;
    }

    function drawCanvas(hues) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            }
        }
        ctx.clearRect(0,0,maxW,maxH)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,maxW,maxH);
        xa = hues[0][0];
        xb = hues[0][1];
        ctx.fillStyle = "#007700";
        ctx.fillRect(xb * maxW, maxH, charW, -1 * charH);
        ctx.fillStyle = "#000000";
        ctx.fillText("HI, I'm P.!", xa * maxW + charW / 2 - 50, maxH - 1 * charH - 40 + charH / 7);
        ctx.fillText("HI, I'm also Willoh!", xb * maxW, maxH - 1 * charH - 40);
        for ( var y = 0; y < 60; y++){
            for ( var x = 0; x < 37; x++){
                ctx.fillStyle = `hsl(${char_1_hues[y][x]}, ${char_1_saturations[y][x]}%, ${char_1_lightings[y][x]}%)`;
                if(char_1_lightings[y][x] < 95){
                    ctx.fillRect(xa * maxW + x * charW / 37, maxH - charH + y * charH / 60, charW / 37, 1 * charH / 60);
                }
            }
        }
        
    }

    /********************************************************************
    canvas.addEventListener('click', function(event) {
        const x = Math.floor(event.offsetX / blockSize);
        const y = Math.floor(event.offsetY / blockSize);
        hues[y][x] = Math.floor(Math.random() * 360); // Random hue

        drawCanvas(hues);
        saveHues();
    });
    *********************************************************************/
    
    function saveHues() {
        hues[0][0] = xa;
        hues[0][1] = xb;
        fetch('/save-game_1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
        loadHues();
    }

    function loadHues() {
        fetch('/get-game_1')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                
                drawCanvas(hues);
            });
        
        
        
    }






    
    
    // Define functions for specific keys
    function handleKeyA() {
        console.log('Key A is held down');
        if(xa > 0){
            xa -= 0.01;
        }
        saveHues();
    }

    function handleKeyD() {
        console.log('Key D is held down');
        if(xa < 1 - charW / maxW){
            xa += 0.01;
        }
        
        saveHues();
    }

    function handleLeftArrow() {
        console.log('Left Arrow is held down');
        if(xb > 0){
            xb -= 0.01;
        }
        
        saveHues();
        
    }

    function handleRightArrow() {
        console.log('Right Arrow is held down');
        if(xb < 1 - charW / maxW){
            xb += 0.01;
        }
        saveHues();
    }

        // Object to keep track of key states and the interval function
    const keysPressed = {
        'a': { pressed: false, interval: null },
        'd': { pressed: false, interval: null },
        'ArrowLeft': { pressed: false, interval: null },
        'ArrowRight': { pressed: false, interval: null }
    };
    
    // Event listener for keydown
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!keysPressed[key].pressed) {
            keysPressed[key].pressed = true;
            // Clear any existing interval just in case
            if (keysPressed[key].interval !== null) {
                clearInterval(keysPressed[key].interval);
            }
            // Set a new interval
            keysPressed[key].interval = setInterval(() => {
                repeatFunction(key);
            }, 50); // Calls repeatFunction every 50ms
        }
    });
    
    // Event listener for keyup
    document.addEventListener('keyup', function(event) {
        const key = event.key;
        if (keysPressed[key].pressed) {
            keysPressed[key].pressed = false;
            // Clear the interval when the key is released
            clearInterval(keysPressed[key].interval);
            keysPressed[key].interval = null;
        }
    });

    // Function to call the appropriate function based on the key
    function repeatFunction(key) {
        switch (key) {
            case 'a':
                handleKeyA();
                break;
            case 'd':
                handleKeyD();
                break;
            case 'ArrowLeft':
                handleLeftArrow();
                break;
            case 'ArrowRight':
                handleRightArrow();
                break;
            default:
                // No action for other keys
                break;
        }
    }

    
    


    

    

    loadHues();
    setInterval(loadHues, 300);
});
