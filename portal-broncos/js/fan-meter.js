/* =========================================================
   DENVER BRONCOS BRAZIL
   MILE HIGH ROAR - FAN METER
   ========================================================= */

const fanMeterConfig = {
  increment: 20,

  levels: [
    {
      minimum: 0,
      message: "O Broncos Country está chegando. Vamos fazer barulho!",
      intensity: "quiet",
    },
    {
      minimum: 20,
      message: "A torcida começa a ganhar força. O Mile High está acordando!",
      intensity: "warming",
    },
    {
      minimum: 40,
      message:
        "O barulho está aumentando. A Orange Crush está entrando em campo!",
      intensity: "strong",
    },
    {
      minimum: 60,
      message: "O estádio inteiro está vibrando. O Broncos Country não recua!",
      intensity: "intense",
    },
    {
      minimum: 80,
      message: "Estamos perto do limite. Faça o Mile High tremer!",
      intensity: "extreme",
    },
    {
      minimum: 100,
      message: "UNITED IN ORANGE! O MILE HIGH ESTÁ EM CHAMAS!",
      intensity: "maximum",
    },
  ],
};

/* =========================================================
   FAN METER
   ========================================================= */

function initializeFanMeter() {
  const fanMeter = document.querySelector("#fan-meter");

  if (!fanMeter) return;

  const elements = {
    roarButton: document.querySelector("#roar-button"),
    resetButton: document.querySelector("#roar-reset"),
    percentage: document.querySelector("#roar-percentage"),
    message: document.querySelector("#roar-message"),
    progress: document.querySelector("#roar-progress"),
    fill: document.querySelector("#roar-fill"),
    stage: document.querySelector("#roar-stage"),
    celebration: document.querySelector("#roar-celebration"),
    replayButton: document.querySelector("#celebration-replay"),
  };

  const {
    roarButton,
    resetButton,
    percentage,
    message,
    progress,
    fill,
    stage,
    celebration,
    replayButton,
  } = elements;

  if (!roarButton || !percentage || !message || !progress || !fill) {
    console.error("Fan Meter: required HTML elements were not found.");
    return;
  }

  let currentProgress = 0;

  const originalButtonLabel = roarButton.textContent.trim();

  /* =====================================================
       GET CURRENT INTENSITY LEVEL
       ===================================================== */

  function getCurrentLevel() {
    return [...fanMeterConfig.levels]
      .reverse()
      .find((level) => currentProgress >= level.minimum);
  }

  /* =====================================================
       UPDATE DISPLAY
       ===================================================== */

  function updateFanMeter() {
    const currentLevel = getCurrentLevel();

    percentage.textContent = `${currentProgress}%`;

    fill.style.width = `${currentProgress}%`;

    progress.setAttribute("aria-valuenow", currentProgress);

    progress.setAttribute(
      "aria-valuetext",
      `${currentProgress}% de intensidade da torcida`,
    );

    message.textContent = currentLevel.message;

    fanMeter.dataset.intensity = currentLevel.intensity;

    if (stage) {
      stage.dataset.intensity = currentLevel.intensity;
    }

    fanMeter.classList.toggle("is-complete", currentProgress === 100);
  }

  /* =====================================================
       CELEBRATION
       ===================================================== */

  function celebrateVictory() {
    if (celebration) {
      celebration.hidden = false;

      celebration.classList.remove("is-celebrating");

      void celebration.offsetWidth;

      celebration.classList.add("is-celebrating");
    }

    roarButton.disabled = true;
    roarButton.textContent = "BARULHO NO MÁXIMO!";

    if (resetButton) {
      resetButton.hidden = false;
    }
  }

  /* =====================================================
       INCREASE ROAR
       ===================================================== */

  function increaseRoar() {
    if (currentProgress >= 100) return;

    currentProgress = Math.min(currentProgress + fanMeterConfig.increment, 100);

    updateFanMeter();

    if (currentProgress === 100) {
      celebrateVictory();
    }
  }

  /* =====================================================
       RESET EXPERIENCE
       ===================================================== */

  function resetFanMeter() {
    currentProgress = 0;

    if (celebration) {
      celebration.hidden = true;
      celebration.classList.remove("is-celebrating");
    }

    roarButton.disabled = false;
    roarButton.textContent = originalButtonLabel;

    if (resetButton) {
      resetButton.hidden = true;
    }

    updateFanMeter();
  }

  /* =====================================================
       EVENTS
       ===================================================== */

  roarButton.addEventListener("click", increaseRoar);

  if (resetButton) {
    resetButton.addEventListener("click", resetFanMeter);
  }

  if (replayButton) {
    replayButton.addEventListener("click", resetFanMeter);
  }

  /* =====================================================
       INITIAL STATE
       ===================================================== */

  if (celebration) {
    celebration.hidden = true;
  }

  if (resetButton) {
    resetButton.hidden = true;
  }

  updateFanMeter();
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", initializeFanMeter);
