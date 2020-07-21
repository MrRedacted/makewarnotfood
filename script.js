document.addEventListener('DOMContentLoaded', () => {

//All the suites and ranks of the deck that will be assigned when the deck is created
let suites = ["spades", "clubs", "hearts", "diamonds"];
let ranks = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];

//Deck array
var deck = new Array();
var spoils = new Array();

var compCard = document.querySelector('#comp-card');
var playerCard = document.querySelector('#user-card');
var drawBtn = document.querySelector('#draw-btn');

var player1Deck = new Array();
var player2Deck = new Array();

createDeck();
shuffle();
splitTheDeck();

//Resets both players decks to be empty, shuffles the deck and then splits the deck.
function reset() {
  player1Deck = [];
  player2Deck = [];
  shuffle();
  splitTheDeck();
}

//Creates the deck using the array of suites and ranks.
function createDeck() {
  for (var s = 0; s < suites.length; ++s) { //Cycles through each suite in the suites array
    for (var r = 0; r < ranks.length; ++r) { //Cycles through each rank within the suite loop and creates a card for each one
      let card = {Suite: suites[s], Rank: ranks[r]}; //Creates a card, given the current position in both the suite and ranks array

      //Adds the current card at the end of the array
      deck.push(card);
    }
  }
}

//It prints the deck. Duh.
function printDeck(d) {
  for (var i = 0; i < d.length; ++i) {
    console.log(d[i]);
  }
}

/*function shuffle() {
  for (var i = 0; i < deck.length; ++i) {
    var loc1 = Math.floor(Math.random() * deck.length); //Takes index of one random position
    var loc2 = Math.floor(Math.random() * deck.length); //Takes index of another random position
    var temp = deck[loc1]; //Sets a value to the card at position 1

    deck[loc1] = deck[loc2]; //Sets the card at location 1 to the card at location 2
    deck[loc2] = temp; //Sets the card at location 2 to the temporary value (AKA position 1's original value)
  }
} */

// Cole wuz here
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle() {
  for (var i = deck.length - 1; i > 0; --i) {
    var j = Math.floor(Math.random() * i)
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

//Splits the deck into 2 decks, one for each player
function splitTheDeck() {
  for (let i = 0; i < deck.length / 2; ++i) { //Gives first half of the main deck to the 1st player.
    player1Deck.push(deck[i]);
  }
  for (let k = deck.length / 2; k < deck.length; ++k) { //Gives the last half of the deck to the other player.
    player2Deck.push(deck[k]);
  }
}
function getValue(d, c) { //Gets value of the rank of a given card in a given deck in the array of ranks
  return ranks.indexOf(c.Rank);
}

function showdown() { //Takes the top card of each player's deck and compares it.
  if (checkWinner() === -1) {
    let p1c = player1Deck[0]; //Top card off player 1's deck
    let p2c = player2Deck[0]; //Top card off player 2's deck url('/res/2_of_spades.png')
    let str1 = "url(res/" + p1c.Rank + "_of_" + p1c.Suite + ".png)";
    let str2 = "url(res/" + p2c.Rank + "_of_" + p2c.Suite + ".png)";
    compCard.style.backgroundImage = str1;
    playerCard.style.backgroundImage = str2;

    console.log("Player 1's draw: " + getValue(player1Deck, p1c));
    console.log("Player 2's draw: " + getValue(player2Deck, p2c));
    player1Deck.shift();
    player2Deck.shift();


    /*Compares the value of player 1's card and player 2's card.
    If player 1 wins, add both cards to player1's deck.
    If player 2 wins, add both cards to player2's deck.
    If a tie, initiate war until a winner is decided.
    */
    if (getValue(player1Deck, p1c) > getValue(player2Deck, p2c)) {
      console.log("Player 1 wins the round");
      player1Deck.push(p1c);
      player1Deck.push(p2c);
      //Adds the cards from the spoils array (if any are there) then resets the spoils array
      if (spoils.length != 0) {
        spoils.forEach(card => player1Deck.push(card));
        spoils = [];
      }   
      console.log(player1Deck.length);
      console.log(player2Deck.length);
    }
    else if (getValue(player2Deck, p2c) > getValue(player1Deck, p1c)) {
      console.log("player 2 wins the round");
      player2Deck.push(p2c);
      player2Deck.push(p1c);
      //Adds the cards from the spoils array (if any are there) then resets the spoils array
      if (spoils.length != 0) {
        spoils.forEach(card => player2Deck.push(card));
        spoils = [];
      }
      console.log(player1Deck.length);
      console.log(player2Deck.length);
      }
    else if (getValue(player1Deck, p1c) === getValue(player2Deck, p2c))   {
      console.log("WAR");
    //Adds the top 2 cards of each players deck to the spoils array.
      let p1s1 = player1Deck[0];
      let p1s2 = player1Deck[1];
      let p2s1 = player2Deck[0];
      let p2s2 = player2Deck[1];
      spoils.push(p1c, p2c, p1s1, p1s2, p2s1, p2s2);
      player1Deck.shift();
      player1Deck.shift();
      player2Deck.shift();
      player2Deck.shift();
      //Runs through showdown again, this time with the new cards added to the spoils array.
      showdown();
    } else {
      console.log("UHHHH");
    }
  }
}

function checkWinner() {
  if (player1Deck.length === 0) {//Returns 2 if player1 has ran out of cards
    return 2;
  }
  else if (player2Deck.length === 0) { //Returns 1 if player2 has ran out of cards
    return 1;
  }
  return -1;
}
drawBtn.addEventListener("click", () => showdown());
});