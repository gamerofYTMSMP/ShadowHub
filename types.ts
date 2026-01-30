
export enum Category {
  HORROR = 'Horror 👻',
  MOTIVATION = 'Motivation 🔥',
  LOVE = 'Love ❤️',
  DRAMA = 'Drama 🎭',
  SPIRITUAL = 'Spiritual 🕉️',
  EDUCATION = 'Education 📚'
}

export enum UserRole {
  LISTENER = 'LISTENER',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Episode {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  order: number;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  category: Category;
  thumbnail: string;
  episodes: Episode[];
  isApproved: boolean;
  plays: number;
  likes: number;
}

export type ViewState = 'HOME' | 'DISCOVER' | 'SERIES_DETAIL' | 'CREATOR_DASHBOARD' | 'ADMIN_PANEL' | 'PLAYLISTS' | 'LIKED_STORIES' | 'PREMIUM' | 'PROFILE';
