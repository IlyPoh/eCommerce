// App
export interface IAppState {
  loading: boolean;
  error: string | null;
}

// Category
export interface ICategoryState {
  categories: ICategory[];
  currentCategory: ICategory | null;
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
export interface IProductsState {
  products: IProduct[];
  currentProduct: IProduct | null;
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
