import { describe, expect, it } from 'vitest'
import dealCards from '../util/dealCards.ts'
import * as data from '../../data/deckExample.ts'

describe('dealCards for 2 players', () => {
  it(`creates an array of 2 Player objects when requested length is 2, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 2
    // Act
    const { players } = dealCards(2, data.exampleDeck)
    // Assert
    expect(players.length).toEqual(expectedLength)
    for (let i = 0; i < players.length; i++) {
      expect(players[i]).toHaveProperty('sets')
      expect(players[i]).toHaveProperty('hand')
      expect(players[i]).toHaveProperty('id')
    }
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 7 items', () => {
    const expectedHand1 = data.firstHand2Players
    const expectedHand2 = data.secondHand2Players
    // Act
    const { players } = dealCards(2, data.exampleDeck)
    // Assert
    expect(players[0].hand).toEqual(expectedHand1)
    expect(players[1].hand).toEqual(expectedHand2)
  })

  it('id of players should start at 1 and increase by 1', () => {
    // Act
    const { players } = dealCards(2, data.exampleDeck)
    // Assert
    expect(players[0].id).toEqual(1)
    expect(players[1].id).toEqual(2)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = data.pond2players
    // Act
    const { pond } = dealCards(2, data.exampleDeck)
    // Assert
    expect(pond).toEqual(expected)
    expect(pond.length).toEqual(52 - 2 * 7)
  })
})

describe('dealCards for 3 players', () => {
  it(`creates an array of 3 Player objects when requested length is 3, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 3
    // Act
    const { players } = dealCards(3, data.exampleDeck)
    // Assert
    expect(players.length).toEqual(expectedLength)
    for (let i = 0; i < players.length; i++) {
      expect(players[i]).toHaveProperty('sets')
      expect(players[i]).toHaveProperty('hand')
      expect(players[i]).toHaveProperty('id')
    }
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 6 items', () => {
    const expectedHand1 = data.firstHand3Players
    const expectedHand2 = data.secondHand3Players
    const expectedHand3 = data.thirdHand3Players
    // Act
    const { players } = dealCards(3, data.exampleDeck)
    // Assert
    expect(players[0].hand).toEqual(expectedHand1)
    expect(players[1].hand).toEqual(expectedHand2)
    expect(players[2].hand).toEqual(expectedHand3)
  })

  it('id of players should start at 1 and increase by 1', () => {
    // Act
    const { players } = dealCards(3, data.exampleDeck)
    // Assert
    expect(players[0].id).toEqual(1)
    expect(players[1].id).toEqual(2)
    expect(players[2].id).toEqual(3)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = data.pond3Players
    // Act
    const { pond } = dealCards(3, data.exampleDeck)
    // Assert
    expect(pond).toEqual(expected)
    expect(pond.length).toEqual(52 - 3 * 6)
  })
})
