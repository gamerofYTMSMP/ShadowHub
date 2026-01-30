
import { Series, Category, Episode } from './types';

export const MOCK_EPISODES: Episode[] = [
  { id: 'e1', title: 'The Silent Whisper - Part 1', duration: '12:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', order: 1 },
  { id: 'e2', title: 'The Silent Whisper - Part 2', duration: '15:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', order: 2 },
  { id: 'e3', title: 'Into the Dark Forest', duration: '10:10', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', order: 3 },
];

export const MOCK_SERIES: Series[] = [
  {
    id: 's1',
    title: 'Midnight Shadows',
    description: 'A terrifying journey into the unknown spirits of the city.',
    creatorId: 'c1',
    creatorName: 'Aman Sharma',
    category: Category.HORROR,
    thumbnail: 'https://picsum.photos/seed/horror1/400/400',
    episodes: MOCK_EPISODES,
    isApproved: true,
    plays: 15400,
    likes: 1200
  },
  {
    id: 's2',
    title: 'The Great Mindset',
    description: 'Transform your life with daily habits and powerful psychology.',
    creatorId: 'c2',
    creatorName: 'Rohan Gupta',
    category: Category.MOTIVATION,
    thumbnail: 'https://picsum.photos/seed/motivation1/400/400',
    episodes: MOCK_EPISODES,
    isApproved: true,
    plays: 8900,
    likes: 450
  },
  {
    id: 's3',
    title: 'Love in Mumbai',
    description: 'Two souls finding each other in the city that never sleeps.',
    creatorId: 'c3',
    creatorName: 'Priya Verma',
    category: Category.LOVE,
    thumbnail: 'https://picsum.photos/seed/love1/400/400',
    episodes: MOCK_EPISODES,
    isApproved: true,
    plays: 25000,
    likes: 3400
  },
  {
    id: 's4',
    title: 'Ancient Wisdom',
    description: 'Unlocking secrets from Vedic scripts and spiritual leaders.',
    creatorId: 'c1',
    creatorName: 'Aman Sharma',
    category: Category.SPIRITUAL,
    thumbnail: 'https://picsum.photos/seed/spirit1/400/400',
    episodes: MOCK_EPISODES,
    isApproved: true,
    plays: 1200,
    likes: 98
  }
];
