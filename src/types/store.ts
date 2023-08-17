import { EItemType } from '.';

// App
export interface IAppState {
  loading: boolean;
  error: string | null;
  gridView: boolean;
}

// Page
export interface IPageState {
  currentPage: number;
  pageType: EItemType | null;
  pageURL: string;
  pageTitle: string;
  itemsPerPage: number;
  itemCount: number;
  pageCount: number;
}

// Category
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
export interface IProductsState {
  products: IProduct[];
  categories: ICategory[];
}

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
  characteristics: ICharacteristics;
  tags: string[];
  price: number;
  discount?: IDiscount;
}

interface ICharacteristics {
  color?: string;
  size?: string;
  storage?: string;
  author?: string;
  genre?: string;
}

interface IDiscount {
  discount_percent: number;
  final_price: number;
}

export interface IProductsEndpointOptions {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
  category_id?: number;
  subcategory_id?: number;
  tags?: string[];
  sort?: string;
  order?: string;
}

// Tags
export interface ITagsState {
  tags: ITag[];
}

export interface ITag {
  id: number;
  name: string;
}

// Reviews
export interface IReviewsState {
  reviews: IReview[];
}

export interface IReview {
  id: number;
  image: string;
  name: string;
  review: string;
}

// News
export interface IArticle {
  id: number;
  author: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  url: string;
  urlToImage: string;
  publishedAt: Date | string;
  content: string;
}

export interface INewsEndpointOptions {
  limit: number;
  page: number;
  year: number;
  month: number;
  tags: string[];
  category: string;
}
