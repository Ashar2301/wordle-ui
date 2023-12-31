export interface IRandomGames {
    date            ?: string;
    _id             ?: string;
    hardMode        ?: boolean;
    solved          ?: boolean;
    solvedInAttempts?: number;
    type            ?: string;
    attempts        ?: {
      letters?: Array<Array<string>>;
      colors ?: Array<Array<string>>;
    };
  }
  
  export interface IDailyGames {
    date            ?: string;
    _id             ?: string;
    hardMode        ?: boolean;
    solved          ?: boolean;
    solvedInAttempts?: number;
    type            ?: string;
    attempts        ?: {
      letters?: Array<Array<string>>;
      colors ?: Array<Array<string>>;
    };
  }