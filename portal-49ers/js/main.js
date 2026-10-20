/*
 * Faithful Brasil — Torcidômetro / garimpo interativo
 * Implementação feita com auxílio de IA e integrada manualmente ao projeto.
 * Sem bibliotecas externas; botão acessível, progresso anunciado e suporte a teclado.
 */
(() => {
  "use strict";

  const game = document.querySelector("#dig-game");
  const button = document.querySelector("#dig-button");
  const buttonLabel = document.querySelector("#dig-button-label");
  const progress = document.querySelector("#dig-progress");
  const progressFill = document.querySelector("#dig-progress-fill");
  const percentLabel = document.querySelector("#dig-percent");
  const status = document.querySelector("#dig-status");
  const reward = document.querySelector("#dig-reward");

  // Fail safely if this script is reused on a page without the Torcidômetro.
  if (!game || !button || !buttonLabel || !progress || !progressFill || !percentLabel || !status || !reward) {
    return;
  }

  const STEP = 10;
  let currentProgress = 0;
  let isComplete = false;
  let strikeTimer;

  function updateProgress() {
    progress.setAttribute("aria-valuenow", String(currentProgress));
    progress.setAttribute("aria-valuetext", `${currentProgress}% do garimpo concluído`);
    progressFill.style.width = `${currentProgress}%`;
    percentLabel.textContent = `${currentProgress}%`;
  }

  function animateStrike() {
    button.classList.remove("is-striking");
    // Reading offsetWidth restarts the CSS animation after repeated rapid clicks.
    void button.offsetWidth;
    button.classList.add("is-striking");
    window.clearTimeout(strikeTimer);
    strikeTimer = window.setTimeout(() => button.classList.remove("is-striking"), 320);
  }

  function resetGame() {
    currentProgress = 0;
    isComplete = false;
    game.classList.remove("is-complete");
    reward.hidden = true;
    buttonLabel.textContent = "Cavar agora";
    button.setAttribute("aria-label", "Cavar agora; cada clique avança dez por cento do garimpo");
    status.textContent = "O garimpo recomeçou. Dê o primeiro golpe para encontrar o ouro!";
    updateProgress();
  }

  function finishGame() {
    isComplete = true;
    game.classList.add("is-complete");
    reward.hidden = false;
    buttonLabel.textContent = "Cavar de novo";
    button.setAttribute("aria-label", "Cavar de novo; reinicia o Torcidômetro");
    status.textContent = "Garimpo concluído! Você encontrou o ouro da Faithful. Paixão que não se apaga!";
  }

  button.addEventListener("click", () => {
    if (isComplete) {
      resetGame();
      return;
    }

    animateStrike();
    currentProgress = Math.min(currentProgress + STEP, 100);
    updateProgress();

    if (currentProgress === 100) {
      finishGame();
      return;
    }

    status.textContent = currentProgress < 50
      ? `${currentProgress}% do garimpo concluído. Continue cavando: o ouro está mais perto!`
      : `${currentProgress}% do garimpo concluído. A Faithful não desiste agora!`;
  });

  updateProgress();
})();
