export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  url: string;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  winPct: string;
  streak: string;
  standing: string;
  conference: string;
}

export interface Game {
  id: string;
  date: string;
  opponent: string;
  opponentLogo: string;
  homeAway: 'home' | 'away';
  result: 'W' | 'L' | 'upcoming';
  score: string;
  cavsScore?: number;
  oppScore?: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  jersey: string;
  headshot: string;
  ppg: number;
  rpg: number;
  apg: number;
  fgPct: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  description: string;
  image: string;
  published: string;
  link: string;
}

export interface AppData {
  team: TeamRecord;
  recentGames: Game[];
  players: Player[];
  videos: YouTubeVideo[];
  news: NewsItem[];
  teamName: string;
  teamLogo: string;
  arena: string;
}
