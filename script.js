function init() {

  var buttons = $(".saveBtn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", saveNote);
  }

    function saveNote() {
      var currentDiv = this.parentElement;
      var key = currentDiv.id;
      var text = currentDiv.querySelector(".description").value;
      window.localStorage.setItem(key, text);
    }


    var timeBlocks = $(".time-block");
    var currentHour = dayjs().format("H");
    for (var i = 0; i < timeBlocks.length; i++) {
      var blockId = timeBlocks[i].id;
      var blockHour = Number(blockId.slice(5));
      if (blockHour < currentHour) {
        timeBlocks[i].classList.add("past");
        timeBlocks[i].classList.remove("present");
        timeBlocks[i].classList.remove("future");
      } else if (blockHour == currentHour) {
        timeBlocks[i].classList.add("present");
        timeBlocks[i].classList.remove("past");
        timeBlocks[i].classList.remove("future");
      } else {
        timeBlocks[i].classList.add("future");
        timeBlocks[i].classList.remove("present");
        timeBlocks[i].classList.remove("past");
      }
    }


    for (var i = 0; i < timeBlocks.length; i++) {
      var blockId = timeBlocks[i].id;
      var storedItem = window.localStorage.getItem(blockId);

      var currentBlock = $("#" + blockId)[0];
      var currentText = currentBlock.querySelector(".description");
      currentText.textContent = storedItem;
    }


    $("#currentDay")[0].textContent = dayjs().format("dddd, MMMM D, YYYY");

  }
init();