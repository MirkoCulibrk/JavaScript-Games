const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const score=document.querySelector('.score');
const modalScore=document.querySelector('#modalScore');
const startBtn=document.querySelector('#start-btn');
const modal=document.querySelector('#modal');
let innitalScore=0;

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
//friction for particle
const friction=0.99
class Particles{
    constructor(x,y,radius,color,valocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.valocity=valocity;
        this.alpha=1;
    }
    draw(){
        //making circle
        ctx.save();
        ctx.globalAlpha=this.alpha;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, 2 * Math.PI);
        ctx.fillStyle=this.color;
        ctx.fill();
        ctx.restore();
    }
    update(){
        //on each update draw and move projectale by x or y
        this.draw();
        this.valocity.x*=friction;
        this.valocity.y*=friction;
        this.x=this.x+this.valocity.x;
        this.y=this.y+this.valocity.y;
        this.alpha-=0.01;
    }
}
let player1=new Player(window.innerWidth/2,window.innerHeight/2,10,'white');
//all of projectals
let projectals=[];
//all of eneies
let enemies=[];
let particles=[];
let animationId;
function init(){
    player1=new Player(window.innerWidth/2,window.innerHeight/2,10,'white');
    //all of projectals
    projectals=[];
    //all of eneies
    enemies=[];
    particles=[];
}
function animate() {
    //frame on which is animation
    animationId=requestAnimationFrame(animate);
    ctx.fillStyle='rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player1.draw();
    //render particles on screen
    particles.forEach((particle,index)=>{
        if(particle.alpha<=0){
            particles.splice(index,1);
        }else{
            
        particle.update();
        }
    })
    //for each projectal do update function
    projectals.forEach((projectal,projectalIndex)=>{
        projectal.update();
        //check if projectal touched wall of screen
        if(projectal.x+projectal.radius<0|| projectal.x-projectal.radius>canvas.width || projectal.y+projectal.radius<0 ||projectal.y-projectal.radius>canvas.height){
            setTimeout(()=>{
                //remove projectal from projectals array
                projectals.splice(projectalIndex,1);  
            },0); 
        }
    });
    //draw each enemies on screen
    enemies.forEach((enemy,enemyIndex)=>{
        enemy.update();
        //distance between player and enemy
        const distance=Math.hypot(player1.x-enemy.x,player1.y-enemy.y);
        if(distance-enemy.radius-player1.radius<1){
            //end the game on specific frame
            cancelAnimationFrame(animationId);
            modal.style.display='flex';
            modalScore.innerHTML=innitalScore;
        }
        projectals.forEach((projectal,projectalIndex)=>{
            //check how far is projectal and enemy
            const distance=Math.hypot(projectal.x-enemy.x,projectal.y-enemy.y);
            if(distance-enemy.radius-projectal.radius<1){
                
                setTimeout(()=>{
                    
                    //create explosion
                    for(let i=0;i<enemy.radius*2;i++){
                        particles.push(new Particles(projectal.x,projectal.y,Math.random()*2,enemy.color,{
                            x:(Math.random()-0.5)*(Math.random()*6),
                            y:(Math.random()-0.5)*(Math.random()*6)
                        }));
                    }
                    if(enemy.radius-10>5){
                        //if we srink enemy increse score
                        innitalScore+=20;
                        score.innerHTML=innitalScore;
                        //transition between values to make animation for smaller enemy
                        gsap.to(enemy,{
                            radius:enemy.radius-(projectal.radius*2)
                        })
                    }else{
                        //if we remove enemy from the screen
                        innitalScore+=100;
                        score.innerHTML=innitalScore;
                            //remove enemy from enemies array
                        enemies.splice(enemyIndex,1);  
                    }
                    //remove projectal from projectals array
                    projectals.splice(projectalIndex,1);  
                },0); 
            }
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
        const color=`hsl(${Math.floor(Math.random()*360)},50%,50%)`;
        //getting angle from tanges function in radius
        const angle=Math.atan2(canvas.height/2-y,canvas.width/2-x);
        //getting x and y from sin and con function
        const valocity={
            x:Math.cos(angle),
            y:Math.sin(angle)
        };
        enemies.push(new Enemy(x,y,radius,color,valocity));
    },1000);
}
addEventListener('click',(e)=>{
    //getting angle from tanges function in radius
    const angle=Math.atan2(e.clientY-canvas.height/2,e.clientX-canvas.width/2);
    //getting x and y from sin and con function
    const valocity={
        x:Math.cos(angle)*5,
        y:Math.sin(angle)*5
    };
        projectals.push(new Projectal(canvas.width/2,canvas.height/2,5,'white',valocity
    ));
});
//start game
startBtn.addEventListener('click',()=>{
    init();
    animate();
    spawnEnemies();
    modal.style.display='none';
    score.innerHTML=0;
    innitalScore=0;
    
});
