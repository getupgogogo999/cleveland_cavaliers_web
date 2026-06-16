export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://cavs-nation.onrender.com';

export const ROUTES = {
  home: '/',
  record: '/record',
  games: '/games',
  players: '/players',
  videos: '/videos',
  history: '/history',
  news: '/news',
} as const;

export const NAV_LINKS = [
  { to: ROUTES.home, label: '首页' },
  { to: ROUTES.record, label: '战绩' },
  { to: ROUTES.games, label: '赛程' },
  { to: ROUTES.players, label: '球员' },
  { to: ROUTES.videos, label: '视频' },
  { to: ROUTES.history, label: '荣耀' },
  { to: ROUTES.news, label: '资讯' },
];

export interface CarouselSlide {
  title: string;
  subtitle: string;
  link?: string;
  /** Wide landscape photo URL */
  image?: string;
  /** Brand slide: gradient + logo, no photo */
  variant?: 'photo' | 'brand';
}

/** Curated wide images — no player headshot crops */
export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    variant: 'brand',
    title: 'CAVS NATION',
    subtitle: '克利夫兰骑士队 · Wine & Gold 荣耀传承',
    link: ROUTES.history,
  },
  {
    variant: 'photo',
    image: 'https://img.youtube.com/vi/4gdYH5wgTc4/maxresdefault.jpg',
    title: '季后赛高光',
    subtitle: 'Game 7 客场力克活塞 · 挺进东决',
    link: ROUTES.videos,
  },
  {
    variant: 'photo',
    image: 'https://img.youtube.com/vi/ySSWyYd0em8/maxresdefault.jpg',
    title: 'All-Access 纪录片',
    subtitle: '走进骑士队更衣室与训练日常',
    link: ROUTES.videos,
  },
  {
    variant: 'photo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rocket_Mortgage_FieldHouse_%28Cleveland%29.jpg/1920px-Rocket_Mortgage_FieldHouse_%28Cleveland%29.jpg',
    title: 'Rocket Arena',
    subtitle: '克利夫兰主场 · 球迷的第六人',
    link: ROUTES.games,
  },
  {
    variant: 'brand',
    title: '2016 NBA CHAMPIONS',
    subtitle: 'Cleveland, this is for you!',
    link: ROUTES.history,
  },
];

export const PAGE_SEO = {
  home: {
    title: 'Cavs Nation | 克利夫兰骑士队官方风格球迷站',
    description:
      '克利夫兰骑士队资讯站 — 实时战绩、赛程赛果、球员数据、YouTube 官方视频、队史荣耀。Wine & Gold 球迷之家。',
  },
  record: {
    title: '赛季战绩 | Cavs Nation 克利夫兰骑士队',
    description: '克利夫兰骑士队 2024-25 赛季战绩、胜率、排名与近期表现数据。',
  },
  games: {
    title: '赛程赛果 | Cavs Nation 克利夫兰骑士队',
    description: '骑士队最近比赛结果与 upcoming 赛程，主客场一目了然。',
  },
  players: {
    title: '球员数据 | Cavs Nation 克利夫兰骑士队',
    description: 'Donovan Mitchell、Evan Mobley 等骑士队球员得分、篮板、助攻赛季数据。',
  },
  videos: {
    title: '精彩视频 | Cavs Nation 克利夫兰骑士队',
    description: 'Cleveland Cavaliers 官方 YouTube 频道最新集锦与高光视频。',
  },
  history: {
    title: '荣耀历程 | Cavs Nation 克利夫兰骑士队',
    description: '从 1970 建队到 2016 总冠军，回顾骑士队 Wine & Gold 传奇。',
  },
  news: {
    title: '最新资讯 | Cavs Nation 克利夫兰骑士队',
    description: 'NBA 骑士队相关最新新闻与动态。',
  },
};
