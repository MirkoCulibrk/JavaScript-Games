const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');
canvas.width=600;
canvas.height=600;

//making player
class Player{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    //drawing w
    draw(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);

    }
    update(){
        this.draw();
    }
}
const player=new Player(600/2,600-50,80,50,'white');
function update(){
    //treba nam da se svaki frejm poziva ista funkcija 
    requestAnimationFrame(update);
    player.draw();
}
//pokrene se jednom update
update();
//definisanje key kodova za tablu
const UP_ARROW=38;
const DOWN_ARROW=40;
const RIGTH_ARROW=39;
const LEFT_ARROW=37;
//dodaje se novi keys na windows posto on slusa za promene

window.addEventListener("keyup",(e)=>{
    //treba da pita sta se desava kad krene sa stiskanjem dugmeta
    if(e.keyCode===UP_ARROW){
        //player treba da ide gore
    }
});