import { EItemType, ESort } from '.';

// App
export interface IAppState {
  loading: boolean;
  error: string | null;
  gridView: boolean;
  total: {
    products: number;
    news: number;
    minPriceProduct: number;
    maxPriceProduct: number;
  };
}

// Page
export interface IPageState {
  currentPage: number;
  pageType: EItemType | null;
  pageURL: string;
  pageTitle: string;
  itemsPerPage: number | null;
  itemsToShow: number | null;
  pageCount: number;
  breadcrumbs: IBreadcrumb[];
}

interface IBreadcrumb {
  name: string;
  url: string;
}

// Category
export interface ICategory {
  id: number | string;
  name: string;
  productsCount: number;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  id: number;
  name: string;
  productsCount: number;
}

// Product
export interface IProductsState {
  products: IProductsData;
  categories: ICategory[];
  subcategories: ISubcategory[];
  brands: string[];
  sort: ESort;
  filters: IProductStateFilters;
}

export interface IProductsData {
  productsData: IProduct[];
  totalPages: number;
}

export interface IProductStateFilters {
  tags: string[];
  minPrice: number | null;
  maxPrice: number | null;
  country: string | null;
  brands: string[];
  ratings: number[];
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  country: string;
  image_urls: string[];
  description: string;
  stock: number;
  new: boolean;
  brand: string;
  characteristics: ICharacteristics;
  tags: string[];
  price: number;
  discount?: IDiscount;
  rating: IRating;
  freshness: boolean;
  delivery: string;
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

interface IRating {
  value: number | null;
  count: number;
}

export interface IProductsEndpointOptions {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  brands: string[];
  tags: string[];
  ratings: number[];
  minPrice: number | null;
  maxPrice: number | null;
  country: string | null;
  sort: string;
  limit: number;
  page: number;
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
