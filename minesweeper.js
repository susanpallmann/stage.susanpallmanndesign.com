/* A minesweeper game because I like websites with easter eggs. */
// Global Variables
var roundNumber = 0;
var currentID = 0;
var blocks = [];
var rows = 0;
var roundArray = [];

function roundLookup(num1, num2, par) {
  var x = num1;
  var y = num2;
  var parameter = par;
  var outerArray = roundArray[x];
  var item = outerArray[y];
  var query = item[parameter];
  return query;
}

function checkSurrounding(num1, num2, par) {
  var x = parseInt(num1);
  console.log(x);
  var y = parseInt(num2);
  console.log(y);
  var parameter = par;
  var options = [
    [x-1, y-1],
    [x-1, y],
    [x-1, y+1],
    [x, y-1],
    [x, y+1],
    [x+1, y-1],
    [x+1, y],
    [x+1, y+1]
  ];
  console.log(options);
  var answers = [];
  for (i=0; i<8; i++) {
    var xNew = options[i][0];
    console.log(xNew);
    var yNew = options[i][1];
    console.log(yNew);
    if (xNew >= 0 && xNew < (rows) && yNew >= 0 && yNew < 12 ) {
      var answerNew = roundLookup(xNew, yNew, parameter);
      console.log(answerNew);
      answers.push(answerNew);
    }
  }
  return answers;
}

$( document ).ready(function() {

  // Block Constructor
  function Block(id, bomb) {
    this.idNum = id;
    this.isBomb = bomb;
  }

  // On Game Start

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

  function generateBlocks(numBlo, bombs) {
    // Empty array to put our blocks in
    var blockArray = [];
    // Variable to store the new blocks we're creating
    var newBlock
    // Importing our numbers from the roundSetup function
    numBlocks = numBlo;
    numBombs =  bombs;
    // Set currentID to 1
    currentID++;
    // Generate bomb block objects using Block constructor
    for (i=0; i < numBombs; i++) {
      newBlock = new Block(currentID, true);
      // Increase currentID each iteration so each block has a unique ID number
      currentID++;
      // Push the new block into the blockArray
      blockArray.push(newBlock);
    }
    // Generate non-bomb block objects using Block constructor
    for (i=numBombs; i < numBlocks; i++) {
      newBlock = new Block(currentID, false);
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
      for (j=0; j < 12; j++) {
        // Push current block to current row
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
  
  // On Round Start
  function roundSetup () {
    // Reset blocks and round arrays
    blocks = [];
    roundArray = [];
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
    /* temporary TODO remove */
    for (i=0; i < 12; i++) {
      for (j=0; j < 12; j++) {
        var thisBomb = roundLookup(i, j, "isBomb");
        var thisID = roundLookup(i, j, "idNum");
        $('#minesweeper').find('.row').append('<div class="column block-container span1 sm"><div class="block" revealed="false" bomb=' + thisBomb + ' location-y="' + j + '" location-x="' + i + '" block-id="' + thisID + '"></div></div>');
      }
    }
    wakeUp();
  }
  
  // On Round End

  // On Game Lose
  $('h1').click(function() {
    roundSetup();
  });
});
function wakeUp() {
  // On Block Click
  // TODO change back to false
  $('.block[revealed="false"]').click(function() {
    $(this).attr('revealed', 'true');
    var x = $(this).attr("location-x");
    var y = $(this).attr("location-y");
    var isBomb = roundLookup(x, y, "isBomb");
    console.log(isBomb);
    if (isBomb) {
      //End round
    } else {
      var answers = checkSurrounding(x, y, "isBomb");
      console.log(answers);
      var count = 0;
      for (var i = 0; i < answers.length; ++i){
        if (answers[i] === true) {
          count++;
          console.log("the count is " + count);
        }
      }
      if ( count > 0 ) {
        //Add number to block
        $(this).append('<p>' + count + '</p>');
      } else {
        //Clear to all numbers
      }
    }
  });
}
