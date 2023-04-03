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
    const nameCopy = Array.from(name); //from string to array
    console.log("name as an array : " );
    console.log(nameCopy );
    console.log("array length : "+nameCopy.length);
    const counter = nameCopy.length;
    const randomizedName = [];
    for(let i=0; i< counter; i++){
        const randomIndex = Math.floor(Math.random() * nameCopy.length);
        const selectedLetter = nameCopy[randomIndex];
        randomizedName.push(selectedLetter);
        nameCopy.splice(randomIndex, 1);
    }
    console.log("name at end :");
    console.log(name);
    console.log("nameCopy at end :");
    console.log(nameCopy);
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

getPoints();
const name =getName();
getNumberOfletters(name);
const randomizedName = randomize(name);
play(randomizedName);