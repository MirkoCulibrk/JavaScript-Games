import {loadFrog} from './sprite.js';
import {loadBackground} from './loader.js';
const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');
//size of canvas with 4:3 ratio in 
canvas.width=450;
canvas.height=600;
const keys=[];
//all of keyCodes
const UP_ARROW=38;
const DOWN_ARROW=40;
const RIGTH_ARROW=39;
const LEFT_ARROW=37;
const object={
    x:1255,
    y:1444,
    z:1777
}
const {q,w,e}=object;
console.log(q,w,e)
//treba nam sad da crta se ta slika na contextu
function drawFrog(character,context,positonX,positionY){
    //draw on canvas it takes type of sprite,where to draw,position where to draw
    character.draw('frog-idle',context,positonX,positionY);
}
const player={
    //this is default position
    x:190,
    y:520,
    width:80,
    height:80,
    frameX:0,
    frameY:0,
    speed:2,
    //using moving for idle position or moving
    moving:false
}
Promise.all([loadBackground('/img/gameboard.gif'),
            loadFrog()])
            .then(([background,frog])=>{
                //draw background picture on canvas
                ctx.drawImage(background,0,0,450,600);
              
                //postion of frog on screen
                drawFrog(frog,ctx,player.x,player.y);
});












function animate(){
    //treba nam da se svaki frejm poziva ista funkcija 
    requestAnimationFrame(animate);
    // movePlayer();
}
//pokrene se jednom update


//dodaje se novi keys na windows posto on slusa za promene


//both of these listeners to remove delay between changing arrow
window.addEventListener("keydown",(e)=>{
    //add keyCode to keys array
    keys[e.keyCode]=true;
});
window.addEventListener("keyup",(e)=>{
    delete keys[e.keyCode];
});

function movePlayer(){
    if(keys[38]){
        player.y-=player.speed;
    }
}
animate()
