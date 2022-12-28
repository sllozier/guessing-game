window.onload = function () {
  let answer = Math.floor(Math.random() * 100) + 1;
  const guess = document.getElementById("guess");
  const submit = document.getElementById("submit");
  const result = document.getElementById("result");
  const guesses = document.getElementById("guesses");
  const reset = document.getElementById("reset");
  let guessCount = 1;
  let guessMax = 6;
  const checkGuess = () => {
    if (guess.value == answer) {
      result.innerHTML = "Correct!";
      guess.disabled = true;
      submit.disabled = true;
      return;
    }

    if (guess.value > answer) {
      result.innerHTML = "Your guess is too high!";
    } else {
      result.innerHTML = "Your guess is too low!";
    }
  };
  const guessCountList = () => {
    if (guessCount === guessMax) {
      result.innerHTML = "You ran out of guesses.";
      guess.disabled = true;
      submit.disabled = true;
      return;
    }

    guesses.innerHTML += `<li>${guess.value}</li>`;

    guessCount++;
  };
  const resetGame = () => {
    guessCount = 1;
    guesses.innerHTML = "";
    result.innerHTML = "";
    guess.value = "";
    answer = Math.floor(Math.random() * 100) + 1;
  };
  submit.addEventListener("click", () => {
    console.log(guess.value, answer, guessCount);
    checkGuess();
    guessCountList();
  });

  reset.addEventListener("click", resetGame);
};
