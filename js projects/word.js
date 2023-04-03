//how many points u have 
//enter name 
//how many letters you will get right 
//amount of letters multiply winning points 
//get winnings 

var prompt = require('prompt-sync')();



const getPoints = () => {
    while(true){
        const points = prompt("How many points do you have : ");
        const pointsToNumber = parseInt(points); 
        if(isNaN(pointsToNumber) || pointsToNumber <= 0){
            console.log("Invalid, try again!"); 
        } else {
            console.log(pointsToNumber);
            return pointsToNumber;
        }
    }
}
const getName = () => {
    while(true){
        const name = prompt("Type a name : ");
        const number = parseInt(name); 
        if( Number.isInteger(number) ) {
            console.log("Invalid, try again with only strings!"); 
        } else {
            console.log(name);
            return name;
        }
    }
}
 
function getNumberOfletters(name){
    while(true){
        const letters = prompt("How many letters you can guess to come out correct : ");
        const numberOfLetters = parseInt(letters); 
        if(isNaN(numberOfLetters) || numberOfLetters  < 0 || numberOfLetters > name.length){
            console.log("Invalid letters, try again!"); 
        } else {
            console.log(numberOfLetters);
            return numberOfLetters;
        }
    }
}

function randomize(name){  
    const nameArray = Array.from(name); //from string to array
    console.log("name as an array : " );
    console.log(nameArray );
    console.log("array length : "+nameArray.length);
    const counter = nameArray.length;
    const randomizedName = [];
    for(let i=0; i< counter; i++){
        const randomIndex = Math.floor(Math.random() * nameArray.length);
        const selectedLetter = nameArray[randomIndex];
        randomizedName.push(selectedLetter);
        nameArray.splice(randomIndex, 1);
    }
    console.log("name at end :");
    console.log(name);
    console.log("nameArray at end :");
    console.log(nameArray);
    console.log("randomizedName at end:");
    console.log(randomizedName);
    return randomizedName;
}

function play(randomizedName) {
    console.log("randomizedName at the start:")
    console.log(randomizedName);
    const counter = randomizedName.length;
    const reRandomizedName = [];
    for(let i = 0; i<counter; i++){
        const randomIndex = Math.floor(Math.random() * randomizedName.length) 
        const selectedLetter = randomizedName[randomIndex];
        reRandomizedName.push(selectedLetter);
        randomizedName.splice(randomIndex, 1);
    }
    console.log("randomizedName at the end:")
    console.log(randomizedName);
    console.log("reRandomizedName at the end:");
    console.log(reRandomizedName);
    return reRandomizedName;
}
function checkWin(name,reRandomizedName,numberOfLetters){
    const nameArray = Array.from(name);
    let counter = 0;
    for (let i = 0 ; i < nameArray.length ; i++) {
        if (nameArray[i] === reRandomizedName[i]){
            counter++;
        }
        
    }
    if (counter > 0) {
        console.log("u won the guess with " + numberOfLetters + " that are correct!");
    }else {
        console.log("u lost the guess ");
    }
}

getPoints();
const name =getName();
const numberOfletters = getNumberOfletters(name);
const randomizedName = randomize(name);
const reRandomizedName = play(randomizedName);
checkWin(name,reRandomizedName,numberOfletters);


//still need to check for 0 letters in checkwin function 
// i must add points mutiplayer that depends on number of letters 
// maybe at the end also the positions that are guessed to be correct insatead of just the number of letters