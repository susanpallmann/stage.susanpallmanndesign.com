/* A minesweeper game because I like websites with easter eggs. */
// Global Variables
var roundNumber = 0;
var currentID = 0;
var blocks = [];
var rows = 0;
var roundArray = [];
var numberMarked = 0;
var maxMarked = 0;
var firstClick;

function roundLookup(num1, num2, par) {
  var x = num1;
  var y = num2;
  var parameter = par;
  if ( parameter === null ) {
    console.log("this fired!!!");
    var outerArray = roundArray[x];
    console.log(x + " " + y);
    var item = outerArray[y];
    var query = item;
  } else {
    var outerArray = roundArray[x];
    var item = outerArray[y];
    var query = item[parameter];
  }
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
function swapItems(x, y, xRan, yRan) {
  var a = roundArray[x][y];
  var b = roundArray[xRan][yRan];
  roundArray[x][y] = b;
  roundArray[xRan][yRan] = a;
  console.log('replacement is done!');
}
function chooseRandom(x, y, par) {
  var x = x;
  var y = y;
  var xRan = Math.floor(Math.random() * rows);
  var yRan = Math.floor(Math.random() * 12);
  var item = roundLookup(xRan, yRan, par);
  if ( item === true ) {
    chooseRandom(par);
  } else {
    swapItems(x, y, xRan, yRan);
  }
}
function getIndex (arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}
$( document ).ready(function() {
  // Block Constructor
  function Block(id, bomb) {
    this.idNum = id;
    this.isBomb = bomb;
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
    $('#minesweeper .row').remove(".block-container"); 
    // Reset blocks and round arrays
    blocks = [];
    roundArray = [];
    // Reset currentID and numberMarked
    currentID = 0;
    numberMarked = 0;
    maxMarked = 0;
    // Prepare firstClick variable
    firstClick = true;
    // Increase the round number
    roundNumber++;
    // Determine number of rows based on current round
    rows = 11 + roundNumber;
    // Calculate how many blocks are needed for this round
    var numBlocks = rows*12;
    // Calculate how many of the blocks should be bombs
    var numBombs = parseInt(numBlocks*0.16);
    for (i=0; i < rows; i++) {
      for (j=0; j < 12; j++) {
        //var thisBomb = roundLookup(i, j, "isBomb");
        //var thisID = roundLookup(i, j, "idNum");
        $('#minesweeper').find('.row').append('<div class="column block-container span1 sm"><div class="block" revealed="false" location-y="' + j + '" location-x="' + i + '"></div></div>');
      }
    }
    maxMarked = numBombs;
    $('#remaining').html('Bombs remaining: ' + maxMarked);
    // Fill blocks array with created blocks to the prior specifications, not shuffled; returns array
    blocks = generateBlocks(numBlocks, numBombs);
    // Runs shuffle function and returns new array
    var shuffledBlocks = shuffleBlocks(blocks);
    // Set original array to new shuffled array
    blocks = shuffledBlocks;
    // Assign the blocks to each row
    assignRows(blocks, rows);
    wakeUp();
  }
  $('h1').click(function() {
    roundSetup();
  });
});
function wakeUp() {
  function checkBlock (block) {
    console.log("this is looking at the following block: " + block);
    if (block.attr('revealed') === "false") {
      block.attr('revealed', 'true');
      var x = block.attr("location-x");
      var y = block.attr("location-y");
      console.log("this is looking up if it's a bomb using " + x + " and " + y);
      var isBomb = roundLookup(x, y, "isBomb");
      console.log(isBomb);
      if (isBomb) {
        if ( firstClick === true ) {
          console.log("first click is true, firing");
          firstClick = false;
          console.log(x + " " + y);
          chooseRandom(x, y, "isBomb");
          block.attr('revealed', 'false');
          checkBlock(block);
        } else {
          block.attr('bomb',true);
        }
        //End round
      } else {
        if ( firstClick === true ) {
          firstClick = false;
        }
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
          if ( block.attr('number') ) {
            console.log('block attribute number exists');
          } else {
            //Add number to block
            block.append('<p>' + count + '</p>');
            block.attr('number', count);
            console.log('block attribute number should be set');
          }
        } else {
          block.attr('clear',true);
          var moreAnswers = checkSurrounding(x, y, null);
          for (var i = 0; i < moreAnswers.length; ++i){
            var neededObject = moreAnswers[i];
            console.log(neededObject);
            var arrLocation = getIndex(roundArray,neededObject);
            console.log(arrLocation[0] + " " + arrLocation[1]);
            var yNeeded = arrLocation[1]+1;
            console.log(yNeeded);
            var xNeeded = arrLocation[0]*12;
            console.log(xNeeded);
            var locationNum = xNeeded + yNeeded;
            console.log(locationNum);
            var correspondingBlock = $('#minesweeper .row div:nth-child(' + locationNum + ') .block');
            console.log(correspondingBlock);
            checkBlock(correspondingBlock);
            console.log("recursive stuff " + correspondingBlock);
          }
        }
      }
    }
  }
  $('[revealed="false"]').mousedown(function(event) {
    switch (event.which) {
      case 1:
          checkBlock($(this));
        break;
      case 2:
        break;
      case 3:
        if ( $(this).attr('flagged') === 'true' ) {
          $(this).attr('flagged',false);
          numberMarked--;
          var score = maxMarked - numberMarked;
          $('#remaining').html('Bombs remaining: ' + score);
        } else {
          if ( numberMarked < maxMarked ) {
            $(this).attr('flagged',true);
            numberMarked++;
            var score = maxMarked - numberMarked;
            $('#remaining').html('Bombs remaining: ' + score);
          } else {
            // Run check if complete function
            
          }
        }
        break;
      default:
        break;
    }
  });
}
