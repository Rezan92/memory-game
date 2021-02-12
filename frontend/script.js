const app = () => {
  const URL = "http://localhost:5000/random/numbers";
  const selectCardsContainer = document.querySelector("#select-cards_container");
  const selectCards = document.querySelector("#select-cards_num");
  const startBtn = document.querySelector("#start-btn");
  const cardsContainer = document.querySelector("#cards-container");
  const cards = document.querySelector("#cards");
  const playBtn = document.querySelector("#play-btn");

  selectCards.addEventListener("change", validateBtn);
  startBtn.addEventListener("click", displayData);

  //If the value is not a valid number the button will be disabled
  function validateBtn() {
    const numOfCards = parseInt(selectCards.value);

    if (isNaN(numOfCards)) {
      addClass(startBtn, "disabled");
    } else {
      removeClass(startBtn, "disabled");
    }
  }

  async function displayData() {
    const numOfCards = parseInt(selectCards.value);

    cards.innerHTML = "";

    addClass(selectCardsContainer, "d-none");
    removeClass(selectCardsContainer, "d-block");
    removeClass(cardsContainer, "d-none");
    addClass(cardsContainer, "d-block");

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numOfCards }),
    });
    const content = await response.json();

    content.forEach((element) => {
      cards.innerHTML += `
      <div class="col-6 col-sm-3 my-2">
        <div class="col-12 p-1 border border-primary">${element}</div>
      </div>`;
    });
  }

  function addClass(ele, className) {
    ele.classList.add(className);
  }

  function removeClass(ele, className) {
    ele.classList.remove(className);
  }
};

window.onload = app;
