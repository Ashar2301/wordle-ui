import { IDailyGames, IRandomGames } from './games.model';

export interface IStatisticsObject {
  played           ?: number;
  percentageWins   ?: number;
  maxStreak        ?: number;
  currentStreak    ?: number;
  guessDistribution?: number[];
}
export interface IUserStatistics {
  email      : string;
  randomGames: Array<IRandomGames>;
  dailyGames : Array<IDailyGames>;
}
