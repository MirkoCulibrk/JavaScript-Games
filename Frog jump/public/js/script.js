import {loadFrog,loadBackground} from './sprite.js';
const canvas=document.querySelector('#canvas');
const ctx=canvas.getContext('2d');
canvas.width=600;
canvas.height=600;

//treba nam sad da crta se ta slika na contextu
function drawCharacter(character,context){
    //uzece se taj character kao sprite i onda se na njega poziva draw koji uzima 
    character.draw('frog',context,0,0);
}

Promise.all([loadFrog()])
            .then(([frog])=>{
                drawCharacter(frog,ctx);
            });












function update(){
    //treba nam da se svaki frejm poziva ista funkcija 
    requestAnimationFrame(update);
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

