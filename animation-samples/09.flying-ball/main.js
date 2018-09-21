function Ball({
    startX,
}) {
    this.x = startX;
}

Ball.RADIUS = 30;
Ball.SPEED = 300;

function drawBackground({ctx, boxWidth, boxHeight}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, boxWidth, boxHeight);
}

function drawBall({ctx, ball}) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, Math.sin(ball.x / (Ball.RADIUS * 3)) * Ball.RADIUS * 3 + Ball.RADIUS * 5, Ball.RADIUS, 0, Math.PI * 2);
    ctx.fill();
}

function redraw({ctx, boxWidth, boxHeight, balls}) {
    drawBackground({ctx, boxWidth, boxHeight});
    for (const ball of balls) {
        drawBall({ctx, ball});
    }
}

function moveBall({ball, boxWidth, dt}) {
    const EDGE_DISTANCE = Ball.RADIUS * 3;
    ball.x += Ball.SPEED * dt;

    if (ball.x > boxWidth + EDGE_DISTANCE) {
        ball.x = -EDGE_DISTANCE;
    }
}

function update({balls, dt, boxWidth}) {
    for (const ball of balls) {
        moveBall({ball, boxWidth, dt});
    }
}


function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const ball = new Ball({
        startX: width / 2,
    })

    redraw({ctx, width, height, balls: [ball]});

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({
            balls: [ball],
            boxWidth: width,
            boxHeight: height,
            dt: deltaTime,
        });
        redraw({
            balls: [ball],
            boxWidth: width,
            boxHeight: height,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }

    animateFn();
}