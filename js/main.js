var newCanvas = createCanvas(800,800),
    canvas = newCanvas.canvas,
    ctx = newCanvas.context;

var currentChain = 0,
    maxChain = 0,
    points = 5,
    balls = [
        new Ball(30, 'blue', {x: 40, y: 200}),
        new Ball(30, 'red', {x: 600, y: 200})
    ],
    chain = [], chainTime = 0;



setInterval(function() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(var i = 0; i < balls.length; i++){
        balls[i].tick();
    }
    currentChain = chain.length;
    if(currentChain > maxChain){
        points = currentChain-maxChain;
        maxChain = currentChain;
    }
    renderScore();

    if(chainTime > 0)chainTime -= (1000/60)/1000;
}, 1000/60);



function renderScore(){
    ctx.font = '20px Helvetica';
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillText('Current Chain:' + currentChain,10,30);
    ctx.fillText('Max Chain:' + maxChain,10,50);
    ctx.fillText('Points:' + points,10,70   );
}

function createCanvas(width, height){
    var canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('style', 'border: 1px solid black;')
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    canvas.addEventListener('click', function(event) {
        var x = event.offsetX,
            y = event.offsetY;
        if(points >= 1){
            balls.push(new Ball(30, getRandomColor(), {x: x, y: y}, 0, 3));
            points--;
        }
    }, false);
    return {canvas: canvas, context: ctx}
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor(){
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}


