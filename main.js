const remainDiv=document.getElementById('remainDiv');
const remainForm=document.getElementById('remainForm');
const dateInput=document.getElementById('date-picker');

const timeDiv=document.getElementById('timeDiv');
const timeSpans=document.querySelectorAll('span');
const reset=document.getElementById('reset');
const complate=document.getElementById('complate');
const complatebutton=document.getElementById('complatebutton');

let chosenDate='';
let currentDate=new Date().getTime();
let currentTime;
let localTime;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

const today=new Date().toISOString().split('T')[0];

dateInput.setAttribute('min',today);

function updateDOM(){
    currentTime=setInterval(()=>{
    const now = new Date().getTime();
    const betweenDate=currentDate-now;
    const days=Math.floor(betweenDate/day);
    const hours=Math.floor((betweenDate%day)/hour);
    const minutes=Math.floor((betweenDate%hour)/minute);
    const seconds=Math.floor((betweenDate%minute)/second);
    remainDiv.hidden=true;
        if(betweenDate<0){
            timeDiv.hidden=true;
            clearInterval(currentTime);
            complate.hidden=false;
        }
        else{
            timeDiv.hidden=false;
            timeSpans[0].textContent=`${days}`;
            timeSpans[1].textContent=`${hours}`;
            timeSpans[2].textContent=`${minutes}`;
            timeSpans[3].textContent=`${seconds}`;
        }
    },1000)
}

function calculateTime(e){
e.preventDefault();
chosenDate=remainForm.date.value;
localTime={
    date:chosenDate,
};
localStorage.setItem('time',JSON.stringify(localTime));

if(chosenDate==''){
    alert('Lütfen Tarih Seçiniz!!!')
}
else{
    currentDate=new Date(chosenDate).getTime();
    updateDOM();
}
}

function resetB(){
    timeDiv.hidden=true;
    complate.hidden=true;
    remainDiv.hidden=false;
    clearInterval(currentTime);
    localStorage.removeItem('time');
}


function refleshTime(){

    if(localStorage.getItem('time'))
    {
        remainDiv.hidden=true;
        localTime=JSON.parse(localStorage.getItem('time'));
        chosenDate=localTime.date;
        currentDate=new Date(chosenDate).getTime();
        updateDOM();
    }
}

remainForm.addEventListener('submit',calculateTime);
reset.addEventListener('click',resetB);
complatebutton.addEventListener('click',resetB);
refleshTime();