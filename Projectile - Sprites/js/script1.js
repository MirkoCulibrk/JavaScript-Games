const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//making player
class Player{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        //crta se na ctx
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
}
class Projectale{
    constructor(x,y,radius,color,valocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.valocity=valocity;
    }
    draw(){
        //crta se na ctx
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
    update(){
        this.draw();
        this.x=this.x+this.valocity.x;
        this.y=this.y+this.valocity.y;
    }
    
}

const player=new Player(canvas.width/2,canvas.height/2,20,"white");
let projectals=[];
function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle='rgba(0,0,0,0.9)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    //aniamte all the projecetals 
    projectals.forEach((projectal)=>{
        projectal.update();
    }); 
}
window.addEventListener('load',()=>{
    animate();
});
window.addEventListener('click',(e)=>{
    console.log(player.y)
    const distance=Math.atan2(e.clientY-canvas.height/2,e.clientX-canvas.width/2);
    console.log(distance);
    const valocity={
        x:Math.cos(distance),
        y:Math.sin(distance)
    };
    projectals.push(new Projectale(canvas.width/2,canvas.height/2,5,"white",valocity));
});