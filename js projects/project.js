// insert points 
// determine number of lines 
// collect points 
// start the game 
// check if user won 
// give the user points 
// play again 

var prompt = require('prompt-sync')();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
}
const SYMBOLS_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2,
}

function getEnteredAmount() {
    while(true){
        const enteredAmount = prompt("Enter an amount of points: ");
        const enteredAmountToNumber = parseFloat(enteredAmount);
        if(isNaN(enteredAmountToNumber) || enteredAmountToNumber <=0){
            console.log("Invalid entry. Retry!") 
        } else {
            console.log(enteredAmountToNumber);
            return enteredAmountToNumber;
        }
    }
}
function getNumberOfLines(){
    while(true){
        const lines = prompt("Choose number of lines you expect to win (1-3) : ");
        const linesToNumber = parseFloat(lines);
        if (isNaN(linesToNumber) || linesToNumber <= 0 || linesToNumber > 3) {
            console.log("Invalid entry. Retry!");
        } else {
            console.log(linesToNumber);
            return linesToNumber;
        }
    }
}
function getPoints(enteredAmount,numberOfLines) {
    while(true){
        const points = prompt("Enter points per line : ");
        const pointsToNumber = parseFloat(points);
        if (isNaN(pointsToNumber) || pointsToNumber <= 0 || pointsToNumber > enteredAmount/numberOfLines ) {
            console.log("Invalid entry. Retry!");
        } else {
            console.log(pointsToNumber);
            return pointsToNumber;
        }
    }
}
function play() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    console.log("all symbols :");
    console.log(symbols);

    const tables = [];
    const tableSymbols = symbols;
    for(let i =0; i<COLUMNS; i++){
        tables.push([]); //add amount of tables inside table => table[[],[],...]
        for(let j =0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * tableSymbols.length);
            const selectedSymbol = tableSymbols[randomIndex];
            tables[i].push(selectedSymbol);
            tableSymbols.splice(randomIndex, 1); //delete 1 element at sepecefied randomindex

        }
    }
    console.log("tables before transposing :");
    console.log(tables);
    return tables;
}

function transpose(tables){
    const rows=[];

    for(let i = 0 ; i< ROWS; i++){
        rows.push([]);
        for(let j=0; j< COLUMNS; j++){
            rows[i].push(tables[j][i])
        }
    }
    console.log("transposing:");
    console.log(rows);
    return rows;
}
function printRows(rows){
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){ //i is the index of the array  , symbol is the value of the array
            rowString = rowString+symbol;
            if (i != row.lenth - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}
function getWinnings(rows, points, numberOfLines){
    let winnings = 0
    for(let i = 0; i<numberOfLines; i++){
        const symbols = rows[i];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings = winnings + points * SYMBOLS_VALUES[symbols[0]]
        }
    }
    console.log("You won, "+winnings.toString()+" pts!");
}

let enteredAmount = getEnteredAmount();
const numberOfLines = getNumberOfLines();
const points = getPoints(enteredAmount,numberOfLines);
const tables=play();
const rows = transpose(tables);
printRows(rows);
const winnings=getWinnings(rows,points,numberOfLines);
