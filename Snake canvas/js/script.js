const snakeboard=document.querySelector('#gameCanvas');
const snakeboard_ctx=snakeboard.getContext('2d');
//default position for drawing snake
let snake=[{x:200,y:200},{x:190,y:200},{x:180,y:200},{x:170,y:200}];
//colors of the snake and board
const snakeFill='lightblue';
const snakeStroke='darkblue';
const boardBackground='white';
const boardStroke='black';
//horizontal movment
const dx=10;
//vertical movemnet
const dy=0;
init();

//function for drawing snake
function drawSnakeParts(snakeParts){
    snakeboard_ctx.fillStyle=snakeFill;
    snakeboard_ctx.strokeStyle=snakeStroke;
    snakeboard_ctx.fillRect(snakeParts.x,snakeParts.y,10,10);
    snakeboard_ctx.strokeRect(snakeParts.x,snakeParts.y,10,10);
}
//function for clearing canvas before game start
function clearCanvas(){
    console.log("clear");
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
    //removing last element form array
    snake.pop();
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
    const LEFT_ARROW=40;
    const RIGHT_ARROW=40;
    const keyPressed=e.keyCode;
    const goingRight=dx;;
    const goingUp=-dy;
    const goingDown=dy;
    const goingLeft=-dy;
    if(keyPressed===UP_ARROW && !goingDown){
        dy=-10;
        dx=0;
    }else if(keyPressed===RIGHT_ARROW && !goingLeft){
        dx=10;
        dy=0;
    }else if(keyPressed===LEFT_ARROW && !goingRight){
        dx=-10;
        dy=0;
    }else if(keyPressed===DOWN_ARROW && !goingUp){
        dx=0;
        dy=10;
    }
}
document.addEventListener('keyup',changeDirection);
function init(){
    setTimeout(function onTick(){
        clearCanvas();
        snakeMovement();
        drawSnake();
        //caling init to decrease number of calling functions
        init();
    },500);
    
}
