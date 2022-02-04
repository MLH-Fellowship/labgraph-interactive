document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByTagName("form")[0].onsubmit = function (evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0, 150);
  };

  // Get the focus to the text input to enter a word right away.
  document.getElementById("terminalTextInput").focus();

  // Getting the text from the input
  var textInputValue = document
    .getElementById("terminalTextInput")
    .value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById("terminalReslutsCont")
    .innerHTML;

  // Clear text input
  var clearInput = function () {
    document.getElementById("terminalTextInput").value = "";
  };

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function () {
    var terminalResultsDiv = document.getElementById("terminalReslutsCont");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  };

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextToResults = function (textToAdd) {
    document.getElementById("terminalReslutsCont").innerHTML +=
      "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  };

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function () {
    // Array of all the help keywords
    var helpKeyWords = [
      "- python brain_waves.py",
      "- python population.py",
      "- python water_levels.py",
      "- Github",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date.",
      "- 'cat videos' will make you even happier",
      "* There are more keywords that you have to discover by yourself.",
    ].join("<br>");
    addTextToResults(helpKeyWords);
  };

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function (postTimeDay) {
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10) {
      // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10) {
      // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time") {
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date") {
      addTextToResults(currentDate);
    }
  };

  // Opening links in a new window
  var openLinkInNewWindow = function (linkToOpen) {
    window.open(linkToOpen, "_blank");
    clearInput();
  };

  // Having a specific text reply to specific strings
  var textReplies = function () {
    var img1 = document.getElementById("image1");
    var img2 = document.getElementById("image2");
    var img3 = document.getElementById("image3");
    switch (textInputValueLowerCase) {
      // funny replies [START]

      case "python population.py":
        clearInput();
        img1.style.display = "initial";
        img2.style.display = "none";
        img3.style.display = "none";
        break;
      case "python brain_waves.py":
        clearInput();
        img2.style.display = "initial";
        img1.style.display = "none";
        img3.style.display = "none";
        break;
      case "python water_levels.py":
        clearInput();
        img3.style.display = "initial";
        img1.style.display = "none";
        img2.style.display = "none";
        break;
      case "i love you":
      case "love you":
      case "love":
        clearInput();
        addTextToResults(
          "Aww! That's so sweet 😍. Here's some love for you too ❤ ❤ ❤ !"
        );
        break;

      case "git":
        clearInput();
        addTextToResults(
          "git push origin master <br>you can check this project's repo on GitHub: <a target='_blank' href='https://github.com/MahdiF/mahdif.com/tree/master/lab/web-terminal'>https://github.com/MahdiF/mahdif.com/tree/master/lab/web-terminal</a>"
        );
        break;

      case "git status":
        clearInput();
        addTextToResults("nothing to commit, working directory clean.");
        break;

      case "git push origin master":
        clearInput();
        addTextToResults("Push me baby!");
        break;

      case "hello":
      case "hi":
      case "hola":
        clearInput();
        addTextToResults(
          "Hello, it's me... I was wondering if after all these years you'd like to meet... 😍"
        );
        break;

      case "cat":
        clearInput();
        addTextToResults("Meow!! 🐱<br> psst: try typing (cat videos)");
        break;

      case "cat videos":
      case "cat v":
        addTextToResults("Okay I'll show you some in YouTube.");
        openLinkInNewWindow(
          "https://www.youtube.com/results?search_query=cat videos"
        );
        break;

      case "lol":
      case "trololo":
        addTextToResults("Mr. Trololo!");
        openLinkInNewWindow("https://www.youtube.com/watch?v=1uTAJG3Khes");
        break;
      // funny replies [END]

      case "youtube":
        clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;

      case "github":
        clearInput();
        openLinkInNewWindow("https://github.com/facebookresearch/labgraph");
        break;

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
        clearInput();
        addTextToResults(
          "<p><i>The command " +
            "<b>" +
            textInputValue +
            "</b>" +
            " was not found. Type <b>Help</b> to see all commands.</i></p>"
        );
        break;
    }
  };

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function () {
    textInputValue = document.getElementById("terminalTextInput").value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    if (textInputValue != "") {
      //checking if text was entered
      addTextToResults(
        "<p class='userEnteredText'>> " + textInputValue + "</p>"
      );
      if (textInputValueLowerCase.substr(0, 5) == "open ") {
        //if the first 5 characters = open + space
        openLinkInNewWindow("http://" + textInputValueLowerCase.substr(5));
        addTextToResults(
          "<i>The URL " +
            "<b>" +
            textInputValue.substr(5) +
            "</b>" +
            " should be opened now.</i>"
        );
      } else if (textInputValueLowerCase.substr(0, 8) == "youtube ") {
        openLinkInNewWindow(
          "https://www.youtube.com/results?search_query=" +
            textInputValueLowerCase.substr(8)
        );
        addTextToResults(
          "<i>I've searched on YouTube for " +
            "<b>" +
            textInputValue.substr(8) +
            "</b>" +
            " it should be opened now.</i>"
        );
      } else if (textInputValueLowerCase.substr(0, 7) == "google ") {
        openLinkInNewWindow(
          "https://www.google.com/search?q=" + textInputValueLowerCase.substr(7)
        );
        addTextToResults(
          "<i>I've searched on Google for " +
            "<b>" +
            textInputValue.substr(7) +
            "</b>" +
            " it should be opened now.</i>"
        );
      } else if (textInputValueLowerCase.substr(0, 5) == "wiki ") {
        openLinkInNewWindow(
          "https://wikipedia.org/w/index.php?search=" +
            textInputValueLowerCase.substr(5)
        );
        addTextToResults(
          "<i>I've searched on Wikipedia for " +
            "<b>" +
            textInputValue.substr(5) +
            "</b>" +
            " it should be opened now.</i>"
        );
      } else {
        textReplies();
      }
    }
  };
});
