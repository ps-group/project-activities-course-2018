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
}) {
    this.x = startX;
    this.y = startY;
    this.dirX = directionX;
    this.dirY = directionY;
    this.r = radius;
    this.color = color;
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

function redraw({ctx, boxWidth, boxHeight, ball}) {
    drawBackground({ctx, boxWidth, boxHeight});
    drawBall({ctx, ball});
}

function moveBall({ball, boxWidth, boxHeight, dt}) {
    const MOVE_SPEED = 300; //за 1 s
    const distance = MOVE_SPEED * dt;

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
    const RECOLOR_SPEED = 0.25 * HslColor.MAX_HUE; //за 1 s
    const hue = (ball.color.h + RECOLOR_SPEED * dt) % HslColor.MAX_HUE;

    ball.color.h = hue;
}

function update({ball, dt, boxWidth, boxHeight}) {
    moveBall({ball, boxWidth, boxHeight, dt});
    recolorBall({ball, dt});
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
        color: new HslColor({
            hue: 0,
            saturation: 1,
            lightness: 0.3,
        }),
    });

    redraw({ctx, width, height, ball});

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({
            ball,
            boxWidth: width,
            boxHeight: height,
            dt: deltaTime,
        });
        redraw({
            ball,
            boxWidth: width,
            boxHeight: height,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }

    animateFn();
}