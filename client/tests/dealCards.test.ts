import { describe, expect, it } from 'vitest'
import dealCards from '../util/dealCards.ts'
import * as data from '../../data/deckExample.ts'

describe('dealCards for 2 players', () => {
  it(`creates an array of 2 Player objects when requested length is 2, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 2
    // Act
    const { hands } = dealCards(2, data.exampleDeck.cards)
    // Assert
    expect(hands.length).toEqual(expectedLength)
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 7 items', () => {
    const expectedHand1 = data.firstHand2Players
    const expectedHand2 = data.secondHand2Players
    // Act
    const { hands } = dealCards(2, data.exampleDeck.cards)
    // Assert
    expect(hands[0]).toEqual(expectedHand1)
    expect(hands[1]).toEqual(expectedHand2)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = data.pond2players
    // Act
    const { pond } = dealCards(2, data.exampleDeck.cards)
    // Assert
    expect(pond).toEqual(expected)
    expect(pond.length).toEqual(52 - 2 * 7)
  })
})

describe('dealCards for 3 players', () => {
  it(`creates an array of 3 Player objects when requested length is 3, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 3
    // Act
    const { hands } = dealCards(3, data.exampleDeck.cards)
    // Assert
    expect(hands.length).toEqual(expectedLength)
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 6 items', () => {
    const expectedHand1 = data.firstHand3Players
    const expectedHand2 = data.secondHand3Players
    const expectedHand3 = data.thirdHand3Players
    // Act
    const { hands } = dealCards(3, data.exampleDeck.cards)
    // Assert
    expect(hands[0]).toEqual(expectedHand1)
    expect(hands[1]).toEqual(expectedHand2)
    expect(hands[2]).toEqual(expectedHand3)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = data.pond3Players
    // Act
    const { pond } = dealCards(3, data.exampleDeck.cards)
    // Assert
    expect(pond).toEqual(expected)
    expect(pond.length).toEqual(52 - 3 * 6)
  })
})
