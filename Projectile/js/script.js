const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//create Player
class Player{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    };
    draw() {
        //declaring global styles for circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle=this.color;
        //filling only for circle,for rect is fillRect
        ctx.fill();

    }
};

//create Projectal
class Projectal{
    constructor(x,y,radius,color,valocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.valocity=valocity;
    }
    draw(){
        //making circle
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, 2 * Math.PI);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
    update(){
        //on each update draw and move projectale by x or y
        this.draw();
        this.x=this.x+this.valocity.x;
        this.y=this.y+this.valocity.y;
    }
}
class Enemy{
    constructor(x,y,radius,color,valocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.valocity=valocity;
    }
    draw(){
        //making circle
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, 2 * Math.PI);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
    update(){
        //on each update draw and move projectale by x or y
        this.draw();
        this.x=this.x+this.valocity.x;
        this.y=this.y+this.valocity.y;
    }
}
const player1=new Player(window.innerWidth/2,window.innerHeight/2,20,'blue');
//all of projectals
const projectals=[];
//all of eneies
const enemies=[];
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player1.draw();
    //for each projectal do update function
    projectals.forEach((projectal)=>{
        projectal.update();
    });
    //draw each enemies on screen
    enemies.forEach((enemy)=>{
        enemy.update();
        projectals.forEach((projectal)=>{
            //check how far is projectal and enemy
            const distance=Math.hypot(projectal.x-enemy.x,projectal.y-enemy.y);
        });
    });
}
//making enemies
function spawnEnemies() {
    setInterval(()=>{
        //random size of radius
        const radius=Math.random()*(30-6)+6;
        let x,y;
        if(Math.random()<0.5){
            //if number is less then 0.5 then y is size of canvas
            x=Math.random()<0.5?0-radius:canvas.width+radius;
            y=Math.random()*canvas.height;
        }else{
            x=Math.random()*canvas.width;
            y=Math.random()<0.5?0-radius:canvas.height+radius;
        }
       
        //getting angle from tanges function in radius
        const angle=Math.atan2(canvas.height/2-y,canvas.width/2-x);
        //getting x and y from sin and con function
        const valocity={
            x:Math.cos(angle),
            y:Math.sin(angle)
        };
        enemies.push(new Enemy(x,y,radius,'green',valocity));
        console.log(enemies);
    },1000);
}
window.addEventListener('click',(e)=>{
    //getting angle from tanges function in radius
    const angle=Math.atan2(e.clientY-canvas.height/2,e.clientX-canvas.width/2);
    //getting x and y from sin and con function
    const valocity={
        x:Math.cos(angle),
        y:Math.sin(angle)
    };
        projectals.push(new Projectal(canvas.width/2,canvas.height/2,5,'red',valocity
    ));
});
animate();
spawnEnemies();