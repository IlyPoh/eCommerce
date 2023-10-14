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
}

export enum ICheckboxType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

// props for button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: string;
  classes?: string;
}

// API URLs
export interface IStoreApiUrls {
  products: string;
  categories: string;
  productTags: string;
  reviews: string;
  news: string;
  newsCategories: string;
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

// Indexes for pagination
export interface IPaginationIndexes {
  start: number;
  end: number;
}

// Checkbox data
export interface ICheckboxData {
  value: string;
  count: number;
}
