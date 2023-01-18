window.onload = function () {
  let guessCount = 1;
  let guessMax = 5;
  let winningNumber = Math.ceil(Math.random() * 100);
  let pastGuesses = [];
  let playersGuess = null;

  const playerInput = document.getElementById("player-input");
  const submitButton = document.getElementById("submit");
  const result = document.getElementById("title");
  const guessList = document.getElementById("guess-list");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const hintOutput = document.getElementById("subtitle");

  const gameStart = () => {
    guessCount = 1;
    pastGuesses = [];
    winningNumber = Math.ceil(Math.random() * 100);
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
  };

  const guessDifference = () => {
    return Math.abs(playersGuess - winningNumber);
  };

  const isLower = () => {
    return playersGuess < winningNumber;
  };

  const guessSubmission = (guess) => {
    if (isNaN(guess) || guess < 1 || guess > 100) {
      return (result.textContent = "That is an invalid guess.");
    }
    playersGuess = guess;
    return checkGuess();
  };

  const checkGuess = () => {
    if (playersGuess === winningNumber) {
      hintButton.disabled = true;
      submitButton.disabled = true;
      hintOutput.textContent = "RESET THE GAME to play again!";
      return (result.textContent = `You win! The winning number was ${winningNumber}.`);
    } else if (pastGuesses.indexOf(playersGuess) > -1) {
      return (result.textContent = "You already guessed that one!");
    } else {
      pastGuesses.push(playersGuess);
      console.log("PAST GUESSES LENGTH", pastGuesses.length);
      let prevGuess = document.querySelector(
        `#guess-list li:nth-child(${pastGuesses.length})`
      );
      console.log("Previous Guess", prevGuess);
      prevGuess.textContent = playersGuess;
      if (pastGuesses.length === guessMax) {
        hintButton.disabled = true;
        submitButton.disabled = true;
        playerInput.disabled = true;
        hintOutput.textContent = "RESET THE GAME to play again!";
        result.style.fontSize = "30px";
        return (result.textContent = `You Lose. 
        The winning number was ${winningNumber}.`);
      } else {
        let difference = guessDifference();
        if (isLower()) {
          hintOutput.textContent = "Guess Higher!";
        } else {
          hintOutput.textContent = "Guess Lower!";
        }
        if (difference < 10)
          return (result.textContent = "🔥You're burning up!🔥");
        else if (difference < 25)
          return (result.textContent = "🌡You're lukewarm.🌡");
        else if (difference < 50)
          return (result.textContent = "🏂You're chilly.🏂");
        else return "🧊You're ice cold!🧊";
      }
    }
  };

  const provideHint = () => {
    let random1 = winningNumber;
    let random2 = winningNumber;

    let cycle = 0;
    while (
      random1 === random2 ||
      random1 === playersGuess ||
      random2 === playersGuess
    ) {
      cycle++;
      if (playersGuess > winningNumber) {
        random1 = Math.ceil(Math.random() * Math.abs(playersGuess - 1) + 1);
        random2 = Math.ceil(Math.random() * Math.abs(playersGuess - 1) + 1);
      } else {
        random1 = Math.ceil(
          Math.random() * Math.abs(100 - playersGuess) + playersGuess
        );
        random2 = Math.ceil(
          Math.random() * Math.abs(100 - playersGuess) + playersGuess
        );
      }
      if (cycle > 5000) {
        break;
      }
    }
    let hintArray = [winningNumber, random1, random2];
    return shuffle(hintArray);
  };

  //This is some node traversal - fun fun stuff!
  const shuffle = (array) => {
    //We take in the hintArray and create a variable to hold
    // the array's length, current element and previous element.
    let elements = array.length,
      currElement,
      lastElement;

    //While there are elements...
    while (elements) {
      //Get the last element inside elements
      lastElement = Math.floor(Math.random() * elements--);
      //Switch it with the current element
      currElement = array[elements];
      array[elements] = array[lastElement];
      array[lastElement] = currElement;
    }
    return array;
  };

  const createGuess = () => {
    let newGuess = playerInput.value;
    playerInput.value = "";
    let newOutput = guessSubmission(parseInt(newGuess, 10));
    result.textContent = newOutput;
  };

  submitButton.addEventListener("click", () => {
    createGuess();
  });

  playerInput.addEventListener("keypress", (event) => {
    if (event.key == 13) {
      createGuess();
    }
  });

  hintButton.addEventListener("click", () => {
    let hints = provideHint();
    result.textContent = `The winning number is either ${hints[0]}, ${hints[1]}, or ${hints[2]}.`;
  });

  resetButton.addEventListener("click", () => {
    gameStart();
  });

  // const checkGuess = () => {
  //   if (playerInput.value == answer) {
  //     result.innerHTML = "Correct!";
  //     playerInput.disabled = true;
  //     submit.disabled = true;
  //     return;
  //   }

  //   if (playerInput.value > answer) {
  //     result.innerHTML = "Your guess is too high!";
  //   } else {
  //     result.innerHTML = "Your guess is too low!";
  //   }
  // };
  // const guessCountList = () => {
  //   if (guessCount === guessMax) {
  //     result.innerHTML = "You ran out of guesses.";
  //     guesses.innerHTML += `<li>${playerInput.value}</li>`;
  //     playerInput.disabled = true;
  //     submit.disabled = true;
  //     hintButton.disabled = true;
  //     return;
  //   }
  //   guessCount++;
  //   guesses.innerHTML += `<li>${playerInput.value}</li>`;
  // };
  // const resetGame = () => {
  //   guessCount = 1;
  //   guesses.innerHTML = "";
  //   result.innerHTML = "";
  //   playerInput.value = "";
  //   submit.disabled = false;
  //   hintButton.disabled = false;

  //   answer = Math.floor(Math.random() * 100) + 1;
  // };
  // const hint = () => {
  //   let hintArray = [
  //     answer,
  //     Math.floor(Math.random() * 100) + 1,
  //     Math.floor(Math.random() * 100) + 1,
  //   ];

  //   hintOutput.innerHTML = "One of these numbers is the answer: " + hintArray;

  //   hintButton.disabled = true;
  // };
  // submit.addEventListener("click", () => {
  //   console.log(playerInput.value, answer, guessCount);
  //   checkGuess();
  //   guessCountList();
  //   playerInput.value = "";
  // });

  // reset.addEventListener("click", resetGame);
  // hintButton.addEventListener("click", hint);
};
