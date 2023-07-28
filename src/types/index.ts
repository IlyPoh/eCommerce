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
  tags: string;
  reviews: string;
}

// Links
export interface ILink {
  text: string;
  link: string;
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

// news
export interface INewsEndpointOptions {
  q?: string;
  pageSize?: number;
  page?: number;
  category?: string;
  from?: string;
  to?: string;
}
