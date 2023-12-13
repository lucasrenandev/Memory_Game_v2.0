// Modo estrito
"use strict";

// Criando imagens do jogo
const cardArray = [
    {
        name: "fruit 1",
        src: "assets/images/fruit1.png"
    },
    {
        name: "fruit 2",
        src: "assets/images/fruit2.png"
    },
    {
        name: "fruit 3",
        src: "assets/images/fruit3.png"
    },
    {
        name: "fruit 4",
        src: "assets/images/fruit4.png"
    },
    {
        name: "fruit 5",
        src: "assets/images/fruit5.png"
    },
    {
        name: "fruit 6",
        src: "assets/images/fruit6.png"
    },
    {
        name: "fruit 1",
        src: "assets/images/fruit1.png"
    },
    {
        name: "fruit 2",
        src: "assets/images/fruit2.png"
    },
    {
        name: "fruit 3",
        src: "assets/images/fruit3.png"
    },
    {
        name: "fruit 4",
        src: "assets/images/fruit4.png"
    },
    {
        name: "fruit 5",
        src: "assets/images/fruit5.png"
    },
    {
        name: "fruit 6",
        src: "assets/images/fruit6.png"
    },
]

// Posição aleatória dos cards
cardArray.sort(() => 0.5 - Math.random()).slice(0, cardArray.length);

// Elementos
const counter = document.querySelector(".game-container .counter");
const errors = document.querySelector(".game-container .errors");
const hits = document.querySelector(".game-container .hits");
const imageBox = document.querySelector(".game-container .image-box");
const startBtn = document.querySelector(".game-container .start-btn");
const popupContainer = document.querySelector(".popup-container");
const seconds = document.querySelector(".popup-container .seconds");
const totalErrors = document.querySelector(".popup-container .total-errors");
const totalHits = document.querySelector(".popup-container .total-hits");
const closePopup = document.querySelector(".popup-container .bx-x");
const refreshBtn = document.querySelector(".popup-container .refresh-btn");

// Variáveis para o jogo
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let cardsErrors = [];
let timeInterval = null;
let time = 60;

counter.textContent = time;

// Criando os cards do jogo de forma dinâmica
function createCards() {
    for(let i = 0; i < cardArray.length; i ++) {
        let card = document.createElement("img");
        card.setAttribute("src", "assets/images/close.png");
        card.setAttribute("data-id", i);
        imageBox.appendChild(card);
    }
}
createCards();

// Selecionando todos os cards criados
let cards = document.querySelectorAll(".image-box img");

// Virar cards 
function activeCards() {
    cards.forEach((img) => {
        img.addEventListener("click", flipCard);
    });
}

// Eventos do jogo
function checkMatch() {
    let optionOneId = cardsChosenId[0];
    let optionTwoId = cardsChosenId[1];

    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute("src", "assets/images/close.png");
        cards[optionTwoId].setAttribute("src", "assets/images/close.png");
    }
    else if(cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute("src", "assets/images/correct.png");
        cards[optionTwoId].setAttribute("src", "assets/images/correct.png");
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);
    }
    else {
        cards[optionOneId].setAttribute("src", "assets/images/close.png");
        cards[optionTwoId].setAttribute("src", "assets/images/close.png");
        cardsErrors.push(cardsChosen);
    }
    cardsChosen = [];
    cardsChosenId = [];

    hits.textContent = cardsWon.length;
    errors.textContent = cardsErrors.length;

    if(cardsWon.length === cardArray.length / 2) {
        startBtn.textContent = "Refresh";
        startBtn.addEventListener("click", refreshGame);
        pauseGame();
        openPopupContainer();
    }
}           

// Atribuindo eventos do jogo
function flipCard() {
    const cardId = this.getAttribute("data-id");
    const name = cardArray[cardId].name;

    this.setAttribute("src", cardArray[cardId].src);
    cardsChosen.push(name);
    cardsChosenId.push(cardId);  

    if(cardsChosen.length === 2) {
        setTimeout(checkMatch, 1000);   
    }
}

// Adicionar valor
const value = ((value) => value < 10 ? "0" + value : value);

// Iniciar jogo
function startGame() {
    pauseGame();
    activeCards();
    timeInterval = setInterval(() => {
        time--;
        if(time === 0) {
            pauseGame();
            time = 0;
            cards.forEach((img) => img.removeEventListener("click", flipCard));
            startBtn.textContent = "Refresh";
            startBtn.addEventListener("click", refreshGame);    
            openPopupContainer();
        }
        counter.textContent = value(time);
    }, 1000);
}

// Reiniciar jogo
function refreshGame() {
    window.location.reload();
}

// Pausar jogo
function pauseGame() {
    clearInterval(timeInterval);
}

// Adicionar popup
function openPopupContainer() {
    if(!popupContainer.classList.contains("open")) {
        setTimeout(() => {
            popupContainer.classList.add("open");
            seconds.textContent = `Time: ${value(time)} seconds remaining`;
            totalErrors.textContent = `Errors: ${cardsErrors.length}`;
            totalHits.textContent = `Hits: ${cardsWon.length}`;
        }, 1000);
    }
}

// Remover popup
function closePopupContainer() {
    if(popupContainer.classList.contains("open")) {
        popupContainer.classList.remove("open");
    }
}

// Eventos
refreshBtn.addEventListener("click", refreshGame);
closePopup.addEventListener("click", closePopupContainer);
startBtn.addEventListener("click", startGame);