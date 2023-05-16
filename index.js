window.onload = function () {
  let guessCount = 1;
  let guessMax = 5;
  //We are using Math.ceil to we never get 0 as a winningNumber
  let winningNumber = Math.ceil(Math.random() * 100);
  //Create an empty array to hold all of our past guesses
  let pastGuesses = [];
  //Create variable so we can manupulate the guess data without changing
  //our original guess input.
  let playersGuess = null;

  const playerInput = document.getElementById("player-input");
  const submitButton = document.getElementById("submit");
  const result = document.getElementById("title");
  const guessList = document.getElementById("guess-list");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const hintOutput = document.getElementById("subtitle");

  //Create the game start settings that we can reset back to at any time.
  const gameStart = () => {
    guessCount = 1;
    pastGuesses = [];
    winningNumber = Math.ceil(Math.random() * 100);
    //inserting the original html into guessList to reset all guess
    //fields instead of just the previous guess field.
    guessList.innerHTML = `
    <li class="guess">
            <a href="#" class="show-option" title="Guess will appear here">
              <i>‒</i>
            </a>
          </li>
          <li class="guess">
            <a href="#" class="show-option" title="Guess will appear here">
              <i>‒</i>
            </a>
          </li>
          <li class="guess">
            <a href="#" class="show-option" title="Guess will appear here">
              <i>‒</i>
            </a>
          </li>
          <li class="guess">
            <a href="#" class="show-option" title="Guess will appear here">
              <i>‒</i>
            </a>
          </li>
          <li class="guess">
            <a href="#" class="show-option" title="Guess will appear here">
              <i>‒</i>
            </a>
          </li>
    `;
    result.style.fontSize = "45px";
    result.textContent = "Guessing Game";
    hintOutput.textContent = "Guess a number between 1 - 100";
    playerInput.value = "";
    playersGuess = null;
    submitButton.disabled = false;
    hintButton.disabled = false;
    playerInput.disabled = false;
    playerInput.focus();
  };

  //Determine the difference between the guess value and the winning value.
  //Checkout Math.abs here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  const guessDifference = () => {
    return Math.abs(playersGuess - winningNumber);
  };

  //Determine if the guess value is lower (or less) than the winning value.
  const isLower = () => {
    return playersGuess < winningNumber;
  };

  //Make sure that the input is actually a number between 1-100
  // and if it is, assign the value to playersGuess variable.
  // Call the checkGuess function to continue.
  const guessSubmission = (guess) => {
    if (isNaN(guess) || guess < 1 || guess > 100) {
      return (result.textContent = "That is an invalid guess.");
    }
    playersGuess = guess;
    return checkGuess();
  };

  //Now we need to check if the guess is correct or incorrect and
  //do stuff with that information.
  const checkGuess = () => {
    //If the guess is correct, then disable our buttons and change
    //the subtitle and title to the correct values.
    if (playersGuess == winningNumber) {
      hintButton.disabled = true;
      submitButton.disabled = true;
      hintOutput.textContent = "RESET THE GAME to play again!";
      return (result.textContent = `You win!`);
      //If the guess isn't correct, first check to make sure it isn't a repeat guess
      //that way, it won't count against the players maximum guesses. Change
      //title to render appropriate error message.
    } else if (pastGuesses.indexOf(playersGuess) > -1) {
      return (result.textContent = "You already guessed that one!");
      //If the guess isn't correct AND it isn't a repeat guess,
      //push the guess into the pastGuesses array and find the
      //guest-list child index that matches with the pastGuesses length.
      //Change the text content of that guest-list child to the playersGuess
      //value.
    } else {
      pastGuesses.push(playersGuess);
      let prevGuess = document.querySelector(
        `#guess-list li:nth-child(${pastGuesses.length})`
      );
      prevGuess.textContent = playersGuess;
      //When you reach the point where the pastGuesses array length is
      //equal to the maximum amount of guesses (player loses), then disable the input and
      //all buttons except for reset; change the subtitle to correct
      //value; change font size of title to fit and to the correct value.
      if (pastGuesses.length === guessMax) {
        hintButton.disabled = true;
        submitButton.disabled = true;
        playerInput.disabled = true;
        hintOutput.textContent = "RESET THE GAME to play again!";
        result.style.fontSize = "30px";
        return (result.textContent = `You Lose. 
        Winning Number: ${winningNumber}`);
        //If the player hasn't used up all of their guesses and they haven't guessed
        //the winning number, then figure out the difference between their
        //current guess and the winning number.
        //Change the title and subtitle values to reflect how close the player is
        //to the winning number and whether to increment and decrement their next
        //guess.
      } else {
        let difference = guessDifference();
        if (isLower()) {
          hintOutput.textContent = "Guess Higher!";
        } else {
          hintOutput.textContent = "Guess Lower!";
        }
        if (difference < 10)
          return (result.textContent = "🔥You're burning up!🔥");
        //emojis make things more fun...
        else if (difference < 25)
          return (result.textContent = "🌡You're lukewarm.🌡");
        else if (difference < 50)
          return (result.textContent = "🏂You're chilly.🏂");
        else return "🧊You're ice cold!🧊";
      }
    }
  };

  //Create a way of providing random numbers that will include the answer
  //and two other numbers that are near the answer based on the playersGuess
  //value.
  const provideHint = () => {
    let random1 = winningNumber;
    let random2 = winningNumber;

    //Make sure the conditions of the while loop stay met as long as we are
    //within our chosen count. Starting value is 0
    let count = 0;
    //As long as the two random numbers match, or either random number matches
    //the playersGuess, keep the count incrementing - keeping us in the while loop.
    while (
      random1 === random2 ||
      random1 === playersGuess ||
      random2 === playersGuess
    ) {
      count++;
      //If the playersGuess is larger than the winning number, random1 and random2
      //  will be random numbers with the min option being 1 and the max option being
      //  less than the absolute value of playersGuess. Because of the way Math.ceil
      //  works, the value may be rounded up to the playersGuess.
      if (playersGuess > winningNumber) {
        random1 = Math.ceil(Math.random() * Math.abs(playersGuess - 1) + 1);
        random2 = Math.ceil(Math.random() * Math.abs(playersGuess - 1) + 1);
      } else {
        //If the playersGuess is not larger than the winning number, random1 and random2
        //  will be random number with the min option being being playersGuess and the
        //  max option being less than the absolute value of 100 minus playersGuess.
        //  again Math.ceil rounds values up.
        random1 = Math.ceil(
          Math.random() * Math.abs(100 - playersGuess) + playersGuess
        );
        random2 = Math.ceil(
          Math.random() * Math.abs(100 - playersGuess) + playersGuess
        );
      }
      //When our count reaches 5000, the while loop breaks and the while loop
      //conditions will no longer be met.
      if (count > 5000) {
        break;
      }
    }
    //Set the winningNumber and both random numbers into an array.
    let hintArray = [winningNumber, random1, random2];
    //return the hintArray after we have shuffled the numbers around
    return shuffle(hintArray);
  };

  //*********** SHUFFLE INVOLVES SOME POINTERS **************//
  //This is a way of moving items around in an array but assigning variables
  //to different indexes so you can use them as pointers as you
  //move over that array. This is fun stuff but can see confusing.
  //Imagine a cups game where you are the game-runner. You have 3 solo cups
  //and only one has a coin under it. As you move the cups around, you will
  //need to track where that coin is, while the game player doesn't really know.
  //This is what we are doing here. Let's say we write a number on each solo cup.
  //The number on the solo cups would be the indicies of each
  //array element, the solo cup itself is the array element, and
  //either "empty cup" or "coin" would be like the value of the array element.
  //We use the indicies to point to or track each element and then assign an
  //element to the value of another element. This is a powerful tool!
  const shuffle = (array) => {
    //We take in the hintArray and create a variable to hold
    // the array's length, current element and previous element.
    //EXAMPLE: array = [15, 14, 5], right now elements = 3,
    // currElement = undefined, lastElement = undefined.
    let elements = array.length,
      currElement,
      lastElement;

    //While there are elements...(ie. while elements array length is > 0)
    while (elements) {
      //Get random index using the last index of the array as the max value
      //EXAMPLE:  FIRST LOOP lastElement index = 1 if we stop here, array = [(3), 15, 14, 5]
      //          SECOND LOOP lastElement index = 1 if we stop here, array = [(3), 15, 5, 14]
      //          THIRD LOOP lastElement index = 0 if we stop here, array = [(3), 15, 5, 14]
      lastElement = Math.floor(Math.random() * elements--);
      //assign current element VALUE equal to the VALUE of the elements index.
      //EXAMPLE:  FIRST LOOP elements index = 2, currentElement = 5 (this is the value of the last elements index)
      //          SECOND LOOP elements index = 1, currentElement = 5
      //          THIRD LOOP elements index = 0, currentElement = 15
      currElement = array[elements];
      //Make the VALUE of elements index equal to the VALUE of last element index.
      //EXAMPLE:  FIRST LOOP array[elements] was 5 and is now equal to 14 which is index 1 of
      //          the original array. If we stop right now array = [(3), 15, 14, 14]
      //          SECOND LOOP array[elements] was 5 and is still equal to 5 which is index 1 of
      //          the second loop starting array. If we stop now, array = [(3), 15, 5, 14]
      //          THIRD LOOP array[elements] was 15 and is still equal to 15 with is index 0 of the
      //          third loop starting array. If we stop now, array = [(3), 15, 5, 14]
      array[elements] = array[lastElement];
      //Make the VALUE of lastElement index equal to the VALUE of the currElement.
      //EXAMPLE:  FIRST LOOP lastElement index (1) now equals the old currElement value of 5; array = [(3), 15, 5, 14]
      //          SECOND LOOP lastElement index (1) now equals the old currElement value of 5; array = [(3), 15, 5, 14]
      //          THIRD LOOP lastElement index (0) now equals the old currElement value of 15; array = [(3), 15, 5, 14]
      array[lastElement] = currElement;
      //We have now reached the point where elements array length is 0 since we have looped
      //through every index in the array. This means we will move out of our while loop and
      //return our shuffled array!
    }
    return array;
  };

  //Assign our current input to a variable to "hold" it while
  //we clear our input field. Assign the title text content to
  //the results of the guessSubmission function.
  const createGuess = () => {
    let newGuess = playerInput.value;
    playerInput.value = "";
    result.textContent = guessSubmission(newGuess);
  };

  //***EVENT LISTENERS ***//

  //When the submit button is clicked, the createGuess function is called.
  submitButton.addEventListener("click", () => {
    createGuess();
    playerInput.focus();
  });

  //When the player presses enter instead of clicking submit, the createGuess function is called.
  //**note: .keyCode is deprecated so it is better to use .key and type the key string.
  //**hint: on how to determine what instance property value to use - console.log
  //event before the if statement and look at what instance properites exist on
  //that event. Then you will know what to use in your event listener!
  playerInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      createGuess();
    }
  });

  //When the hintButton is clicked, the title text content is changed to the
  //correct value
  hintButton.addEventListener("click", () => {
    let hints = provideHint();
    playerInput.focus();
    result.style.fontSize = "30px";
    result.textContent = `Your hints: ${hints[0]}, ${hints[1]}, or ${hints[2]}`;
  });

  //When the resetButton is clicked, gameStart function is called and that sets
  //the app back to the original html settings.
  resetButton.addEventListener("click", () => {
    gameStart();
  });
};
