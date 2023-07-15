// props for button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  classes?: string;
  icon?: string;
}

// API URLs
export interface IApiUrls {
  products: string;
  categories: string;
  tags: string;
  reviews: string;
  news: string;
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

// Button with link props
export interface IButtonWithLinkProps {
  text?: string;
  link?: string;
  icon?: string;
}
