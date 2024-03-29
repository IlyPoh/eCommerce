// ENUMS
export enum EView {
  GRID = 'grid',
  LIST = 'list',
}

export enum EItemType {
  PRODUCTS = 'products',
  NEWS = 'news',
}

export enum ELinkType {
  link = 'link',
  button = 'button',
}

export enum ESort {
  POPULAR = 'popular',
  CHEAPEST = 'cheapest',
}

export enum EFilter {
  CLOTHING = 'clothing',
  KIDS = 'kids',
  UKRAINE = 'Ukraine',
}

export enum ICheckboxType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

// interfaces for constants
export interface IItemsPerPage {
  products: number;
  news: number;
  mainpageNews: number;
}

// API URLs
export interface IStoreApiUrls {
  products: string;
  categories: string;
  productTags: string;
  reviews: string;
  news: string;
  newsCategories: string;
  brands: string;
  total: string;
}

// Links
export interface ILink {
  text: string;
  link: string;
}

export interface ILinkWithYear {
  text: string;
  link: string;
  year: { year: number; month: number };
}

export interface IHeaderLinks {
  chatWithUs: ILink;
  phone: ILink;
  email: ILink;
  blog: ILink;
  aboutUs: ILink;
  careers: ILink;
}

export interface IFooterLink {
  title: string;
  links: ILink[];
}

// Error handler type
export interface IError {
  message?: string;
  status?: number;
}

// link props
export interface ILinkProps {
  text?: string;
  link?: string;
  icon?: string;
}

export interface IBannerProps {
  title?: string;
  subtitle?: string;
}

// Checkbox data
export interface ICheckboxData {
  value: string;
  count: number;
}

export interface ICheckboxDataWithSelector {
  value: string;
  count: number;
  selector: {
    [key: string]: number;
  };
}

// Query options
export interface QueryOptions {
  [key: string]: string | number | string[] | null | undefined | number[];
}
