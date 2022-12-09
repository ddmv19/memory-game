import { images } from './images';
import '../styles.css';

const headerItems = document.querySelectorAll('.header__item'); // timer[0]-Button Start[1]-puntuation[2]
const board = document.querySelector('.board');

const games = images.sort( () => Math.random() - 0.5);
let cardsChoosen = [];
let cardsChoosenId = [];
let puntuation = 0;
let time = 60;
let timer;

export const startGame = () => {
  puntuation = 0;
  createCards();
  timer = setInterval( () => {
    if(time === 0 || puntuation === games.length / 2) {
      clearInterval(timer);
    }
    headerItems[0].innerText = time--;
  }, 1000);
  
}

function createCards() {
  for (const i in games) {
    const img = document.createElement('img');
    img.setAttribute('src', games[i].srcFake);  
    img.setAttribute('data-id', i);
    img.addEventListener('click', flipCard);
    board.appendChild(img);
  }
}

function flipCard(){
  let cardId = this.getAttribute('data-id')
  cardsChoosen.push(games[cardId].name)
  cardsChoosenId.push(cardId)
  this.setAttribute('src', games[cardId].src)
  if (cardsChoosen.length === 2) {
    setTimeout(checkForMatch, 500)
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('img');
  const optionOneId = cardsChoosenId[0];
  const optionTwoId = cardsChoosenId[1];
  if(optionOneId === optionTwoId) {
    cards[optionOneId].setAttribute('src', './assets/question.jpg');
    cards[optionTwoId].setAttribute('src', './assets/question.jpg');
    alert('Same card, try again');
  } else if(cardsChoosen[0] === cardsChoosen[1]) {
    alert('Nice, yo found a match');
    cards[optionOneId].setAttribute('src', './assets/white.jpg');
    cards[optionTwoId].setAttribute('src', './assets/white.jpg');
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    puntuation++;
  } else {
    cards[optionOneId].setAttribute('src', './assets/question.jpg');
    cards[optionTwoId].setAttribute('src', './assets/question.jpg');
    alert('Sorry, try again');
  }

  cardsChoosen = [];
  cardsChoosenId = [];
  headerItems[2].innerText = puntuation;

  if(puntuation === cards.length / 2) {
    alert('Congratulations, you found them all');
  }
}