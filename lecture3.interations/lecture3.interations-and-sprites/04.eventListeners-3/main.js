const METER_IN_PX = 300;

function isFloatEqual(f1, f2) {
    const EPSILON = 0.01;
    return Math.abs(f1 - f2) < EPSILON;
}

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
        const length = this.length();
        return length ? this.divideScalar(this.length()) : new Vec2(0, 0);
    }
    this.isEqual = function(vec) {
        return isFloatEqual(this.x, vec.x) && isFloatEqual(this.y, vec.y)
    }

    Object.freeze(this);
}
Vec2.ZERO = new Vec2(0, 0);

const Direction = {
    UP: new Vec2(0, -1),
    DOWN: new Vec2(0, 1),
    LEFT: new Vec2(-1, 0),
    RIGHT: new Vec2(1, 0),
}
Object.freeze(Direction);

function Ball({
    position,
}) {
    this.position = position;
    this.target = this.position;
}
Ball.RADIUS = 0.1;
Ball.SPEED = 1;

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

function redraw({ctx, boxWidth, boxHeight, ball}) {
    drawBackground({ctx, boxWidth, boxHeight});
    drawBall({ctx, ball});
}

function moveBall({ball, dt}) {
    if (ball.position.isEqual(ball.target))
    {
        return;
    }

    const moveDirection = ball.target.substract(ball.position);
    const distanceToMove = Math.min(Ball.SPEED * dt, moveDirection.length());
    ball.position = ball.position.add(moveDirection.normalize().multiplyScalar(distanceToMove));
}

function update({ball, dt}) {
    moveBall({ball, dt});
}

function processMouseEventsForBall({ball, lastMousePos, dt}) {
    ball.target = lastMousePos;
}

function processMouseEvents({ball, lastMousePos, dt}) {
    processMouseEventsForBall({ball, lastMousePos, dt});
}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth / METER_IN_PX;
    const height = canvasEl.offsetHeight / METER_IN_PX;
    const ctx = canvas.getContext('2d');

    const ball = new Ball({
        position: new Vec2(Math.floor(width / 2), Ball.RADIUS * 2),
    });

    let lastMousePos = ball.position;
    canvasEl.addEventListener("click", (event) => {
        lastMousePos = new Vec2(event.offsetX / METER_IN_PX, event.offsetY / METER_IN_PX);
    });

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001;
        lastTimestamp = currentTimeStamp;

        processMouseEvents({
            ball,
            lastMousePos,
            dt: deltaTime,
        });
        update({
            ball,
            dt: deltaTime,
        });
        redraw({
            boxWidth: width,
            boxHeight: height,
            ball,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }

    animateFn();
}