function drawBackground(ctx) {
    ctx.fillStyle = 'rgb(0, 148, 255)';
    ctx.fillRect(0, 0, 1000, 300);

    ctx.fillStyle = 'rgb(38, 127, 0)';
    ctx.fillRect(0, 300, 1000, 200);

    ctx.fillStyle = 'rgb(96, 96, 96)';
    ctx.fillRect(0, 350, 1000, 100);
}

function drawTrees(ctx) {
    //draw first tree
    ctx.fillStyle = 'rgb(127, 0, 0)';
    ctx.fillRect(125, 250, 50, 75);

    ctx.fillStyle = 'rgb(0, 127, 14)';
    ctx.beginPath();
    ctx.moveTo(50, 275);
    ctx.lineTo(150, 200);
    ctx.lineTo(250, 275);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(70, 225);
    ctx.lineTo(150, 150);
    ctx.lineTo(230, 225);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(90, 175);
    ctx.lineTo(150, 100);
    ctx.lineTo(210, 175);
    ctx.fill();

    // draw second tree
    ctx.fillStyle = 'rgb(127, 0, 0)';
    ctx.fillRect(450, 250, 50, 75);

    ctx.fillStyle = 'rgb(0, 127, 14)';
    ctx.beginPath();
    ctx.moveTo(375, 275);
    ctx.lineTo(475, 200);
    ctx.lineTo(575, 275);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(395, 225);
    ctx.lineTo(475, 150);
    ctx.lineTo(555, 225);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(415, 175);
    ctx.lineTo(475, 100);
    ctx.lineTo(535, 175);
    ctx.fill();

    // draw trird tree
    ctx.fillStyle = 'rgb(127, 0, 0)';
    ctx.fillRect(800, 250, 50, 75);

    ctx.fillStyle = 'rgb(0, 127, 14)';
    ctx.beginPath();
    ctx.moveTo(725, 275);
    ctx.lineTo(825, 200);
    ctx.lineTo(925, 275);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(745, 225);
    ctx.lineTo(825, 150);
    ctx.lineTo(905, 225);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(765, 175);
    ctx.lineTo(825, 100);
    ctx.lineTo(885, 175);
    ctx.fill();
}

function drawCar(ctx) {

    ctx.fillStyle = 'rgb(255, 216, 0)';
    ctx.fillRect(375, 335, 250, 50);

    ctx.beginPath();
    ctx.moveTo(400, 335);
    ctx.lineTo(425, 300);
    ctx.lineTo(575, 300);
    ctx.lineTo(600, 335);
    ctx.fill();

    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.moveTo(400, 335);
    ctx.lineTo(600, 335);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(500, 300);
    ctx.lineTo(500, 385);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(510, 345);
    ctx.lineTo(525, 345);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(410, 345);
    ctx.lineTo(425, 345);
    ctx.stroke();

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.arc(425, 400, 25, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(575, 400, 25, 0, 2 * Math.PI);
    ctx.fill();
}

function draw() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    drawBackground(ctx);
    drawTrees(ctx);
    drawCar(ctx);
}

window.onload = function() {
    draw();
};