const app = () => {
  const URL = "http://localhost:5000/random/numbers";

  const selectCardsContainer = document.querySelector("#select-cards_container");
  const selectCards = document.querySelector("#select-cards_num");
  const startBtn = document.querySelector("#start-btn");
  const cardsContainer = document.querySelector("#cards-container");
  const cards = document.querySelector("#cards");
  const card = document.getElementsByClassName("mycard");
  const playBtn = document.querySelector("#play-btn");
  const moreCardsBtn = document.querySelector("#more-cards");

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

    content.forEach((num) => {
      allCards.push(num);

      cards.innerHTML += `
      <div class="col-6 col-sm-3 my-2">
            <div class="col-10 mx-auto mycard-container">
              <div class="mycard" data-number=${num}>
                <h3 class="front">${num}</h3>
                <div class="back">back</div>
              </div>
            </div>
          </div>`;
    });

    addClass(selectCardsContainer, "d-none");
    removeClass(selectCardsContainer, "d-block");
    removeClass(cardsContainer, "d-none");
    addClass(cardsContainer, "d-block");
  }

  function goBack() {
    removeClass(selectCardsContainer, "d-none");
    addClass(selectCardsContainer, "d-block");
    addClass(cardsContainer, "d-none");
    removeClass(cardsContainer, "d-block");
  }

  function flipCards() {
    selectedCardsByUser.length = 0;
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
  }

  function addClass(ele, className) {
    ele.classList.add(className);
  }

  function removeClass(ele, className) {
    ele.classList.remove(className);
  }
};

window.onload = app;