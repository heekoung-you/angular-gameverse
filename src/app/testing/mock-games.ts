import { Game, GameSingle, GamesScreenshotsList200Response } from '../api-client';
import { GamesList200Response } from '../api-client';
import mockGames from './mock-games.json';
import mockGameSingle from './mock-game.json';
import mockScreenshotList from './mock-screenshots.json';

export const mockGameList: Game[] = mockGames as unknown as Game[];
export const mockGameListResponse: GamesList200Response = {
  count: mockGames.length,
  results: mockGameList,
};

export const mockSingleGameCase = mockGameSingle as unknown as GameSingle;
export const mockScrrenShots = mockScreenshotList as unknown as GamesScreenshotsList200Response;
