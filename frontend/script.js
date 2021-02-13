const app = () => {
  const URL = `/random/numbers`;

  const selectCardsContainer = document.querySelector("#select-cards_container");
  const selectCards = document.querySelector("#select-cards_num");
  const startBtn = document.querySelector("#start-btn");
  const cardsContainer = document.querySelector("#cards-container");
  const cards = document.querySelector("#cards");
  const card = document.getElementsByClassName("mycard");
  const playBtn = document.querySelector("#play-btn");
  const moreCardsBtn = document.querySelector("#more-cards");
  const winnerAlert = document.querySelector("#winner");
  const loserAlert = document.querySelector("#loser");

  const selectedCardsByUser = [];
  const allCards = [];

  selectCards.addEventListener("change", validateBtn);
  startBtn.addEventListener("click", displayData);
  moreCardsBtn.addEventListener("click", goBack);
  playBtn.addEventListener("click", flipCards);

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

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numOfCards }),
    });
    const content = await response.json();

    allCards.length = 0;

    content.forEach((num) => {
      allCards.push(num);

      cards.innerHTML += `
      <div class="col-6 col-sm-3 my-2">
            <div class="col-10 mx-auto mycard-container">
              <div class="mycard" data-number=${num}>
                <h3 class="front">${num}</h3>
                <div class="back"></div>
              </div>
            </div>
          </div>`;
    });

    addClass(selectCardsContainer, "d-none");
    removeClass(selectCardsContainer, "d-block");
    removeClass(cardsContainer, "d-none");
    addClass(cardsContainer, "d-block");

    removeClass(winnerAlert, "d-block");
    addClass(winnerAlert, "d-none");
    removeClass(loserAlert, "d-block");
    addClass(loserAlert, "d-none");

    playBtn.textContent = "Play";
  }

  function goBack() {
    removeClass(selectCardsContainer, "d-none");
    addClass(selectCardsContainer, "d-block");
    addClass(cardsContainer, "d-none");
    removeClass(cardsContainer, "d-block");
  }

  function flipCards() {
    selectedCardsByUser.length = 0;
    playBtn.textContent = "Play";

    removeClass(winnerAlert, "d-block");
    addClass(winnerAlert, "d-none");
    removeClass(loserAlert, "d-block");
    addClass(loserAlert, "d-none");

    [...card].forEach((ele) => {
      ele.addEventListener("click", flipCardBack);
      addClass(ele, "rotate");
    });
  }

  function flipCardBack(e) {
    const element = e.target.parentElement;
    const number = parseInt(element.getAttribute("data-number"));
    removeClass(element, "rotate");

    selectedCardsByUser.push(number);

    allCards.sort((a, b) => a - b);

    element.removeEventListener("click", flipCardBack);

    if (selectedCardsByUser.indexOf(number) === allCards.indexOf(number)) {
      element.firstElementChild.classList.remove("bg-danger");
      addClass(element.firstElementChild, "bg-success");
    } else {
      element.firstElementChild.classList.remove("bg-success");
      addClass(element.firstElementChild, "bg-danger");
      playBtn.textContent = "Try Again";
    }

    if (selectedCardsByUser.length === allCards.length) {
      const a = selectedCardsByUser.filter((num, i) => num === allCards[i]);

      if (a.length === allCards.length) {
        removeClass(winnerAlert, "d-none");
        addClass(winnerAlert, "d-block");
      } else {
        removeClass(loserAlert, "d-none");
        addClass(loserAlert, "d-block");
      }
    }
  }

  function addClass(ele, className) {
    ele.classList.add(className);
  }

  function removeClass(ele, className) {
    ele.classList.remove(className);
  }
};

window.onload = app;
