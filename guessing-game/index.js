window.onload = function () {
  let answer = Math.floor(Math.random() * 100) + 1;
  const guess = document.getElementById("guess");
  const submit = document.getElementById("submit");
  const result = document.getElementById("result");
  const guesses = document.getElementById("guesses");
  const reset = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const hintOutput = document.getElementById("hintResult");
  let guessCount = 1;
  let guessMax = 5;

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
      guesses.innerHTML += `<li>${guess.value}</li>`;
      guess.disabled = true;
      submit.disabled = true;
      hintButton.disabled = true;
      return;
    }
    guessCount++;
    guesses.innerHTML += `<li>${guess.value}</li>`;
  };
  const resetGame = () => {
    guessCount = 1;
    guesses.innerHTML = "";
    result.innerHTML = "";
    guess.value = "";
    submit.disabled = false;
    hintButton.disabled = false;

    answer = Math.floor(Math.random() * 100) + 1;
  };
  const hint = () => {
    let hintArray = [
      answer,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
    ];

    hintOutput.innerHTML = "One of these numbers is the answer: " + hintArray;

    hintButton.disabled = true;
  };
  submit.addEventListener("click", () => {
    console.log(guess.value, answer, guessCount);
    checkGuess();
    guessCountList();
    guess.value = "";
  });

  reset.addEventListener("click", resetGame);
  hintButton.addEventListener("click", hint);
};
