const DIRECTION = {
    UP: -1,
    DOWN: 1,
    LEFT: -1,
    RIGHT: 1,
}

function HslColor({
    hue,
    saturation,
    lightness,
}) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;

    this.toFillStyle = function () {
        const h = Math.floor(this.h);
        const s = this.s * 100;
        const l = this.l * 100;
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
}

HslColor.MAX_HUE = 360;

function Ball({
    startX,
    startY,
    radius,
    directionX,
    directionY,
    color,
    moveSpeed,
    recolorSpeed,
}) {
    this.x = startX;
    this.y = startY;
    this.dirX = directionX;
    this.dirY = directionY;
    this.r = radius;
    this.color = color;
    this.moveSpeed = moveSpeed;
    this.recolorSpeed = recolorSpeed;
}

function drawBackground({ctx, boxWidth, boxHeight}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, boxWidth, boxHeight);
}

function drawBall({ctx, ball}) {
    ctx.fillStyle = ball.color.toFillStyle();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
}

function redraw({ctx, boxWidth, boxHeight, balls}) {
    drawBackground({ctx, boxWidth, boxHeight});
    for (const ball of balls) {
        drawBall({ctx, ball});
    }
}

function moveBall({ball, boxWidth, boxHeight, dt}) {
    const distance = ball.moveSpeed * dt;

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

function recolorBall({ball, dt}) {
    const hue = (ball.color.h + ball.recolorSpeed * dt) % HslColor.MAX_HUE;

    ball.color.h = hue;
}

function update({balls, dt, boxWidth, boxHeight}) {
    for (const ball of balls) {
        moveBall({ball, boxWidth, boxHeight, dt});
        recolorBall({ball, dt});
    }
}

function createRandomBall({boxWidth, boxHeight}) {
    const startX = Math.random() * boxWidth;
    const startY = Math.random() * boxHeight;
    const radius = Math.random() * 40 + 10;
    const directionX = Math.random() > 0.5 ? DIRECTION.LEFT : DIRECTION.RIGHT;
    const directionY = Math.random() > 0.5 ? DIRECTION.UP : DIRECTION.DOWN;
    const moveSpeed = Math.random() * 500 + 10;
    const recolorSpeed = Math.random() * HslColor.MAX_HUE;
    const hue = Math.random() * HslColor.MAX_HUE;
    const saturation = Math.random();
    const lightness = Math.random();

    return new Ball({
        startX,
        startY,
        radius,
        directionX,
        directionY,
        moveSpeed,
        recolorSpeed,
        color: new HslColor({
            hue,
            saturation,
            lightness,
        }),
    });
}


function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const balls = [];
    const MAX_BALLS = 100;
    for (let i = 0; i < MAX_BALLS; ++i) {
        balls.push(createRandomBall({
            boxWidth: width,
            boxHeight: height,
        }));
    }

    redraw({ctx, width, height, balls});

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({
            balls,
            boxWidth: width,
            boxHeight: height,
            dt: deltaTime,
        });
        redraw({
            balls,
            boxWidth: width,
            boxHeight: height,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }

    animateFn();
}