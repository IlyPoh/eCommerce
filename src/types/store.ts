// Store
export interface IStore {
  appState: IAppState;
  categories: ICategoryState;
  tags: ITagsState;
}

// App
export interface IAppState {
  loading: boolean;
  error: string | null;
}

// Category
export interface ICategoryState {
  categories: ICategory[];
  category: string;
  categoryProducts: IProduct[];
}

export interface ICategory {
  id: number | string;
  name: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  id: number;
  name: string;
}

// Product
export interface IProduct {
  id: number;
  name: string;
  category_id: number;
  subcategory_id: number;
  image_urls: string[];
  description: string;
  stock: number;
  new: boolean;
  company: string;
  characteristics: Characteristics;
  tags: string[];
  price: number;
  sale: boolean;
  sale_percent: number;
}

export interface Characteristics {
  color?: string;
  size?: Size;
  storage?: string;
  author?: string;
  genre?: string;
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
}

// Tags
export interface ITagsState {
  tags: ITag[];
}

export interface ITag {
  id: number;
  name: string;
}
