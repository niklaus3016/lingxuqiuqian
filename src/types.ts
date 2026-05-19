export interface FortuneItem {
  id: number;
  title: string;
  poem: string;
  detail: string;
  advice: string;
}

export interface FortuneCategory {
  id: string;
  name: string;
  description: string;
  items: FortuneItem[];
}

export interface FolkTip {
  id: number;
  title: string;
  content: string;
}

export interface Settings {
  fontSize: 'small' | 'medium' | 'large' | 'extra';
  soundEnabled: boolean;
  layoutMode: 'vertical' | 'horizontal';
}

export interface FavoriteItem {
  type: 'fortune' | 'tip';
  data: FortuneItem | FolkTip;
  timestamp: number;
  categoryName?: string;
}
