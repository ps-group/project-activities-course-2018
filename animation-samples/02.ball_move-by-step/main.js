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

function moveBall({dx, dy, ball}) {
    ball.x += dx;
    ball.y += dy;
}


function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const RADIUS = 30;
    const ball = new Ball(Math.floor(width / 2), height - RADIUS, RADIUS);

    const DX = 10;
    const DY = -10;

    {
        redraw({ctx, width, height, ball});
        moveBall({dx: DX, dy: DY, ball});
        redraw({ctx, width, height, ball});
    }

    // {
    //     redraw({ctx, width, height, ball});
    //     setTimeout(() => {
    //         moveBall({dx: DX, dy: DY, ball});
    //         redraw({ctx, width, height, ball});
    //     }, 1000);
    // }

    // {
    //     redraw({ctx, width, height, ball});
        
    //     const ANIMATION_DELAY = 300;
    //     const animateFn = () => {
    //             moveBall({dx: DX, dy: DY, ball});
    //             redraw({ctx, width, height, ball});
    //             setTimeout(animateFn, ANIMATION_DELAY);
    //     }

    //     animateFn();
    // }
}