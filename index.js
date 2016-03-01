var g_context = {
    FPS: 30,
    gameIsRunning: true,
    lastTime: new Date(),
    widthCanvas: 300,
    heightCanvas: 150,
    maxRadiusArc: 20,
    minRadiusArc: 1,
    canvas: document.getElementById("canvas"),
    context: canvas.getContext("2d"),
    isPaused: false,
    speedChangeDir: 0.1,
}
g_context.ball = new Ball();

function buttonDraw()
{
    g_context.context.fillStyle = "#fff";
    g_context.context.font = "italic 8pt Arial";
    g_context.context.fillText("Start", 10, 10);
    g_context.context.fillText("Stop", 250, 10);
}

function gameLoop()
{
    var currentTime = new Date();
    var deltaTime = currentTime - g_context.lastTime;
    update(deltaTime);
    render();
}

function update(deltaTime)
{
    g_context.ball.update(deltaTime);
}

function render()
{
    g_context.ball.render();
}

function Ball()
{
    this.speed = 0.1;
    this.x = parseInt(Math.random() * (g_context.widthCanvas - g_context.maxRadiusArc) + g_context.maxRadiusArc);
    this.y = parseInt(Math.random() * (g_context.heightCanvas - g_context.maxRadiusArc) + g_context.maxRadiusArc);
    this.radius = 1;
    this.changeSizeDir = true; //True - increase, flase - reduction //rename!
    this.update = function(deltaTime)
    {
        if (this.radius > g_context.maxRadiusArc)
        {
            this.changeSizeDir = false;
        }
        else if (this.radius < g_context.minRadiusArc)
        {
            this.changeSizeDir = true;
        }
        if (this.changeSizeDir)
        {
            this.radius += this.speed * deltaTime / 1000;
        }
        else
        {
            this.radius -= this.speed * deltaTime / 1000;
        }
    }
    this.render = function()
    {
        g_context.context.clearRect(0, 0, 1200, 600);
        buttonDraw();
        g_context.context.beginPath();
        g_context.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        g_context.context.fillStyle = "#33FFFF";
        g_context.context.fill();
    }
}

buttonDraw();

g_context.canvas.addEventListener('mousedown', checkMousePosition, false);

function checkMousePosition(e)
{
    // Check Start Button
    var minValueOfStartButtonX = 35;
    var maxValueOfStartButtonX = 155;
    var minValueOfStartButtonY = 0;
    var maxValueOfStartButtonY = 40;
    if ((e.offsetX > minValueOfStartButtonX) && (e.offsetX < maxValueOfStartButtonX))
    {
        if ((e.offsetY > minValueOfStartButtonY) && (e.offsetY < maxValueOfStartButtonY))
        {
            startGame();
			console.log("start");
        }
    }
    // Check Stop Button
    var minValueOfStopButtonX = 1000;
    var maxValueOfStopButtonX = 1100;
    var minValueOfStopButtonY = 0;
    var maxValueOfStopButtonY = 40;
    if ((e.offsetX > minValueOfStopButtonX) && (e.offsetX < maxValueOfStopButtonX))
    {
        if ((e.offsetY > minValueOfStopButtonY) && (e.offsetY < maxValueOfStopButtonY))
        {
            stopGame();
			console.log("stop");
        }
    }
}

function startGame()
{
    g_context.intervalId = setInterval(gameLoop, 1000 / g_context.FPS);
}

function stopGame()
{
    clearInterval(g_context.intervalId);
    g_context.lastTime = new Date();
}