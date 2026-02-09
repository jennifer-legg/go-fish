import { useQuery } from '@tanstack/react-query'
import { getShuffledDeck } from '../apis/deck.ts'

export function useGetShuffledDeck() {
  return useQuery({ queryKey: ['deck'], queryFn: getShuffledDeck })
}
