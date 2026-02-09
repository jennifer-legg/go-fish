export interface Deck {
  success: boolean
  deck_id: string
  cards: Card[]
  remaining: number
}

export interface Card {
  code: string
  image: string
  images: {
    svg: string
    png: string
  }
  value: Value
  suit: Suit
}

type Suit = 'SPADES' | 'DIAMONDS' | 'HEARTS' | 'CLUBS'

type Value =
  | 'ACE'
  | 'KING'
  | 'QUEEN'
  | 'JACK'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
