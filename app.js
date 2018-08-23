var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


/*================================paddle=========================*/

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
// console.log(canvas.width);
var rightPressed = false;
var leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // ctx.fillStyle= "#0095dd";
    ctx.fill();
    ctx.closePath();
}
/*================================paddle=========================*/

/*================================ball=========================*/

var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle ="blue";
    ctx.fill();
    ctx.closePath();
}
/*================================ball=========================*/

/*================================brick=========================*/

var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}



function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

/*================================end of brick=========================*/


/*================================key handling=========================*/

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

/*================================end of key handling=========================*/

/*================================mouse handling=========================*/

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX, canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
/*================================end of mouse handling=========================*/

/*================================collision=========================*/
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("you win, conggs");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
/*================================end of collision=========================*/


/*================================end of score=========================*/

var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    // ctx.fillStyle = "#0095dd";
    ctx.fillText("Score:" + score, 8, 20);
}
/*================================end of score=========================*/

/*=================================player lifes=========================*/

var lives = 3;

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillText("Lives:" + lives, canvas.width - 65, 20);
}
/*=================================end of player lifes=========================*/


/*================================main=========================*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ctx.fillStyle = get_random_color();
        document.getElementById("colorx").innerHTML = get_random_color();

    }
    if (y + dy < ballRadius) {
        dy = -dy;
        ctx.fillStyle = get_random_color();
        document.getElementById("colory").innerHTML = get_random_color();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("game over");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    //paddle move logic
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);

}
draw();
/*================================main=========================*/



/*================================random color=========================*/

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

/*================================random color=========================*/


// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// // ctx.strokeStyle="rgba(0,0,255,0.5)";
// ctx.fill();
// ctx.closePath();



// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// // ctx.fillStyle = "#FF0000";
// ctx.strokeStyle = "rgba(0,0,255,0.5)";
// ctx.stroke();
// ctx.closePath();

// //end of first lesson