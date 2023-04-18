// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var buttons = $(".saveBtn");
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", saveNote); //cycles through each save button to add the event listener of "click" so that is saves upon click
  }

  function saveNote(){
    var currentDiv = this.parentElement; // saveNote function is called by clicking on the save button, "this" refers to button that was clicked, gives us the Div the button was inside of 
    var key = currentDiv.id; //the key is the id of the parent element of the button 
    var text = currentDiv.querySelector(".description").value; // the text input is gathered by the query selector by looking only within a certain div 
    window.localStorage.setItem(key, text); //sets the key and value to local storage 
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var timeBlocks = $(".time-block"); //this variable now holds all of the elements with the class of "time-block"
  var currentHour = dayjs().format("H");
    for(var i = 0; i < timeBlocks.length; i++){
      var blockId = timeBlocks[i].id;
      var blockHour = Number(blockId.slice(5)); //this line removes the number from the block id and turns it into an integer
      if(blockHour < currentHour){
        timeBlocks[i].classList.add("past");
        timeBlocks[i].classList.remove("present");
        timeBlocks[i].classList.remove("future");
      } else if (blockHour == currentHour){
        timeBlocks[i].classList.add("present");
        timeBlocks[i].classList.remove("past");
        timeBlocks[i].classList.remove("future");
      } else {
        timeBlocks[i].classList.add("future");
        timeBlocks[i].classList.remove("present");
        timeBlocks[i].classList.remove("past");
      }
    }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
    for (var i = 0; i < timeBlocks.length; i++){
      var blockId = timeBlocks[i].id; //cycles through each time block
      var storedItem = window.localStorage.getItem(blockId); //retrieves stored text from local storage

      var currentBlock = $("#"+blockId)[0]; //finds and saves within a variable the current block id
      var currentText = currentBlock.querySelector(".description"); 
      currentText.textContent = storedItem; 
    }



  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay")[0].textContent=dayjs().format("dddd, MMMM D, YYYY");
}) 