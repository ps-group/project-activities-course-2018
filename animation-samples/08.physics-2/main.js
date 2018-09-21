const METER_IN_PX = 300;

const FREE_FALL_ACCELERATION = new Vec2(0, 9.8);

function Vec2(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    };
    this.substract = function(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    };
    this.multiplyScalar = function(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    };
    this.divideScalar = function(scalar) {
        return new Vec2(this.x / scalar, this.y / scalar);
    };
    this.length = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    this.normalize = function() {
        return this.divideScalar(this.length());
    }

    Object.freeze(this);
}

function Ball({
    position,
}) {
    this.position = position;
    this.speed = new Vec2(0, 0);
}
Ball.RADIUS = 0.1;

function drawBackground({ctx, boxWidth, boxHeight}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, boxWidth * METER_IN_PX, boxHeight * METER_IN_PX);
}

function drawBall({ctx, ball}) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.position.x * METER_IN_PX, ball.position.y * METER_IN_PX, Ball.RADIUS * METER_IN_PX, 0, Math.PI * 2);
    ctx.fill();
}

function redraw({ctx, boxWidth, boxHeight, balls}) {
    drawBackground({ctx, boxWidth, boxHeight});
    for (const ball of balls) {
        drawBall({ctx, ball});
    }
}

function moveBall({ball, dt}) {
    const moveDistance = ball.speed.multiplyScalar(dt);
    ball.position = ball.position.add(moveDistance);
}

function update({balls, dt}) {
    for (const ball of balls) {
        ball.speed = ball.speed.add(FREE_FALL_ACCELERATION.multiplyScalar(dt));
    }
    for (const ball of balls) {
        moveBall({ball, dt});
    }
}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth / METER_IN_PX;
    const height = canvasEl.offsetHeight / METER_IN_PX;
    const ctx = canvas.getContext('2d');

    const ball = new Ball({
        position: new Vec2(Math.floor(width / 2), Ball.RADIUS * 2),
    });

    /*const ball = new Ball({
        position: new Vec2(Math.floor(width / 2), height - Ball.RADIUS * 2),
    });
    ball.speed = new Vec2(1, -4);*/

    redraw({ctx, balls: [ball]});

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001;
        lastTimestamp = currentTimeStamp;

        update({
            balls: [ball],
            dt: deltaTime,
        });
        redraw({
            boxWidth: width,
            boxHeight: height,
            balls: [ball],
            ctx,
        });
        requestAnimationFrame(animateFn);
    }

    animateFn();
}