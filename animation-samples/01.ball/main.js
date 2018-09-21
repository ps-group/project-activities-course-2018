function Ball(startX, startY, radius) {
    this.x = startX;
    this.y = startY;
    this.r = radius;
}

function drawBackground({ctx, width, height}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
}

function drawBall({ctx, ball}) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
}

function redraw({ctx, width, height, ball}) {
    drawBackground({ctx, width, height});
    drawBall({ctx, ball});
}


function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const ball = new Ball(Math.floor(width / 2), Math.floor(height / 2), 30);

    redraw({
        ctx,
        width,
        height,
        ball,
    });
}