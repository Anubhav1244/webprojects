const inputslidder=document.querySelector("[ data-lengthslider  ]");
const pwdlength=document.querySelector("[data-length_numb]");
const cpoybutton=document.querySelector("[data-cpoy_btn]");
const copymsg=document.querySelector("[ data-cpoied_msg]");
const pwddisplay=document.querySelector("[data-passworddisplay]");
const uppercase=document.querySelector("#checkbox1");
const lowercase=document.querySelector("#checkbox2");
const symbol=document.querySelector("#checkbox4");
const number=document.querySelector("#checkbox3");
const signal=document.querySelector("[data-signal]");
const pwdbutton=document.querySelector(".button");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols="@!#$%^&()[]{}:><";
let password="";
let checkcount=0;
let passwordlength=10;
handleslider();
function handleslider(){
    inputslidder.value=passwordlength;
    pwdlength.innerText=passwordlength;
    const min=inputslidder.min;
    const max=inputslidder.max;
    inputslidder.style.backgroundsize=((passwordlength-min)*100/(max-min))+"% 100%";
}
setcolor("#ccc");
function setcolor(color) {
    signal.style.backgroundColor=color;
   
}
function getint(min,max)
{
    
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomnumber()
{
    return getint(0,9);
}

function getlower()
{
    return String.fromCharCode(getint(97,123));
}

function getupper()
{
    return String.fromCharCode(getint(65,91));
}



function randomsymbol()
{
    const randNum = getint(0, symbols.length);
    return symbols.charAt(randNum);
}
function checkstrength()
{
    let hasupper=false;
    let haslower=false;
    let hassymbol=false;
    let hasnumber=false;
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(symbol.checked) hassymbol=true;
    if(number.checked) hasnumber=true;

    if(hasupper&&hasnumber&&hassymbol&&haslower && passwordlength>=8)
    setcolor("#0f0");

    else if(
        (haslower||hasnumber)&&
        (hasupper||hassymbol)&&
        (hassymbol||hasnumber)&&
        passwordlength>=6
    )
    {
        setcolor("#0f0");
    }
    else
    {
        setcolor("#f00");
    }
}

async function copy()
{
    try
    {
        await navigator.clipboard.writeText( pwddisplay.value);// API for copy into clipboard
        copymsg.innerText="Copied";
    }
    catch(e)
    {
        copymsg.innerText="Failed";
    }
    copymsg.classList.add("active");

    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
    
}
inputslidder.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
})
cpoybutton.addEventListener('click',(e)=>{
    if(pwddisplay.value)
        copy();
})
function handlescheckbox() {
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    });

    if (passwordlength<checkcount) {
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlescheckbox);
})
function sufflepassword(array)
{
    for(let i=array.length-1;  i>0; i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    
    
    return str;
}

pwdbutton.addEventListener('click',(e)=>{
    
    if (checkcount==0) {
        return;
    }
    if(passwordlength<checkcount)
    {
        passwordlength=checkcount;
        handleslider();
    }
    
     password="";
    let fucarr=[];
    if (uppercase.checked) {
        fucarr.push(getupper);
    }
    if (lowercase.checked) {
        fucarr.push(getlower);
    }
    if (symbol.checked) {
        fucarr.push(randomsymbol);
    }
    if (number.checked) {
        fucarr.push(getRandomnumber);
    }
    
    for(let i=0;i<fucarr.length;i++)
    {
        password+=fucarr[i]();
    }
    // random;
    
    for(let i=0;i<passwordlength-fucarr.length;i++)
    {
        let randomindex=getint(0,fucarr.length);
        password+=fucarr[randomindex]();
    }
    
    password=sufflepassword(Array.from(password));
    
    
    pwddisplay.value=password;
    checkstrength();
});