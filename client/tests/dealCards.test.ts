import { describe, expect, it } from 'vitest'
import dealCards from '../util/dealCards.ts'

const arr52 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
]

describe('dealCards for 2 players', () => {
  it(`creates an array of 2 Player objects when requested length is 2, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 2
    // Act
    const { players } = dealCards(2, arr52)
    // Assert
    expect(players.length).toEqual(expectedLength)
    for (let i = 0; i < players.length; i++) {
      expect(players[i]).toHaveProperty('sets')
      expect(players[i]).toHaveProperty('hand')
      expect(players[i]).toHaveProperty('id')
    }
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 7 items', () => {
    const expectedHand1 = [0, 2, 4, 6, 8, 10, 12]
    const expectedHand2 = [1, 3, 5, 7, 9, 11, 13]
    // Act
    const { players } = dealCards(2, arr52)
    // Assert
    expect(players[0].hand).toEqual(expectedHand1)
    expect(players[1].hand).toEqual(expectedHand2)
  })

  it('id of players should start at 1 and increase by 1', () => {
    // Act
    const { players } = dealCards(2, arr52)
    // Assert
    expect(players[0].id).toEqual(1)
    expect(players[1].id).toEqual(2)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = [
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51,
    ]
    // Act
    const { pond } = dealCards(2, arr52)
    // Assert
    expect(pond).toEqual(expected)
  })
})

describe('dealCards for 3 players', () => {
  it(`creates an array of 3 Player objects when requested length is 3, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 3
    // Act
    const { players } = dealCards(3, arr52)
    // Assert
    expect(players.length).toEqual(expectedLength)
    for (let i = 0; i < players.length; i++) {
      expect(players[i]).toHaveProperty('sets')
      expect(players[i]).toHaveProperty('hand')
      expect(players[i]).toHaveProperty('id')
    }
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 6 items', () => {
    const expectedHand1 = [0, 3, 6, 9, 12, 15]
    const expectedHand2 = [2, 5, 8, 11, 14, 17]
    const expectedHand3 = [1, 4, 7, 10, 13, 16]
    // Act
    const { players } = dealCards(3, arr52)
    // Assert
    expect(players[0].hand).toEqual(expectedHand1)
    expect(players[1].hand).toEqual(expectedHand2)
    expect(players[2].hand).toEqual(expectedHand3)
  })

  it('id of players should start at 1 and increase by 1', () => {
    // Act
    const { players } = dealCards(3, arr52)
    // Assert
    expect(players[0].id).toEqual(1)
    expect(players[1].id).toEqual(2)
    expect(players[2].id).toEqual(3)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = [
      18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
      36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    ]
    // Act
    const { pond } = dealCards(3, arr52)
    // Assert
    expect(pond).toEqual(expected)
  })
})

describe('dealCards for 4 players', () => {
  it(`creates an array of 4 Player objects when requested length is 4, with the properties 'sets', 'hand 'and 'id'`, () => {
    const expectedLength = 4
    // Act
    const { players } = dealCards(4, arr52)
    // Assert
    expect(players.length).toEqual(expectedLength)
    for (let i = 0; i < players.length; i++) {
      expect(players[i]).toHaveProperty('sets')
      expect(players[i]).toHaveProperty('hand')
      expect(players[i]).toHaveProperty('id')
    }
  })

  it('adds items from cardArr to players hands in an alternating fashion, no repeats, up to a total of 5 items', () => {
    const expectedHand1 = [0, 4, 8, 12, 16]
    const expectedHand2 = [3, 7, 11, 15, 19]
    const expectedHand3 = [2, 6, 10, 14, 18]
    const expectedHand4 = [1, 5, 9, 13, 17]
    // Act
    const { players } = dealCards(4, arr52)
    // Assert
    expect(players[0].hand).toEqual(expectedHand1)
    expect(players[1].hand).toEqual(expectedHand2)
    expect(players[2].hand).toEqual(expectedHand3)
    expect(players[3].hand).toEqual(expectedHand4)
  })

  it('id of players should start at 1 and increase by 1', () => {
    // Act
    const { players } = dealCards(4, arr52)
    // Assert
    expect(players[0].id).toEqual(1)
    expect(players[1].id).toEqual(2)
    expect(players[2].id).toEqual(3)
    expect(players[3].id).toEqual(4)
  })

  it('remaining items in array should be in the pond property', () => {
    const expected = [
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
      38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    ]
    // Act
    const { pond } = dealCards(4, arr52)
    // Assert
    expect(pond).toEqual(expected)
  })
})
