const snakeboard=document.querySelector('#gameCanvas');
const snakeboard_ctx=snakeboard.getContext('2d');
const scoreDisplay=document.querySelector('.score');
const btnStart=document.querySelector('.start');
//default position for drawing snake
let snake=[{x:200,y:200},{x:190,y:200},{x:180,y:200},{x:170,y:200}];
//colors of the snake and board
const snakeFill='lightblue';
const snakeStroke='darkblue';
const boardBackground='white';
const boardStroke='black';
//horizontal movment
let dx=10;
//vertical movemnet
let dy=0;
let score=0;
let foodX;
let foodY;
btnStart.addEventListener('click',init,grenerateFood);
//function for drawing snake
function drawSnakeParts(snakeParts){
    snakeboard_ctx.fillStyle=snakeFill;
    snakeboard_ctx.strokeStyle=snakeStroke;
    snakeboard_ctx.fillRect(snakeParts.x,snakeParts.y,10,10);
    snakeboard_ctx.strokeRect(snakeParts.x,snakeParts.y,10,10);
}
//function for clearing canvas before game start
function clearCanvas(){
    snakeboard_ctx.fillStyle=boardBackground;
    snakeboard_ctx.strokeStyle=boardStroke;
    snakeboard_ctx.fillRect(0,0,snakeboard.width,snakeboard.height);
    snakeboard_ctx.strokeRect(0,0,snakeboard.width,snakeboard.height);

}
//function for snake movment
function snakeMovement(){
    const snakeHead={x:snake[0].x+dx,y:snake[0].y+dy};
    //adding squeare/head to start of array
    snake.unshift(snakeHead);
    const has_eaten=snake[0].x==foodX && snake[0].y==foodY;
    //if snake head touched food
    if(has_eaten){
        score+=1;
        scoreDisplay.textContent=score;
        grenerateFood();
    }else{
      //removing last element form array
        snake.pop();  
    }
}
//drawing all parts of snake
function drawSnake(){
     //looping trought all object in array snake
    snake.forEach((snakePart)=>drawSnakeParts(snakePart));
}

//function for  control every movment
function changeDirection(e){
    const UP_ARROW=38;
    const DOWN_ARROW=40;
    const LEFT_ARROW=37;
    const RIGHT_ARROW=39;
    const keyPressed=e.keyCode;
    const goingRight=dx===10;
    const goingUp=dy===-10;
    const goingDown=dy===10;
    const goingLeft=dx===-10;
    console.log(dx);
    if (keyPressed === LEFT_ARROW && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_ARROW && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_ARROW && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_ARROW && !goingUp) {
        dx = 0;
        dy = 10;
      }
}
//function for checking if snake hitted wall or tail
function gameEnded(){
    //if snake head hitted tail
    for(let i=4;i<snake.length;i++){
        const has_colited=snake[i].x===snake[0] && snake[i].y===snake[0].y;
        if(has_colited){
            return false;
        }
    }
    //returning which wall is hitted
    const hittedTopWall=snake[0].y<10;
    const hittedRightWall=snake[0].x>snakeboard.width-20;
    const hittedBottomWall=snake[0].y>snakeboard.height-20;
    const hittedLeftWall=snake[0].x<10;
    return hittedLeftWall||hittedRightWall|| hittedBottomWall|| hittedTopWall;
}
//Getting random number for cordination
function randomFood(min,max){
    return Math.floor(Math.random()*((max-min)+min)/10)*10;
}
foodX=randomFood(0,snakeboard.width-10);
    foodY=randomFood(0,snakeboard.height-10);
function grenerateFood(){
    //-snakeboardw
    foodX=randomFood(0,snakeboard.width-10);
    foodY=randomFood(0,snakeboard.height-10);
    //if food is on snake than draw someore else
    snake.forEach(function has_eaten_food(part){
        const has_eaten=part.x==foodX && part.y==foodY;
        if(has_eaten) grenerateFood();
    });
}
//draw food function
function drawFood(){
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(foodX,foodY,10,10);
    snakeboard_ctx.strokeRect(foodX,foodY,10,10)
}
document.addEventListener('keyup',changeDirection);
function init(){
    if(gameEnded())return;

    setTimeout(function onTick(){
        
        clearCanvas();
        drawFood();
        snakeMovement();
        
        drawSnake();
        //caling init to decrease number of calling functions
        init();
    },200);
    
}
