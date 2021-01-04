const timeLeft=document.querySelector('#time-left');
const startBtn=document.querySelector('.start');
const result=document.querySelector('#score');
const squeres=document.querySelectorAll('.square');
//how much is time for a game
let timer=10;
let score=0;
function addAMole(){
  //first remove all of the existing moles
  squeres.forEach((squere)=>{
    squere.classList.remove('mole');
  });
  //adding mole
  let randomPosition = squeres[Math.floor(Math.random() * 9)]
  randomPosition.classList.add('mole')

  //position where is mole
  hitPosition = randomPosition.id;
}
//loop to each squere
squeres.forEach((squere)=>{
  squere.addEventListener('click',()=>{
    //checking if clicked squere.id is the same as squere with the mole insade
    if(squere.id===hitPosition){
      score+=1;
      result.textContent=score;
      hitPosition=null;
    }
  });
});
//count down
function countDown(countDownTimer,moleTimer){
  timer--;
  timeLeft.innerHTML=timer;
  if(timer===0){
    clearInterval(countDownTimer);
    clearInterval(moleTimer);
    alert(`Your game is over. Your results is ${score}`);

  }
}
//initialize on start button
startBtn.addEventListener('click',()=>{
  let timerId=setInterval(countDown,1000);
  let timerMole=setInterval(addAMole,600);
  console.log(timerMole,timerId)
  countDown(timerId,timerMole);
  timeInterval();
});