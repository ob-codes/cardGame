//Example fetch using pokemonapi.co

if (!localStorage.getItem("DeckID"))
  localStorage.setItem("DeckID", 0); 

if (!localStorage.getItem("userCard"))
  localStorage.setItem("userCard", 0); 

if (!localStorage.getItem("botCard"))
  localStorage.setItem("botCard", 0);

getDeck(); //on-page load or page-refresh

document.getElementById("btn2").addEventListener("click", drawCard);

function drawCard(){
  document.querySelector("h3").innerText = "Drawing cards..";
  drawCardForUser();
  drawCardForBot();

  setTimeout(checkWin, 1500);
}

function drawCardForUser(){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;

  fetch(url)
  .then(res => res.json())
  .then(data => {
    document.getElementById("userCard").src = data.cards[0].image;
    localStorage.setItem("userCard", convertToNum(data.cards[0].value));    
  })
  .catch(err => {
    console.log(`err : ${err}`);
  });
}

function drawCardForBot(){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;

  fetch(url)
  .then(res => res.json())
  .then(data => {
    document.getElementById("botCard").src = data.cards[0].image;
    localStorage.setItem("botCard", convertToNum(data.cards[0].value));
  })
  .catch(err => {
    console.log(`err : ${err}`);
  });
}

function checkWin(){
  let usrChoice = convertToNum(localStorage.getItem("userCard"));
  let botChoice = convertToNum(localStorage.getItem("botCard"));

  if (usrChoice === botChoice) {
    document.querySelector("h3").innerText = "WARRRRRRRRR!!!";

    setTimeout(drawCardForUser, 1000);
    drawCardForBot();
    setTimeout(drawCardForUser, 1000);
    drawCardForBot();
    setTimeout(drawCardForUser, 1000);
    drawCardForBot();
  }
  else if (usrChoice > botChoice) {
    document.querySelector("h3").innerText = "You Won";
  }
  else if (usrChoice < botChoice) {
    document.querySelector("h3").innerText = "You Lost";
  }
}

function getDeck(){
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    localStorage.setItem("deckID", data.deck_id);
    deckID = data.deck_id;

    document.querySelector("h3").innerText = "Deck ready...";
  })
  .catch(err => {
    console.log(`err : ${err}`);
  });
}

function convertToNum(value){
  let numberValue = 0;
  
  switch (value) {
    case "ACE":
      numberValue = 14;
      break;
    
    case "KING":
      numberValue = 13;
      break;
    
    case "QUEEN":
      numberValue = 12;
      break;

    case "JACK":
      numberValue = 11;
      break;

    default:
      numberValue = Number(value);
      break;
  }

  return numberValue;
}