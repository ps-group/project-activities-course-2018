const DIRECTION = {
    UP: -1,
    DOWN: 1,
    LEFT: -1,
    RIGHT: 1,
}

function Ball({
    startX,
    startY,
    radius,
    directionX,
    directionY,
}) {
    this.x = startX;
    this.y = startY;
    this.dirX = directionX;
    this.dirY = directionY;
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

function moveBall({distance, ball, boxWidth, boxHeight}) {
    ball.x += ball.dirX * distance;
    ball.y += ball.dirY * distance;

    if ((ball.x - ball.r) < 0) {
        ball.dirX = DIRECTION.RIGHT;
    }
    if ((ball.x + ball.r) > boxWidth) {
        ball.dirX = DIRECTION.LEFT;
    }
    if ((ball.y - ball.r) < 0) {
        ball.dirY = DIRECTION.DOWN;
    }
    if ((ball.y + ball.r) > boxHeight) {
        ball.dirY = DIRECTION.UP;
    }
}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const RADIUS = 30;
    const ball = new Ball({
        startX: Math.floor(width / 2),
        startY: Math.floor(height / 2),
        radius: RADIUS,
        directionX: DIRECTION.RIGHT,
        directionY: DIRECTION.UP,
    });

    redraw({ctx, width, height, ball});
    const BALL_SPEED = 300; //30px в секунду

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        const distance = BALL_SPEED * deltaTime;
        moveBall({
            distance,
            ball,
            boxWidth: width,
            boxHeight: height,
        });
        redraw({ctx, width, height, ball});
        requestAnimationFrame(animateFn);
    }

    animateFn();
}