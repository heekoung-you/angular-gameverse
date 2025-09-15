import { Game } from '../api-client';
import { GamesList200Response } from '../api-client';
import mockGames from './mock-games.json';

export const mockGameList: Game[] = mockGames as unknown as Game[];
export const mockGameListResponse: GamesList200Response = {
  count: mockGames.length,
  results: mockGameList,
};
