/* A minesweeper game because I like websites with easter eggs. */

$( document ).ready(function() {
// Global Variables
var roundNumber = 0;
var currentID = 0;
var blocks = [];
var rows = 0;
var roundArray = [];

// Block Constructor
function Block(id, bomb) {
  this.idNum = id;
  this.isBomb = bomb;
}

function createBlock(row) {
  var newBlock = Block(id, bomb);
  blocks.push(newBlock);  
}

// On Game Start

// On Round Start
function roundSetup () {
  // Reset blocks array
  blocks = [];
  // Reset currentID
  currentID = 0;
  // Increase the round number
  roundNumber++;
  // Determine number of rows based on current round
  rows = 11 + roundNumber;
  // Calculate how many blocks are needed for this round
  var numBlocks = rows*12;
  // Calculate how many of the blocks should be bombs
  var numBombs = parseInt(numBlocks*0.16);
  // Fill blocks array with created blocks to the prior specifications, not shuffled; returns array
  blocks = generateBlocks(numBlocks, numBombs);
  // Runs shuffle function and returns new array
  var shuffledBlocks = shuffleBlocks(blocks);
  // Set original array to new shuffled array
  blocks = shuffledBlocks;
  // Assign the blocks to each row
  assignRows(blocks, rows);
  console.log(roundArray);
}

// Durstenfeld shuffle
function shuffleBlocks(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function generateBlocks(blocks, bombs) {
  // Empty array to put our blocks in
  var blockArray = [];
  // Variable to store the new blocks we're creating
  var newBlock
  // Importing our numbers from the roundSetup function
  numBlocks = blocks;
  numBombs =  bombs;
  // Set currentID to 1
  currentID++;
  // Generate bomb block objects using Block constructor
  for (i=0; i < numBombs; i++) {
    newBlock = Block(currentID, true);
    // Increase currentID each iteration so each block has a unique ID number
    currentID++;
    // Push the new block into the blockArray
    blockArray.push(newBlock);
  }
  // Generate non-bomb block objects using Block constructor
  for (i=numBombs; i < numBlocks; i++) {
    newBlock = Block(currentID, false);
    // Increase currentID each iteration so each block has a unique ID number
    currentID++;
    // Push the new block into the blockArray
    blockArray.push(newBlock);
  }
  // Returning the array of blocks to roundSetup function
  return blockArray;
}

// Assigns blocks from shuffled array to a row
function assignRows(blocksArr, rowNum) {
  // Importing our numbers from the roundSetup function
  var blocksArray = blocksArr;
  var rowNumber = rowNum;
  // Temporary storage for the present row array
  var currentRow = [];
  // Storage for the current block object
  var currentBlock;
  // Reset currentID again
  currentID = 0;
  // Loop through rows
  for (i=0; i < rowNumber; i++) {
    // Loop through 12 blocks per row
    for (i=0; i < 12; i++) {
      // Push current block to current row
      console.log(blocksArray[currentID]);
      currentRow.push(blocksArray[currentID]);
      // Increase currentID
      currentID++;
    }
    // Push completed row to the overall array
    roundArray.push(currentRow);
    currentRow = [];
  }
  return null;
}

// On Block Click

// On Round End

// On Game Lose
  $('.column.span12').click(function() {
    roundSetup();
  });
});
