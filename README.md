# Boilerplate: Fullstack with Sass

## Testing commit

Angu testing his commit and pushes

## Planning

### Game mechanics (2 player game)

![Flow chart](public/images/game-mechanic.png)

#### Functions / variables

1. const maxCards = decided by number of players.
   - 2 players, 7 cards
   - 3 players, 6 cards
   - 4 players, 5 cards

1. getShuffledDeck() => deck  
   Sends a GET request via proxy server to [Deck Of Cards API](https://deckofcardsapi.com/) draw a card option,
   drawing 52 cards from a new shuffled deck. Returns the shuffled deck of cards.

1. selectStartingPlayer(player[]) => player  
   Return randomised starting player

1. dealCards(numOfPlayers, deck) => players, deck
   Takes a deck of cards and the number of players and returns an array of player objects and the remaining deck. Each player object will have a hand of cards, starting at the amount of maxCards. The remaining deck becomes the pond of cards.

1. pondContainsCards(deck) => boolean  
   Checks if the pond/deck still contains cards by checking length of card array and returns true/false

1. goFish(player, deck, requestedCardValue) => player, deck, boolean  
   Requires pond to have cards. Removes one card from the deck and adds it to the players hand. Checks if card matches the requested cardValue. Returns the updated player/deck and boolean for whether the card matched the card originally requested of the player.

1. fillHand(player, deck) => player, deck
   Requires pond to have cards. Fills the hand of the player up to the maxCard amount (less if there are less left in the pile).

1. checkForSet(player) => boolean
   Checks for sets of four cards of the same value in the player's hand.

1. resolveSet(player) => player  
   Removes sets and adds 1 to player's set count.

1. askPlayer(player) => card value
   Active Player is prompted to ask another player for a card of the same value as one of the cards the Active Player has in its hand. Perhaps they tap one of the cards in their hand to do this, or could have buttons that pop up with the values they can ask for. Returns the selected card value

1. searchForCard(player, cardValue) => number  
   Checks if a player has any cards of a particular value. Returns the number of matching cards (0 if none found)

1. giveCard(player) => card[], player
   If the responding player has any matching cards in their hand, they must give all of these to the Active Player. The cards are removed from the player's hand.

1. calculateWinner(player[])=> player[]
   Check the value of the sets property on the player object, return array of player objects of player(s) that have won (could be more than one if it's a draw)

1. playerHasCards(player) => boolean  
   Return true if player has cards in their hand, false if none

1. gameManager() => void  
   Runs the game (prompts etc) and controls turns

## Setup

### Installation

git clone git@github.com:jennifer-legg/go-fish.git  
cd go-fish  
npm install # to install dependencies  
npm run dev # to start the dev server

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).
