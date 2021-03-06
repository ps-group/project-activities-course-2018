const METER_IN_PX = 300;

const KeyCode = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    INSERT: 45,
    DELETE: 46,
    KEY_0: 48,
    KEY_1: 49,
    KEY_2: 50,
    KEY_3: 51,
    KEY_4: 52,
    KEY_5: 53,
    KEY_6: 54,
    KEY_7: 55,
    KEY_8: 56,
    KEY_9: 57,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    LEFT_META: 91,
    RIGHT_META: 92,
    SELECT: 93,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    SEMICOLON: 186,
    EQUALS: 187,
    COMMA: 188,
    DASH: 189,
    PERIOD: 190,
    FORWARD_SLASH: 191,
    GRAVE_ACCENT: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    SINGLE_QUOTE: 222
};
Object.freeze(KeyCode);

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

function applyFrictionalForce({ball, dt}) {
    const ANTISPEED_VALUE = 3;
    const antiSpeed = ball.speed.normalize().multiplyScalar(-1 * ANTISPEED_VALUE * dt);
    if (antiSpeed.length() >= ball.speed.length()) {
        ball.speed = new Vec2(0, 0); 
    }
    else {
        ball.speed = ball.speed.add(antiSpeed);
    }
}

function update({balls, dt}) {
    for (const ball of balls) {
        applyFrictionalForce({ball, dt});
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

    const KEYBOARD_MOVE_DISTANCE = 1;
    document.addEventListener("keydown", (event) => {
        let directionForce = null;
        switch(event.keyCode) {
            case KeyCode.LEFT_ARROW:
                directionForce = Direction.LEFT;
                break;
            case KeyCode.RIGHT_ARROW:
                directionForce = Direction.RIGHT;
                break;
            case KeyCode.UP_ARROW:
                directionForce = Direction.UP;
                break;
            case KeyCode.DOWN_ARROW:
                directionForce = Direction.DOWN;
                break;
            default:
                directionForce = Vec2.ZERO;
        }

        ball.speed = ball.speed.add(directionForce.multiplyScalar(KEYBOARD_MOVE_DISTANCE));
    });

    redraw({ctx, balls: [ball]});

    let lastTimestamp = Date.now();
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