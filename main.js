var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
var radius = canvas.height / 2;
ctx.translate(radius,radius);
radius *= .9;

setInterval(drawClock(),1000);

function drawClock() {
    
    drawClockFace(ctx,radius);
    drawClockNumbers(ctx,radius);
    drawTime(ctx, radius);

}
function drawClockFace(ctx, radius) {

    //white circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    //Outside ring
    var grad = ctx.createRadialGradient(0,0,radius*.95,0,0,radius*1.05);
    grad.addColorStop(0,'#333');
    grad.addColorStop(.5,'white');
    grad.addColorStop(1,'#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius *.1;
    ctx.stroke();

    //middle circle
    ctx.beginPath();
    ctx.arc(0,0,radius *.1,0,2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawClockNumbers(ctx, radius) {

    var angle;
    var num;
    ctx.font = radius * .15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    for (num = 1; num < 13; num++){
        angle = num * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius * .85);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(angle);
        ctx.translate(0, radius * .85);
        ctx.rotate(-angle);
    }

}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes() ;
    var sec = now.getSeconds();

    //hour
    hour = hour % 12;
    hour = (hour*Math.PI/6) + (min *Math.PI/(6*60)) + (sec * Math.PI/(360 * 60));
    drawHand(ctx, hour, radius *.6,radius *.07);
    //minute
    min = (min*Math.PI/(6*60)) + (sec * Math.PI/(360 * 60));
    drawHand(ctx, min,radius * 0.8, radius * .05);
    //second
    sec = (sec * Math.PI/(60*360));
    drawHand(ctx, sec, radius *.9, radius *.02);

}

function drawHand(ctx, pos, length, width ) {

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}